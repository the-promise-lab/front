import { useEffect, useState, useCallback } from 'react';
import { cn } from '@shared/lib/utils';
import NoticeBanner from './kit/NoticeBanner';
import PlaceTitle from './kit/PlaceTitle';

export default function PlaceScreen() {
  const placeTitle = '임시 장소 타이틀';

  const [isMoving, setIsMoving] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setIsMoving(true), 1500);
    return () => clearTimeout(id);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (isMoving) setIsDone(true);
  }, [isMoving]);

  return (
    <div className='relative h-full w-full'>
      {!isDone && (
        <NoticeBanner
          className={cn(
            // 'transition-opacity duration-700 ease-in-out',
            isMoving ? 'opacity-0' : 'opacity-100'
          )}
        >
          <p className='text-2xl leading-none font-bold text-white'>
            {placeTitle}
          </p>
        </NoticeBanner>
      )}

      {/* 중앙 → 좌측상단으로 이동하는 타이틀 (ease-in-out) */}
      {!isDone && (
        <div
          className={cn(
            'fixed z-[60] text-white',
            'transition-all duration-700 ease-in-out',
            isMoving
              ? 'top-18 left-15 translate-x-0 translate-y-0'
              : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          )}
          onTransitionEnd={handleTransitionEnd}
        >
          <p
            className={cn(
              'origin-top-left text-2xl font-semibold',
              'transition-transform duration-700 ease-in-out',
              isMoving ? 'scale-80' : 'scale-100'
            )}
          >
            {placeTitle}
          </p>
        </div>
      )}

      <div
        className={cn(
          'pointer-events-none fixed top-15 left-0 z-30',
          // 'transition-opacity duration-700 ease-in-out',
          isDone ? 'opacity-100' : 'opacity-0'
        )}
      >
        <PlaceTitle title={placeTitle} />
      </div>
    </div>
  );
}
