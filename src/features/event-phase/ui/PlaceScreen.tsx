import { useEffect, useState, useCallback } from 'react';
import { cn } from '@shared/lib/utils';
import NoticeBanner from './kit/NoticeBanner';
import PlaceTitle from './kit/PlaceTitle';
import Typography from '@shared/ui/Typography';

export default function PlaceScreen() {
  const placeTitle = '대피소';

  const [isMoving, setIsMoving] = useState(false);
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setIsMoving(true), 1500);
    return () => clearTimeout(id);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (isMoving) setIsAnimationEnd(true);
  }, [isMoving]);

  return (
    <div className='relative h-full w-full'>
      {!isAnimationEnd && (
        <NoticeBanner
          className={cn(
            // 'transition-opacity duration-700 ease-in-out',
            isMoving ? 'opacity-0' : 'opacity-100'
          )}
        >
          <Typography variant='h2-b' className='text-white'>
            {placeTitle}
          </Typography>
        </NoticeBanner>
      )}

      {/* 중앙 → 좌측상단으로 이동하는 타이틀 (ease-in-out) */}
      {!isAnimationEnd && (
        <div
          className={cn(
            'fixed z-[60] text-white',
            'transition-all duration-700 ease-in-out',
            isMoving
              ? 'top-16 left-15 translate-x-0 translate-y-0'
              : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          )}
          onTransitionEnd={handleTransitionEnd}
        >
          <Typography
            variant='h2-b'
            className={cn(
              'origin-top-left',
              'transition-transform duration-700 ease-in-out',
              isMoving ? 'scale-75' : 'scale-100'
            )}
          >
            {placeTitle}
          </Typography>
        </div>
      )}

      <div
        className={cn(
          'pointer-events-none fixed top-15 left-0 z-30',
          // 'transition-opacity duration-700 ease-in-out',
          isAnimationEnd ? 'opacity-100' : 'opacity-0'
        )}
      >
        <PlaceTitle title={placeTitle} />
      </div>
    </div>
  );
}
