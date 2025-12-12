import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGameFlowStore } from '@processes/game-flow';
import { useAssetStore } from '@shared/preload-assets';
import { useShallow } from 'zustand/react/shallow';
import { useSetBackground } from '@shared/background';
import { useCdnResources } from '@shared/preload-assets/model/useCdnResources';
import PreloadAssets from './PreloadAssets';
import { CHARACTER_SELECT_ASSETS } from '@entities/character-data';

const MIN_LOADING_MS = 3000;
const MAX_LOADING_MS = 10000;

const ASSETS_TO_PRELOAD = [
  'image/character/char_hb/thumb.png',
  'image/character/char_bc/thumb.png',
  ...CHARACTER_SELECT_ASSETS,
];

export default function LoadingPage() {
  const [allLoaded, setAllLoaded] = useState(false);
  const assetEntries = useAssetStore(useShallow(state => state.entries));
  const { data: resources, isPending } = useCdnResources();
  const assets = useMemo(() => {
    return [...ASSETS_TO_PRELOAD, ...Object.values(resources ?? {}).flat()];
  }, [resources]);

  const startedAtRef = useRef<number>(Date.now());
  const completeTimeoutIdRef = useRef<number | null>(null);
  const hasCompletedRef = useRef(false);

  // 배경 이미지 설정
  useSetBackground({ image: '/image/mainPage/main_splash_bg.png' });

  // 게임 플로우 상태
  const { completeProgress } = useGameFlowStore(
    useShallow(state => ({
      completeProgress: state.completeProgress,
    }))
  );

  const total =
    ASSETS_TO_PRELOAD.length + Object.values(resources ?? {}).flat().length;
  const loaded = Array.from(assetEntries.values()).filter(
    entry => entry.status === 'loaded'
  ).length;
  const progressPercent = (loaded / total) * 100;

  useEffect(() => {
    if (loaded === total) {
      setAllLoaded(true);
    }
  }, [loaded, total]);

  const completeOnce = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    completeProgress();
  }, [completeProgress]);

  useEffect(() => {
    if (!allLoaded) return;

    const elapsed = Date.now() - startedAtRef.current;
    const remaining = Math.max(0, MIN_LOADING_MS - elapsed);

    if (completeTimeoutIdRef.current !== null) {
      window.clearTimeout(completeTimeoutIdRef.current);
    }

    completeTimeoutIdRef.current = window.setTimeout(() => {
      completeOnce();
    }, remaining);

    return () => {
      if (completeTimeoutIdRef.current !== null) {
        window.clearTimeout(completeTimeoutIdRef.current);
      }
    };
  }, [allLoaded, completeOnce]);

  // 최대 대기 시간: 10초가 지나면 강제로 다음 단계로 진행
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      completeOnce();
    }, MAX_LOADING_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [completeOnce]);

  return (
    <>
      <div className='relative flex h-full w-full flex-col'>
        <div className='mb-15 flex flex-1 items-end justify-center text-center'>
          {/* 제목 */}
          <div className='text-center'>
            <img
              src='/image/mainPage/game_logo.png'
              alt='bag to the future'
              className='mx-auto h-42 w-142'
            />
          </div>
        </div>

        {/* 하단 고정 영역 */}
        <div className='flex flex-col items-center justify-center gap-5 pb-20'>
          <p className='text-sm text-gray-200'>{'Preparing to load data'}</p>
          {/* Progress Bar */}
          <div className='mx-auto w-105'>
            <div className='h-3 overflow-hidden rounded-full'>
              <div
                className='from-secondary-1/50 to-secondary-1 h-full rounded-full bg-linear-to-r transition-all duration-500'
                style={{
                  willChange: 'width',
                  width: `${progressPercent}%`,
                }}
              />
            </div>
          </div>
          {/* <p className='text-sm text-gray-500'>
          {'TIP: 소리를 키고 진행해주세요.'}
        </p> */}
        </div>

        <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
      </div>
      {!isPending && <PreloadAssets assets={assets} />}
    </>
  );
}
