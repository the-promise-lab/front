import { SOUND_URLS, useGameSound } from '@shared/audio';
import { useEffect, useRef } from 'react';
import type { PlayHandle } from '@shared/audio/types';

const INTRO_AMBIENCE_SOUNDS: Record<number, string> = {
  1: SOUND_URLS.intro1MartAmbience,
} as const;

export function useIntroAmbienceSound(introMode: number) {
  const { play } = useGameSound();
  const handleRef = useRef<PlayHandle | null>(null);

  useEffect(() => {
    const soundUrl = INTRO_AMBIENCE_SOUNDS[introMode];

    if (soundUrl) {
      // 비동기로 play하고 handle을 ref에 저장
      void play({
        url: soundUrl,
        channel: 'sfx',
        fadeInMs: 1000,
      }).then(handle => {
        handleRef.current = handle;
      });
    }

    // cleanup: introMode 변경 또는 언마운트 시 사운드 정지
    return () => {
      if (handleRef.current) {
        handleRef.current.stop(500); // 500ms 페이드아웃
        handleRef.current = null;
      }
    };
  }, [introMode, play]);

  return null;
}
