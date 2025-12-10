import React, { useEffect, useState } from 'react';

interface OrientationGuardProps {
  children: React.ReactNode;
  showGuide?: boolean;
}

export default function OrientationGuard({
  children,
  showGuide = true,
}: OrientationGuardProps) {
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    const checkOrientation = () => {
      // window.orientation을 사용하여 더 정확한 감지
      const orientation = window.orientation;
      const isLandscapeMode = Math.abs(orientation || 0) === 90;

      // 또는 aspect ratio로 체크
      const aspectRatio = window.innerWidth / window.innerHeight;
      const isLandscapeByAspect = aspectRatio > 1;

      // 두 조건 중 하나라도 가로모드면 가로모드로 판단
      setIsLandscape(isLandscapeMode || isLandscapeByAspect);
    };

    // 초기 체크
    checkOrientation();

    // orientation change 이벤트 리스너
    window.addEventListener('orientationchange', checkOrientation);
    window.addEventListener('resize', checkOrientation);

    return () => {
      window.removeEventListener('orientationchange', checkOrientation);
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  return (
    <>
      {!isLandscape && showGuide && <OrientationGuardContent />}
      {children}
    </>
  );
}

function OrientationGuardContent() {
  return (
    <>
      <div className='bg-opacity-60 fixed inset-0 z-5000 flex flex-col items-center justify-center bg-black p-6 text-white backdrop-blur-sm'>
        <div className='text-center'>
          {/* 회전 안내 애니메이션 - 단순화 */}
          <div className='flex items-center justify-center'>
            {/* 중앙 핸드폰 */}
            <div className='relative'>
              {/* 세로 핸드폰 (현재 상태) */}
              <div className='animate-pulse'>
                <div className='relative h-48 w-32 rounded-lg border-4 border-white bg-gray-800 shadow-xl'>
                  {/* 상단 노치 */}
                  <div className='absolute top-2 left-1/2 h-1 w-12 -translate-x-1/2 transform rounded-full bg-gray-600'></div>
                  {/* 화면 */}
                  <div className='bg-opacity-10 absolute inset-3 flex items-center justify-center rounded-md bg-white'></div>
                  {/* 홈 버튼 */}
                  <div className='absolute bottom-2 left-1/2 h-1 w-8 -translate-x-1/2 transform rounded-full bg-gray-600'></div>
                </div>
              </div>
              {/* 90도 회전된 글씨 - 우측에 배치 (가로모드에서 정상으로 보이게) */}
              <div className='absolute top-1/2 left-40 -translate-y-1/2 transform'>
                <div className='-rotate-90 transform animate-pulse text-lg font-bold whitespace-nowrap text-white'>
                  <p className='animate-pulse text-sm text-gray-300'>
                    기기를 가로로 회전해주세요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
