import { useCallback } from 'react';
import { SOUND_URLS } from './constants';
import { useGameSound } from './useGameSound';

interface UseButtonClickSfxOptions {
  url?: string;
  volume?: number;
}

export function useButtonClickSfx(options: UseButtonClickSfxOptions = {}) {
  const { play } = useGameSound();
  const { url = SOUND_URLS.buttonClick, volume = 1 } = options;

  return useCallback(() => {
    void play({
      url,
      volume,
      channel: 'sfx',
    }).catch(error => {
      // 실패해도 UI 흐름은 막지 않는다.
      console.error('button click sfx play failed', error);
    });
  }, [play, url, volume]);
}

