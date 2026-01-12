import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useGameFlowStore, type GameStep } from '@processes/game-flow';
import { useShallow } from 'zustand/react/shallow';
import { SOUND_URLS, type PlayHandle, useGameSound } from '@shared/audio';
import { useSoundSettingsStore } from '@shared/audio/useSoundSettingsStore';

interface BgmLayoutProps {
  children: ReactNode;
}

export default function BgmLayout({ children }: BgmLayoutProps) {
  const { step } = useGameFlowStore(
    useShallow(state => ({
      step: state.step,
    }))
  );

  const { isBgmMuted, isSfxMuted } = useSoundSettingsStore();
  const { crossfadeBgm, context, mute } = useGameSound();
  const [audioReady, setAudioReady] = useState(
    typeof window === 'undefined' ? false : context.state === 'running'
  );
  const playingBgm = useRef<{ url: string | null; handle: PlayHandle | null }>({
    url: null,
    handle: null,
  });

  const getBgmUrlForStep = useCallback((nextStep: GameStep) => {
    switch (nextStep) {
      case 'MAIN_MENU':
        return SOUND_URLS.mainBgm1;
      case 'LOGIN':
        return SOUND_URLS.mainBgm1;
      case 'LOGIN_PROGRESS':
        return SOUND_URLS.mainBgm1;
      case 'INTRO_STORY':
      case 'INTRO_STORY_2':
        return SOUND_URLS.introBagChoiceBgm;
      case 'BAG_SELECT':
        return SOUND_URLS.introBagChoiceBgm;
      case 'PACKING_PHASE':
        return SOUND_URLS.itemChoiceBgm;
      case 'ONBOARDING':
        return SOUND_URLS.itemChoiceBgm;
      case 'INTRO_STORY_3':
      case 'SCENARIO_FLOW':
        return SOUND_URLS.mainBgm2;
      case 'RESULT_REPORT':
        return SOUND_URLS.mainBgm2;
      case 'PLAYING':
        return SOUND_URLS.mainBgm2;
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    // AudioManager에 초기 설정값 적용
    mute('bgm', isBgmMuted);
    mute('sfx', isSfxMuted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      if (!nextUrl) {
        playingBgm.current.url = null;
        playingBgm.current.handle?.stop(0);
        return;
      }
      playingBgm.current.url = nextUrl;
      playingBgm.current.handle = await crossfadeBgm(prevUrl, nextUrl, 800);
    };

    void playBgm();
  }, [audioReady, crossfadeBgm, step, getBgmUrlForStep]);

  return <>{children}</>;
}
