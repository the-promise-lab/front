import { useEffect, useState, useCallback, useRef } from 'react';
import { cn } from '@shared/lib/utils';
import NoticeBanner from '../../../shared/ui/NoticeBanner';
import PlaceTitle from './kit/PlaceTitle';
import Typography from '@shared/ui/Typography';
import { BackgroundPortal } from '@shared/background-portal';

const AUTO_PROCEED_DELAY_MS = 1000;

interface PlaceScreenProps {
  onComplete?: () => void;
}

export default function PlaceScreen({ onComplete }: PlaceScreenProps) {
  const placeTitle = '대피소';

  const [isMoving, setIsMoving] = useState(false);
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);
  const hasCalledComplete = useRef(false);

  useEffect(() => {
    const id = setTimeout(() => setIsMoving(true), 1500);
    return () => clearTimeout(id);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (isMoving) setIsAnimationEnd(true);
  }, [isMoving]);

  // 애니메이션 완료 후 자동으로 onComplete 호출
  useEffect(() => {
    if (isAnimationEnd && onComplete && !hasCalledComplete.current) {
      const id = setTimeout(() => {
        hasCalledComplete.current = true;
        onComplete();
      }, AUTO_PROCEED_DELAY_MS);
      return () => clearTimeout(id);
    }
  }, [isAnimationEnd, onComplete]);

  // 클릭 시 바로 다음 단계로 스킵
  const handleClick = useCallback(() => {
    if (onComplete && !hasCalledComplete.current) {
      hasCalledComplete.current = true;
      onComplete();
    }
  }, [onComplete]);

  return (
    <div
      className='relative h-full w-full cursor-pointer'
      onClick={handleClick}
    >
      {!isAnimationEnd && (
        <NoticeBanner
          className={cn(
            // 'transition-opacity duration-700 ease-in-out',
            isMoving ? 'opacity-0' : 'opacity-100'
          )}
        >
          <Typography variant='h3-b'>{placeTitle}</Typography>
        </NoticeBanner>
      )}

      {/* 중앙 → 좌측상단으로 이동하는 타이틀 (ease-in-out) */}
      {!isAnimationEnd && (
        <BackgroundPortal>
          <div
            className={cn(
              'fixed z-60',
              'transition-all duration-700 ease-in-out',
              isMoving
                ? 'top-15 left-16.5 translate-x-0 translate-y-0'
                : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            )}
            onTransitionEnd={handleTransitionEnd}
          >
            <Typography
              variant='h3-b'
              className={cn(
                'origin-top-left',
                'transition-transform duration-700 ease-in-out',
                isMoving ? 'scale-75' : 'scale-100'
              )}
            >
              {placeTitle}
            </Typography>
          </div>
        </BackgroundPortal>
      )}

      <BackgroundPortal>
        <div
          className={cn(
            'pointer-events-none fixed top-15 left-0 z-30',
            // 'transition-opacity duration-700 ease-in-out',
            isAnimationEnd ? 'opacity-100' : 'opacity-0'
          )}
        >
          <PlaceTitle title={placeTitle} />
        </div>
      </BackgroundPortal>
    </div>
  );
}
