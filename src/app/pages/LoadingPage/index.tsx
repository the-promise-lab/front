import { useCallback, useEffect, useState } from 'react';
import { useGameFlowStore } from '@processes/game-flow';
import { useAssetStore, usePreloadAssets } from '@shared/preload-assets';
import { useShallow } from 'zustand/react/shallow';

const ASSETS_TO_PRELOAD = [
  'shelter-bg.png',
  'chicken-breast.png',
  'long-shelf-example.png',
  'shelf-household.png',
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
  const { isNewGame, startScenarioFlow, next, gameSession, goto } =
    useGameFlowStore(
      useShallow(state => ({
        isNewGame: state.isNewGame,
        startScenarioFlow: state.startScenarioFlow,
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
      console.log('LoadingPage: 이어하기 - SCENARIO_FLOW로 이동');
      startScenarioFlow(); // TODO: 실제로 currentActId부터 이어하기 구현.
    }
  }, [
    isNewGame,
    gameSession,
    next,
    goto,
    startScenarioFlow,
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
    <div className='relative flex h-full w-full flex-col'>
      <div className='flex flex-1 items-center justify-center text-center'>
        {/* 제목 */}
        <div className='text-center'>
          <img
            src='/image/mainPage/game_logo.svg'
            alt='back to the future'
            className='mx-auto h-60 w-200'
          />
        </div>
      </div>

      {/* 하단 고정 영역 */}
      <div className='flex flex-col items-center justify-center gap-5 pb-20'>
        <p className='text-sm text-gray-500'>{'Preparing to load data'}</p>
        {/* Progress Bar */}
        <div className='mx-auto w-105'>
          <div className='h-2 overflow-hidden rounded-full'>
            <div
              className='h-full animate-pulse rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500'
              style={{
                animation: 'progress 3s linear forwards',
                width: `${(loaded / total) * 100}%`,
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
  );
}
