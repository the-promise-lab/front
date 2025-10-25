import { ChannelName, PlayHandle, PlayOptions } from './types';

type ChannelState = {
  gain: GainNode;
  volume: number;
  muted: boolean;
};

type MediaPlayback = {
  url: string;
  element: HTMLAudioElement;
  source: MediaElementAudioSourceNode;
  gain: GainNode;
  channel: ChannelName;
  baseVolume: number;
  stopped: boolean;
  stopping: boolean;
  stopTimer?: number;
  endedListener?: () => void;
};

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

export class AudioManager {
  private static instance: AudioManager | undefined;

  static get i(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  readonly ctx: AudioContext;
  private masterGain: GainNode;
  private channels = new Map<ChannelName, ChannelState>();

  private bufferCache = new Map<string, AudioBuffer>();
  private loadingBuffers = new Map<string, Promise<AudioBuffer>>();

  private mediaPlaybacks = new Map<string, Set<MediaPlayback>>();

  private duckingActiveCount = 0;
  private duckingAttenuation = 0.5;
  private duckingFadeMs = 120;

  private constructor() {
    if (typeof window === 'undefined') {
      throw new Error(
        'AudioManager can only be instantiated in a browser environment'
      );
    }

    type AudioContextCtor = typeof AudioContext;
    const webkit = (
      window as typeof window & {
        webkitAudioContext?: AudioContextCtor;
      }
    ).webkitAudioContext;
    const Ctx = window.AudioContext ?? webkit;
    if (!Ctx) {
      throw new Error('Web Audio API is not supported in this environment');
    }
    this.ctx = new Ctx();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 1;
    this.masterGain.connect(this.ctx.destination);

    const channelNames: ChannelName[] = ['bgm', 'sfx'];
    channelNames.forEach(name => {
      const gain = this.ctx.createGain();
      gain.gain.value = 1;
      gain.connect(this.masterGain);
      this.channels.set(name, { gain, volume: 1, muted: false });
    });

    this.setupAutoplayUnlock();
  }

  private setupAutoplayUnlock() {
    const resume = () => {
      if (this.ctx.state === 'suspended') {
        void this.ctx.resume().catch(() => undefined);
      }
    };
    const events: Array<keyof WindowEventMap> = [
      'pointerdown',
      'touchstart',
      'keydown',
    ];
    events.forEach(event => {
      window.addEventListener(event, resume, { once: true });
    });
  }

  private getChannelState(channel: ChannelName): ChannelState {
    const state = this.channels.get(channel);
    if (!state) {
      throw new Error(`Unknown audio channel: ${channel}`);
    }
    return state;
  }

  private applyChannelState(channel: ChannelName, fadeMs = 0) {
    const state = this.getChannelState(channel);
    let target = state.muted ? 0 : state.volume;
    if (channel === 'bgm' && this.duckingActiveCount > 0) {
      target *= this.duckingAttenuation;
    }
    const gain = state.gain.gain;
    const now = this.ctx.currentTime;
    gain.cancelScheduledValues(now);
    const current = gain.value;
    gain.setValueAtTime(current, now);
    if (fadeMs > 0) {
      gain.linearRampToValueAtTime(target, now + fadeMs / 1000);
    } else {
      gain.setValueAtTime(target, now);
    }
  }

  async preload(url: string): Promise<AudioBuffer> {
    if (this.bufferCache.has(url)) {
      return this.bufferCache.get(url)!;
    }
    if (this.loadingBuffers.has(url)) {
      return this.loadingBuffers.get(url)!;
    }

    const job = (async () => {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`Failed to fetch audio: ${url}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer.slice(0));
      this.bufferCache.set(url, audioBuffer);
      this.loadingBuffers.delete(url);
      return audioBuffer;
    })().catch(error => {
      this.loadingBuffers.delete(url);
      console.error(error);
      throw error;
    });

    this.loadingBuffers.set(url, job);
    return job;
  }

  async play(url: string, options: PlayOptions = {}): Promise<PlayHandle> {
    const channel = options.channel ?? 'sfx';
    if (options.useMediaElement) {
      return this.playViaMediaElement(url, options, channel);
    }
    return this.playViaBuffer(url, options, channel);
  }

  private async playViaBuffer(
    url: string,
    options: PlayOptions,
    channel: ChannelName
  ): Promise<PlayHandle> {
    const buffer = await this.preload(url);
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = !!options.loop;

    if (typeof options.detune === 'number' && 'detune' in source) {
      try {
        source.detune.value = options.detune;
      } catch (error) {
        console.warn('Failed to set detune on buffer source', error);
      }
    }

    const gainNode = this.ctx.createGain();
    const targetVolume = clamp01(options.volume ?? 1);
    const now = this.ctx.currentTime;
    const startTime = Math.max(now, options.at ?? now);

    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(0, startTime);
    if (options.fadeInMs && options.fadeInMs > 0) {
      gainNode.gain.linearRampToValueAtTime(
        targetVolume,
        startTime + options.fadeInMs / 1000
      );
    } else {
      gainNode.gain.setValueAtTime(targetVolume, startTime);
    }

    source.connect(gainNode).connect(this.getChannelState(channel).gain);

    let cleaned = false;
    let stopping = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      source.onended = null;
      try {
        source.disconnect();
      } catch (error) {
        console.warn('Failed to disconnect buffer source', error);
      }
      try {
        gainNode.disconnect();
      } catch (error) {
        console.warn('Failed to disconnect gain node', error);
      }
      if (channel === 'sfx' && options.ducking) {
        this.decrementDucking();
      }
    };

    source.onended = cleanup;

    if (channel === 'sfx' && options.ducking) {
      this.incrementDucking();
    }

    source.start(startTime);

    const handle: PlayHandle = {
      stop: (fadeOutMs = 0) => {
        if (stopping || cleaned) return;
        stopping = true;
        const currentTime = this.ctx.currentTime;
        gainNode.gain.cancelScheduledValues(currentTime);
        const currentValue = gainNode.gain.value;
        gainNode.gain.setValueAtTime(currentValue, currentTime);
        if (fadeOutMs > 0) {
          gainNode.gain.linearRampToValueAtTime(
            0,
            currentTime + fadeOutMs / 1000
          );
          source.stop(currentTime + fadeOutMs / 1000);
        } else {
          source.stop();
        }
      },
    };

    return handle;
  }

  private async playViaMediaElement(
    url: string,
    options: PlayOptions,
    channel: ChannelName
  ): Promise<PlayHandle> {
    const existingSet = this.mediaPlaybacks.get(url);
    existingSet?.forEach(entry => {
      if (!entry.stopped && !entry.stopping) {
        this.stopMediaPlayback(entry, 0);
      }
    });

    const element = new Audio(url);
    element.preload = 'auto';
    element.crossOrigin = 'anonymous';

    const source = this.ctx.createMediaElementSource(element);
    const gainNode = this.ctx.createGain();
    source.connect(gainNode).connect(this.getChannelState(channel).gain);

    const playback: MediaPlayback = {
      url,
      element,
      source,
      gain: gainNode,
      channel,
      baseVolume: clamp01(options.volume ?? 1),
      stopped: false,
      stopping: false,
    };

    const endedListener = () => {
      this.finalizeMediaPlayback(playback);
    };
    playback.endedListener = endedListener;
    element.addEventListener('ended', endedListener);

    const set = this.mediaPlaybacks.get(url) ?? new Set<MediaPlayback>();
    set.add(playback);
    this.mediaPlaybacks.set(url, set);

    element.loop = !!options.loop;
    element.volume = 1;
    if (typeof options.at === 'number' && options.at > 0) {
      try {
        element.currentTime = options.at;
      } catch (error) {
        console.warn('Failed to set currentTime on media element', error);
      }
    } else {
      try {
        element.currentTime = 0;
      } catch (error) {
        console.warn('Failed to reset currentTime on media element', error);
      }
    }

    const now = this.ctx.currentTime;
    const startVolume =
      options.fadeInMs && options.fadeInMs > 0 ? 0 : playback.baseVolume;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(startVolume, now);
    if (options.fadeInMs && options.fadeInMs > 0) {
      gainNode.gain.linearRampToValueAtTime(
        playback.baseVolume,
        now + options.fadeInMs / 1000
      );
    } else {
      gainNode.gain.setValueAtTime(playback.baseVolume, now);
    }

    try {
      await element.play();
    } catch (error) {
      this.finalizeMediaPlayback(playback);
      console.error('Failed to play media element', error);
      throw error;
    }

    const handle: PlayHandle = {
      stop: (fadeOutMs = 0) => {
        this.stopMediaPlayback(playback, fadeOutMs);
      },
    };

    return handle;
  }

  private stopMediaPlayback(playback: MediaPlayback, fadeOutMs: number) {
    if (playback.stopped || playback.stopping) {
      return;
    }
    playback.stopping = true;

    const gainParam = playback.gain.gain;
    const now = this.ctx.currentTime;
    gainParam.cancelScheduledValues(now);
    const current = gainParam.value;
    gainParam.setValueAtTime(current, now);

    const finish = () => {
      if (playback.stopTimer) {
        window.clearTimeout(playback.stopTimer);
        playback.stopTimer = undefined;
      }
      playback.element.pause();
      try {
        playback.element.currentTime = 0;
      } catch (error) {
        console.warn('Failed to reset media element after stop', error);
      }
      this.finalizeMediaPlayback(playback);
    };

    if (fadeOutMs > 0) {
      gainParam.linearRampToValueAtTime(0, now + fadeOutMs / 1000);
      playback.stopTimer = window.setTimeout(finish, fadeOutMs);
    } else {
      gainParam.setValueAtTime(0, now);
      finish();
    }
  }

  private finalizeMediaPlayback(playback: MediaPlayback) {
    if (playback.stopped) {
      return;
    }
    playback.stopped = true;
    playback.stopping = false;
    if (playback.stopTimer) {
      window.clearTimeout(playback.stopTimer);
      playback.stopTimer = undefined;
    }
    if (playback.endedListener) {
      playback.element.removeEventListener('ended', playback.endedListener);
      playback.endedListener = undefined;
    }
    try {
      playback.source.disconnect();
    } catch (error) {
      console.warn('Failed to disconnect media element source', error);
    }
    try {
      playback.gain.disconnect();
    } catch (error) {
      console.warn('Failed to disconnect media element gain', error);
    }
    const set = this.mediaPlaybacks.get(playback.url);
    if (set) {
      set.delete(playback);
      if (set.size === 0) {
        this.mediaPlaybacks.delete(playback.url);
      }
    }
  }

  private incrementDucking() {
    this.duckingActiveCount += 1;
    if (this.duckingActiveCount === 1) {
      this.applyChannelState('bgm', this.duckingFadeMs);
    }
  }

  private decrementDucking() {
    if (this.duckingActiveCount === 0) {
      return;
    }
    this.duckingActiveCount -= 1;
    if (this.duckingActiveCount === 0) {
      this.applyChannelState('bgm', this.duckingFadeMs);
    }
  }

  async crossfadeBgm(
    prevUrl: string | null,
    nextUrl: string,
    durationMs = 600
  ) {
    if (prevUrl) {
      const prevSet = this.mediaPlaybacks.get(prevUrl);
      prevSet?.forEach(entry => {
        this.stopMediaPlayback(entry, durationMs);
      });
    }

    const handle = await this.play(nextUrl, {
      channel: 'bgm',
      useMediaElement: true,
      loop: true,
      volume: 1,
      fadeInMs: durationMs,
    });

    return handle;
  }

  setVolume(channel: ChannelName, value: number) {
    const state = this.getChannelState(channel);
    state.volume = clamp01(value);
    this.applyChannelState(channel);
  }

  mute(channel: ChannelName, muted: boolean) {
    const state = this.getChannelState(channel);
    state.muted = muted;
    this.applyChannelState(channel);
  }
}
