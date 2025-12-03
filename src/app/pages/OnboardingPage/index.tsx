import { useState } from 'react';
import { useGameFlowStore } from '@processes/game-flow';
import { BackgroundPortal } from '@shared/background-portal';
import { cn } from '@shared/lib/utils';
import EdgeGradient from '@shared/ui/layout/EdgeGradient';

const ONBOARDING_IMAGES = Array.from({ length: 8 }, (_, i) => i + 1).map(
  num => `/image/onboarding/${num}.png`
);

export default function OnboardingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goto = useGameFlowStore(state => state.goto);

  const handleNext = () => {
    if (currentIndex < ONBOARDING_IMAGES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      goto('PACKING_PHASE');
    }
  };

  return (
    <div className='relative h-full w-full' onClick={handleNext}>
      <EdgeGradient />
      <BackgroundPortal>
        <div className='fixed inset-0 z-[11] flex items-center justify-center bg-black'>
          <div className='relative flex h-full w-full items-center justify-center'>
            {ONBOARDING_IMAGES.map((imagePath, index) => (
              <img
                key={imagePath}
                src={imagePath}
                alt={`온보딩 ${index + 1}`}
                className={cn(
                  'absolute h-full w-full object-contain transition-opacity duration-500',
                  currentIndex === index ? 'opacity-100' : 'opacity-0'
                )}
              />
            ))}
          </div>
        </div>
      </BackgroundPortal>
      {/* 네비게이션 힌트 */}
      <div className='absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-white/60'>
        {currentIndex + 1} / {ONBOARDING_IMAGES.length}
      </div>
    </div>
  );
}
