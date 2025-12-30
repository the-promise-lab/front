# useGameSound Implementation Notes

This document describes how the shared audio layer is structured so future maintainers can reason about behaviour, extend functionality, and debug issues quickly.

## High-Level Architecture

- **Singleton manager.** `AudioManager` encapsulates a single `AudioContext`, a master gain, and per-channel gain nodes so all audio flows through a predictable mixing graph. It is instantiated lazily via the `AudioManager.i` getter, which enforces a browser environment and auto-unlocks playback on the first user gesture.
- **Imperative hook.** `useGameSound` is a thin React wrapper that memoizes the manager and exposes imperative helpers without subscribing to external state. React components call these helpers to control playback but are not forced to re-render.

## AudioManager Overview

The manager owns every long-lived audio primitive so channel behaviour stays deterministic:

- **Channel registry.** A `Map<ChannelName, ChannelState>` tracks each channel’s Web Audio `GainNode`, the latest logical volume, and whether it is muted. `applyChannelState` converts those logical values into scheduled gain ramps, factoring in active ducking.
- **Caching layers.** `bufferCache` and `loadingBuffers` de-duplicate fetch/decoding work for SFX. Media playback instances live in `mediaPlaybacks`, grouped by URL so overlapping BGM crossfades can fade old elements while spinning up new ones.
- **Autoplay unlock.** `setupAutoplayUnlock` registers the browser gesture listeners necessary to resume the suspended `AudioContext` on iOS Safari and desktop Chrome alike.
- **Command surface.** Public methods (`preload`, `play`, `crossfadeBgm`, `setVolume`, `mute`) funnel through private helpers so state transitions remain centralised. For example, `setVolume` updates the stored channel volume then calls `applyChannelState` to schedule the ramp.
- **Lifecycle hygiene.** Both playback paths attach `onended`/`pause` listeners and tear down timers, nodes, and counters in `cleanup`/`stop` helpers. This prevents Web Audio graph leaks and stale ducking counters when callers stop sounds manually.

## Channel State & Volume Flow

Each channel has a `ChannelState` structure containing the Web Audio `GainNode`, the last requested volume, and a mute flag. All writes go through `setVolume` and `mute`, which update the stored state and re-compute the gain target. When SFX ducking is active, the BGM target gain is multiplied by `duckingAttenuation` before scheduling. Linear ramps are used when ducking begins or ends to avoid pops.

## Buffer Playback Path

Short SFX clips and other low-latency sounds travel through `playViaBuffer`:

1. `preload` fetches the URL with CORS enabled, decodes it with `decodeAudioData`, and caches the `AudioBuffer` in memory to avoid redundant work.
2. Playback creates a new `AudioBufferSourceNode` and a dedicated gain node per play call so concurrent sounds can fade independently.
3. Optional features: detune for pitch variation, scheduled start time via `at`, and fade-in volume ramps. Ducking increments a reference counter so overlapping SFX keep the BGM attenuated until all complete.
4. The returned handle schedules fade-outs by ramping the gain to zero before stopping the source.

## Media Element Playback Path

Long-form BGM uses the media element route:

1. `playViaMediaElement` instantiates a new `<audio>` element, wraps it with `createMediaElementSource`, and connects it through a dedicated gain node to the channel gain.
2. Only one active playback per URL is kept; any prior instances are faded out before a new one starts. This prevents overlapping loops when switching scenes.
3. Fade-in/out logic mirrors the buffer path but relies on Web Audio gains to keep crossfades sample accurate, while the element volume remains at 1.
4. Cleanup handles timers, detaches event listeners, and disconnects nodes to avoid Web Audio graph leaks.

## Ducking Behaviour

When a buffer playback with `ducking: true` starts on the `sfx` channel, the manager increments a counter. The first activation applies a fade to the BGM channel gain towards `duckingAttenuation`. Each completion decrements the counter; when it reaches zero, the BGM gain is ramped back to the stored channel volume. This ensures overlapping SFX keep the mix attenuated without racing conditions.

## Crossfading

`crossfadeBgm` accepts the previously playing URL (if any) and a next URL. It fades out the previous media playback over the provided duration while simultaneously starting the next track via the media element path with a matching fade-in. The helper returns the `PlayHandle` of the new track so callers can manage it manually if needed.

## Hook Contract

`useGameSound` returns a stable set of helpers. Because the hook only memoizes the singleton manager, callers can freely destructure the helpers without worrying about stale references. `preload` accepts either a single URL or an array, wraps the manager’s `preload`, and resolves once all buffers are ready. The hook intentionally exposes the raw `AudioContext` to make advanced composition possible when needed.

## Error Handling & Resilience

- All fetch/decode failures clear the in-flight promise cache and rethrow after logging, preventing stuck entries.
- Media element playback is wrapped in a try/catch so the manager can disconnect nodes and surface the rejection to callers.
- Autoplay unlock attaches event listeners for pointer, touch, and key interactions, resuming the audio context on demand without requiring consumer code.

## Extensibility

- Add more channels by extending `ChannelName` and initializing their gain nodes in the constructor.
- Swap the ducking policy by adjusting `duckingAttenuation` or exposing configuration setters.
- Consider moving user-facing settings into a dedicated feature slice; the shared layer should remain domain-agnostic and focused on low-level audio orchestration.
