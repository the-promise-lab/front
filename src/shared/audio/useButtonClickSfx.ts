import { useCallback } from 'react';
import { CLICK_SOUND_VARIANTS, type ClickSoundVariant } from './constants';
import { useGameSound } from './useGameSound';

interface UseButtonClickSfxOptions {
  variant?: ClickSoundVariant;
  volume?: number;
}

export function useButtonClickSfx(options: UseButtonClickSfxOptions = {}) {
  const { play } = useGameSound();
  const { variant = 'default', volume = 1 } = options;
  const url = CLICK_SOUND_VARIANTS[variant] ?? CLICK_SOUND_VARIANTS.default;

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

