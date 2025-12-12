import Typography from '@shared/ui/Typography';
import React, { useEffect, useState } from 'react';

interface ViewportWidthGuardProps {
  children: React.ReactNode;
  showGuide?: boolean;
}

const MOBILE_VIEWPORT_MAX_WIDTH_PX = 1023;

export default function ViewportWidthGuard({
  children,
  showGuide = true,
}: ViewportWidthGuardProps) {
  const [isBelowMobileMaxWidth, setIsBelowMobileMaxWidth] = useState(false);

  useEffect(() => {
    const checkViewportWidth = () => {
      setIsBelowMobileMaxWidth(
        window.innerWidth < MOBILE_VIEWPORT_MAX_WIDTH_PX
      );
    };

    checkViewportWidth();
    window.addEventListener('resize', checkViewportWidth);

    return () => {
      window.removeEventListener('resize', checkViewportWidth);
    };
  }, []);

  return (
    <>
      {!isBelowMobileMaxWidth && showGuide && <ViewportWidthGuardContent />}
      {children}
    </>
  );
}

function ViewportWidthGuardContent() {
  return (
    <div className='bg-opacity-60 fixed inset-0 z-5000 flex flex-col items-center justify-center bg-black p-6 text-white backdrop-blur-sm'>
      <div className='text-center'>
        <div className='flex items-center justify-center'>
          <div className='relative flex flex-col items-center gap-12'>
            <div className='animate-pulse'>
              <div className='relative h-48 w-32 -rotate-90 rounded-lg border-4 border-white bg-gray-800 shadow-xl'>
                <div className='absolute top-2 left-1/2 h-1 w-12 -translate-x-1/2 transform rounded-full bg-gray-600'></div>
                <div className='bg-opacity-10 absolute inset-3 flex items-center justify-center rounded-md bg-white'></div>
                <div className='absolute bottom-2 left-1/2 h-1 w-8 -translate-x-1/2 transform rounded-full bg-gray-600'></div>
              </div>
            </div>

            <div className='flex flex-col items-center gap-4 whitespace-nowrap text-white'>
              <Typography variant='subtitle-2-m' className='text-white'>
                이 게임은 아직 모바일 환경에서의 플레이만을 지원합니다.
              </Typography>
              <Typography variant='body-3-r' className='text-white'>
                모바일에서 플레이해주세요.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
