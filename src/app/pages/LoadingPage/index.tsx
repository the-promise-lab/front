import { useEffect, useState } from 'react';
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

interface Props {
  onComplete?: () => void;
}

export default function LoadingPage({ onComplete }: Props) {
  const [allLoaded, setAllLoaded] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const assetEntries = useAssetStore(useShallow(state => state.entries));
  usePreloadAssets(ASSETS_TO_PRELOAD, {});

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

  useEffect(() => {
    console.log('LoadingPage useEffect:', {
      allLoaded,
      timerEnded,
      loaded,
      total,
    });
    if (allLoaded && timerEnded) {
      if (onComplete) {
        console.log('LoadingPage: calling onComplete');
        onComplete();
      } else {
        console.log('LoadingPage: going to CHARACTER_SELECT');
        useGameFlowStore.getState().goto('CHARACTER_SELECT');
      }
    }
  }, [allLoaded, timerEnded, onComplete, loaded, total]);

  // 3초 후에는 에셋 로딩 상태와 관계없이 다음 단계로 이동
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      console.log('LoadingPage: 3초 후 강제 이동');
      if (onComplete) {
        onComplete();
      } else {
        useGameFlowStore.getState().goto('CHARACTER_SELECT');
      }
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
        <p className='text-xs text-gray-600'>
          {`${loaded}/${total} 파일 로드 중...`}
        </p>

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
