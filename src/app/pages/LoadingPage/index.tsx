import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGameFlowStore } from '@processes/game-flow';
import { useAssetStore } from '@shared/preload-assets';
import { useShallow } from 'zustand/react/shallow';
import { useSetBackground } from '@shared/background';
import { useCdnResources } from '@shared/preload-assets/model/useCdnResources';
import PreloadAssets from './PreloadAssets';

const ASSETS_TO_PRELOAD = [
  'shelter-bg.png',
  'chicken-breast.png',
  'long-shelf-example.png',
  'shelf-household.png',
  'shelf-clothing.png',
  'shelf-food.png',
  'byungcheol.png',
  'ham.png',
  'https://21009ea64690489baefd3170429f0a50.kakaoiedge.com/img/character/hb/angry.png',
  'https://21009ea64690489baefd3170429f0a50.kakaoiedge.com/img/character/hb/default.png',
  'https://21009ea64690489baefd3170429f0a50.kakaoiedge.com/img/character/hb/happy.png',
  'https://21009ea64690489baefd3170429f0a50.kakaoiedge.com/img/character/hb/shocked.png',
];

export default function LoadingPage() {
  const [allLoaded, setAllLoaded] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const assetEntries = useAssetStore(useShallow(state => state.entries));
  const { data: resources, isPending } = useCdnResources();
  const assets = useMemo(() => {
    return [...ASSETS_TO_PRELOAD, ...Object.values(resources ?? {}).flat()];
  }, [resources]);

  // 배경 이미지 설정
  useSetBackground({ image: '/image/mainPage/main_splash_bg.png' });

  // 게임 플로우 상태
  const { isNewGame, goto } = useGameFlowStore(
    useShallow(state => ({
      isNewGame: state.isNewGame,
      goto: state.goto,
    }))
  );

  const total =
    ASSETS_TO_PRELOAD.length + Object.values(resources ?? {}).flat().length;
  const loaded = Array.from(assetEntries.values()).filter(
    entry => entry.status === 'loaded'
  ).length;
  const progressPercent = (loaded / total) * 100;

  console.log('progressPercent', progressPercent);

  useEffect(() => {
    if (loaded === total) {
      setAllLoaded(true);
    }
  }, [loaded, total]);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('LoadingPage: 3초 타이머 완료');
      setTimerEnded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const onComplete = useCallback(() => {
    console.log('LoadingPage onComplete:', {
      allLoaded,
      timerEnded,
      loaded,
      total,
      isNewGame,
    });
    if (isNewGame) {
      console.log('LoadingPage: 새 게임 - CHARACTER_SELECT로 이동');
      goto('CHARACTER_SELECT');
    } else {
      // 그 외의 경우(초기 진입, 이어하기 등) 메인 메뉴로 이동
      console.log('LoadingPage: 메인 메뉴로 이동');
      goto('MAIN_MENU');
    }
  }, [isNewGame, goto, allLoaded, timerEnded, loaded, total]);

  useEffect(() => {
    // 로딩 완료 조건: 에셋 로딩 + 타이머
    const isLoadingComplete = allLoaded && timerEnded;

    if (isLoadingComplete) {
      onComplete();
    }
  }, [allLoaded, timerEnded, onComplete]);

  // 3초 후 fallback 타이머 (안전장치)
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      console.log('LoadingPage: 3초 경과로 강제 이동');
      onComplete();
    }, 3000);

    return () => clearTimeout(fallbackTimer);
  }, [onComplete]);

  return (
    <>
      <div className='relative flex h-full w-full flex-col'>
        <div className='mb-15 flex flex-1 items-end justify-center text-center'>
          {/* 제목 */}
          <div className='text-center'>
            <img
              src='/image/mainPage/game_logo.svg'
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
                className='from-secondary-1/50 to-secondary-1 h-full rounded-full bg-gradient-to-r transition-all duration-500'
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
