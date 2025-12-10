import { useCallback, useMemo } from 'react';
import { AudioManager } from './AudioManager';
import type { ChannelName, PlayHandle, PlayOptions } from './types';

type PlayParams = { url: string } & PlayOptions;

type PreloadResult = Promise<AudioBuffer[]>;

export function useGameSound() {
  const manager = useMemo(() => AudioManager.i, []);

  const preload = useCallback(
    (urls: string | string[]): PreloadResult => {
      const list = Array.isArray(urls) ? urls : [urls];
      return Promise.all(list.map(url => manager.preload(url)));
    },
    [manager]
  );

  const play = useCallback(
    (params: PlayParams): Promise<PlayHandle> => {
      const { url, ...options } = params;
      return manager.play(url, options);
    },
    [manager]
  );

  const setVolume = useCallback(
    (channel: ChannelName, value: number) => {
      manager.setVolume(channel, value);
    },
    [manager]
  );

  const mute = useCallback(
    (channel: ChannelName, on: boolean) => {
      manager.mute(channel, on);
    },
    [manager]
  );

  const crossfadeBgm = useCallback(
    (prev: string | null, next: string, durationMs?: number) => {
      return manager.crossfadeBgm(prev, next, durationMs);
    },
    [manager]
  );

  return {
    context: manager.ctx,
    preload,
    play,
    setVolume,
    mute,
    crossfadeBgm,
  };
}
