import { useCallback, useEffect, useState } from 'react';
import { useGameFlowStore } from '@processes/game-flow';
import { useAssetStore } from '@shared/model/assetStore';
import { usePreloadAssets } from '@shared/model/usePreloadAssets';
import { useShallow } from 'zustand/react/shallow';

const ASSETS_TO_PRELOAD = [
  'shelter-bg.png',
  'chicken-breast.png',
  'long-shelf-example.png',
  'shelf-example.png',
  'shelf-clothing.png',
  'shelf-food.png',
  'byungcheol.png',
  'ham.png',
];

export default function LoadingPage() {
  const [allLoaded, setAllLoaded] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const assetEntries = useAssetStore(useShallow(state => state.entries));
  usePreloadAssets(ASSETS_TO_PRELOAD, {});

  // 게임 플로우 상태
  const { isNewGame, startDayFlow, next, gameSession, goto } = useGameFlowStore(
    useShallow(state => ({
      isNewGame: state.isNewGame,
      startDayFlow: state.startDayFlow,
      next: state.next,
      goto: state.goto,
      gameSession: state.gameSession,
    }))
  );

  const total = ASSETS_TO_PRELOAD.length;
  const loaded = Array.from(assetEntries.values()).filter(
    entry => entry.status === 'loaded'
  ).length;

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
      gameSession,
    });
    if (isNewGame) {
      console.log('LoadingPage: 새 게임 - CHARACTER_SELECT로 이동');
      next(); // CHARACTER_SELECT로
    } else if (!gameSession) {
      console.warn('LoadingPage: 게임 세션이 정상적으로 생성되지 않음 - ERROR');
      goto('MAIN_MENU'); // TODO: 적절한 에러 처리 로직 구현.
    } else if (!gameSession.playingCharacterSet) {
      console.log('LoadingPage: 이어하기 - CHARACTER_SELECT로 이동');
      goto('CHARACTER_SELECT');
    } else if (!gameSession.currentActId) {
      console.log('LoadingPage: 이어하기 - INTRO_STORY부터 재개');
      goto('INTRO_STORY');
    } else {
      console.log('LoadingPage: 이어하기 - DAY_FLOW로 이동');
      startDayFlow(); // TODO: 실제로 currentActId부터 이어하기 구현.
    }
  }, [
    isNewGame,
    gameSession,
    next,
    goto,
    startDayFlow,
    allLoaded,
    timerEnded,
    loaded,
    total,
  ]);

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
    <div className='flex h-screen w-screen items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100'>
      <div className='text-center'>
        {/* 로딩 애니메이션 */}
        <div className='mb-8'>
          <div className='mx-auto mb-4 h-20 w-20'>
            {/* <div className="animate-spin rounded-full h-20 w-20 border-4 border-yellow-200 border-t-yellow-500"></div> */}
          </div>
        </div>

        {/* 제목 */}
        <h2 className='mb-10 text-2xl font-bold text-gray-800'>
          게임을 준비하고 있습니다.
        </h2>

        {/* Progress Bar */}
        <div className='mx-auto w-64'>
          <div className='h-2 overflow-hidden rounded-full bg-gray-200'>
            <div
              className='h-full animate-pulse rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500'
              style={{
                animation: 'progress 3s linear forwards',
                width: `${(loaded / total) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* 진행률 텍스트 */}
        <p className='mt-4 text-sm text-gray-500'>
          {'TIP: 소리를 키고 진행해주세요.'}
        </p>
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
  );
}
