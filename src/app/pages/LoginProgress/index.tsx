// src/app/pages/LoginProgress/index.tsx
// 로그인 진행 화면

import React, { useEffect } from 'react';
import { useGameFlowStore } from '../../../processes/game-flow';

export default function LoginProgress() {
  const { next, setAuthenticated } = useGameFlowStore();

  useEffect(() => {
    // 3초 후 인증 상태 설정 및 메인메뉴로 이동
    const timer = setTimeout(() => {
      setAuthenticated(true);
      next();
    }, 3000);

    return () => clearTimeout(timer);
  }, [next, setAuthenticated]);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center">
      <div className="text-center">
        {/* 로딩 애니메이션 */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-yellow-200 border-t-yellow-500"></div>
          </div>
        </div>

        {/* 제목 */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">로그인 중...</h1>
        <p className="text-gray-600 mb-8">잠시만 기다려주세요</p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full rounded-full animate-pulse"
              style={{
                animation: 'progress 3s linear forwards',
                width: '0%',
              }}
            />
          </div>
        </div>

        {/* 진행률 텍스트 */}
        <p className="text-sm text-gray-500 mt-4">
          게임을 준비하고 있습니다...
        </p>
      </div>

      <style jsx>{`
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
