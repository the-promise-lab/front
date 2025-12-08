import { SOUND_URLS, useGameSound } from '@shared/audio';
import { useEffect } from 'react';

const INTRO_AMBIENCE_SOUNDS: Record<number, string> = {
  1: SOUND_URLS.intro1MartAmbience,
} as const;

export function useIntroAmbienceSound(introMode: number) {
  const { play } = useGameSound();

  useEffect(() => {
    void play({
      url: INTRO_AMBIENCE_SOUNDS[introMode],
      channel: 'sfx',
      fadeInMs: 1000,
    });
  }, [introMode, play]);
  return null;
}
