import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useGameFlowStore } from '@processes/game-flow';
import { useShallow } from 'zustand/react/shallow';
import { SOUND_URLS, type PlayHandle, useGameSound } from '@shared/audio';

interface BgmLayoutProps {
  children: ReactNode;
}

export default function BgmLayout({ children }: BgmLayoutProps) {
  const { step } = useGameFlowStore(
    useShallow(state => ({
      step: state.step,
    }))
  );

  const { crossfadeBgm, context } = useGameSound();
  const [audioReady, setAudioReady] = useState(
    typeof window === 'undefined' ? false : context.state === 'running'
  );
  const playingBgm = useRef<{ url: string | null; handle: PlayHandle | null }>({
    url: null,
    handle: null,
  });

  const MAIN_BGM_1_STEPS = useMemo(
    () => new Set(['MAIN_MENU', 'LOGIN', 'LOGIN_PROGRESS']),
    []
  );

  const getBgmUrlForStep = useCallback(
    (nextStep: string) =>
      MAIN_BGM_1_STEPS.has(nextStep)
        ? SOUND_URLS.mainBgm1
        : SOUND_URLS.mainBgm2,
    [MAIN_BGM_1_STEPS]
  );

  // 사용자 제스처 이후에만 오디오 컨텍스트를 재개
  useEffect(() => {
    if (audioReady) return;
    const resume = async () => {
      try {
        await context.resume();
        setAudioReady(true);
      } catch (error) {
        console.error('AudioContext resume failed', error);
      }
    };
    const events: Array<keyof WindowEventMap> = [
      'pointerdown',
      'touchstart',
      'keydown',
    ];
    events.forEach(ev => window.addEventListener(ev, resume, { once: true }));
    return () => {
      events.forEach(ev => window.removeEventListener(ev, resume));
    };
  }, [audioReady, context]);

  useEffect(() => {
    const playBgm = async () => {
      if (!audioReady) return;
      const prevUrl = playingBgm.current?.url;
      const nextUrl = getBgmUrlForStep(step);
      if (prevUrl === nextUrl && playingBgm.current.handle) return;

      playingBgm.current.url = nextUrl;
      playingBgm.current.handle = await crossfadeBgm(prevUrl, nextUrl, 800);
    };

    void playBgm();
  }, [audioReady, crossfadeBgm, step, getBgmUrlForStep]);

  return <>{children}</>;
}
