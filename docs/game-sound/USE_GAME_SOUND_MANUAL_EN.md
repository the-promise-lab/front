# useGameSound Hook Manual

The `useGameSound` hook exposes an imperative audio API designed for fast SFX playback and flexible BGM control in browser games. It wraps a singleton `AudioManager` that orchestrates the Web Audio graph so you can focus on gameplay logic instead of wiring low-level audio nodes.

## Installation & Setup

1. Ensure your bundle targets browsers with Web Audio support. The hook will throw on instantiation if the environment does not expose `AudioContext` (or `webkitAudioContext` on older iOS Safari).
2. Import the hook from the shared audio barrel:

```ts
import { useGameSound } from '@shared/audio';
```

The hook creates no React state, so it is safe to call inside any component, provider, or custom hook as long as it follows the usual rules of hooks.

## Quick Start

```tsx
import { useEffect } from 'react';
import { useGameSound } from '@shared/audio';

export function BattleScene() {
  const { preload, play, crossfadeBgm, mute, setVolume } = useGameSound();

  useEffect(() => {
    void preload(['/audio/sfx/explosion.mp3', '/audio/bgm/loop.mp3']);
  }, [preload]);

  const startScene = async () => {
    await crossfadeBgm(null, '/audio/bgm/loop.mp3', 800);
  };

  const triggerExplosion = () => {
    void play({
      url: '/audio/sfx/explosion.mp3',
      channel: 'sfx',
      volume: 0.9,
      ducking: true,
    });
  };

  return (
    <div>
      <button onClick={startScene}>Start Scene</button>
      <button onClick={triggerExplosion}>Explosion!</button>
      <button onClick={() => mute('bgm', true)}>Mute BGM</button>
      <button onClick={() => setVolume('sfx', 0.5)}>Half SFX Volume</button>
    </div>
  );
}
```

## Hook Return Value

`useGameSound()` returns the following helpers:

| Function                                | Description                                                                                                                                                                                                       |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `context`                               | The singleton `AudioContext` instance. Useful for diagnostics or composing advanced node graphs manually.                                                                                                         |
| `preload(urls)`                         | Accepts a string or array of strings, fetches the audio files, and decodes them into `AudioBuffer`s stored in memory for low-latency reuse. Returns a promise that resolves when all requested buffers are ready. |
| `play({ url, ...options })`             | Starts playback on the requested channel. Resolves to a handle with a `stop(fadeOutMs?)` method for manual teardown or fading.                                                                                    |
| `setVolume(channel, value)`             | Sets the logical volume (0–1) for the specified channel. The Web Audio gain is updated immediately and respects ducking state.                                                                                    |
| `mute(channel, on)`                     | Toggles mute on the requested channel without discarding the previously configured volume.                                                                                                                        |
| `crossfadeBgm(prev, next, durationMs?)` | Fades out the previous BGM URL while fading in the next one over the specified duration. Returns the same handle as `play` for the new track.                                                                     |

## Playback Options

The `play` helper forwards directly to the underlying `AudioManager.play` API, so any `PlayOptions` can be used:

| Option            | Type             | Default                    | Notes                                                                                                                                     |
| ----------------- | ---------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `channel`         | `'bgm' \| 'sfx'` | `'sfx'`                    | Selects the logical channel. Each channel has its own gain node and volume/mute state.                                                    |
| `loop`            | `boolean`        | `false`                    | Applies to both buffer and media element playback paths.                                                                                  |
| `volume`          | `number`         | `1`                        | Normalized volume for this playback instance. Channel volume/mute still apply.                                                            |
| `fadeInMs`        | `number`         | `0`                        | Adds a linear fade-in ramp from silence to the requested volume.                                                                          |
| `at`              | `number`         | `audioContext.currentTime` | Schedules the start in seconds relative to the audio context clock. For media elements, values > 0 seek to that timestamp before playing. |
| `detune`          | `number`         | `0`                        | Applies a cent-based pitch shift on buffer playback when the browser supports it (ignored for media elements).                            |
| `useMediaElement` | `boolean`        | `false`                    | Forces the media element path, recommended for long BGM loops or streaming audio.                                                         |
| `ducking`         | `boolean`        | `false`                    | When true on the `sfx` channel, temporarily reduces the BGM gain while this sound is active.                                              |

## Channel Management Patterns

- **Preload early.** Call `preload` during boot or scene loading to avoid network fetches on first SFX playback. Subsequent calls reuse cached buffers.
- **Respect autoplay policies.** The manager automatically listens for the first user interaction to resume the suspended audio context. You do not need to wire this manually.
- **Combine with UI controls.** Build “Audio Settings” screens by wiring sliders to `setVolume` and toggles to `mute`. Since the hook exposes imperative commands, you can manage UI state locally without syncing back from the audio layer.
- **Crossfades and ducking.** Use `crossfadeBgm` whenever you transition scenes, and enable `ducking` on impactful SFX so narration or music remains audible without manual mixing.

## Error Handling

- Network or decoding failures reject the returned promises and log to the console.
- Media element playback failures (e.g., autoplay restrictions) reject the `play` promise. The manager cleans up event listeners even on failure, so you can retry safely.

## Extensibility Tips

- Add more channels by extending the `ChannelName` union and updating the channel initialization in `AudioManager`.
- Wrap the imperative API with your own domain-specific hooks if you need declarative playback tied to React state.
- Consider surfacing player-facing settings (volume sliders, mute toggles) via context providers that call these helpers under the hood.

## Button click SFX

- Hook: `useButtonClickSfx({ variant = 'default', volume = 1 })` – `variant` uses keys from `CLICK_SOUND_VARIANTS`.
- Common buttons (e.g., `GlassButton`) already play the default click sound; no extra code needed.
- Custom button example:

```tsx
import { useButtonClickSfx } from '@shared/audio';

function ConfirmButton() {
  const playClick = useButtonClickSfx({ variant: 'default', volume: 0.8 });
  return <button onClick={playClick}>Confirm</button>;
}
```

- To add a new sound, add a key/URL to `CLICK_SOUND_VARIANTS` and pass the variant.
- Global “SFX mute/volume” is handled via the `sfx` channel automatically.
