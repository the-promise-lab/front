import { useMemo } from 'react';
import { AudioManager } from './AudioManager';
import type { ChannelName, PlayHandle, PlayOptions } from './types';

type PlayParams = { url: string } & PlayOptions;

type PreloadResult = Promise<AudioBuffer[]>;

export function useGameSound() {
  const manager = useMemo(() => AudioManager.i, []);

  const preload = (urls: string | string[]): PreloadResult => {
    const list = Array.isArray(urls) ? urls : [urls];
    return Promise.all(list.map(url => manager.preload(url)));
  };

  const play = (params: PlayParams): Promise<PlayHandle> => {
    const { url, ...options } = params;
    return manager.play(url, options);
  };

  const setVolume = (channel: ChannelName, value: number) => {
    manager.setVolume(channel, value);
  };

  const mute = (channel: ChannelName, on: boolean) => {
    manager.mute(channel, on);
  };

  const crossfadeBgm = (
    prev: string | null,
    next: string,
    durationMs?: number
  ) => {
    return manager.crossfadeBgm(prev, next, durationMs);
  };

  return {
    context: manager.ctx,
    preload,
    play,
    setVolume,
    mute,
    crossfadeBgm,
  };
}
