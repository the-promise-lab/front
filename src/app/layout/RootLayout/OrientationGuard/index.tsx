import { useEffect, useState } from 'react';

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

  if (!isLandscape && showGuide) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6">
        <div className="text-center">
          {/* 회전 안내 애니메이션 - 단순화 */}
          <div className="flex justify-center items-center">
            {/* 중앙 핸드폰 */}
            <div className="relative">
              {/* 세로 핸드폰 (현재 상태) */}
              <div className="animate-pulse">
                <div className="w-32 h-48 border-4 border-white rounded-lg relative bg-gray-800 shadow-xl">
                  {/* 상단 노치 */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full"></div>
                  {/* 화면 */}
                  <div className="absolute inset-3 bg-white bg-opacity-10 rounded-md flex items-center justify-center"></div>
                  {/* 홈 버튼 */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full"></div>
                </div>
              </div>
              {/* 90도 회전된 글씨 - 우측에 배치 (가로모드에서 정상으로 보이게) */}
              <div className="absolute left-40 top-1/2 transform -translate-y-1/2">
                <div className="transform -rotate-90 text-white text-lg font-bold whitespace-nowrap animate-pulse">
                  <p className="text-sm text-gray-300 animate-pulse">
                    기기를 가로로 회전해주세요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
