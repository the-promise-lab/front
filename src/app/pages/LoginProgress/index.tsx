// src/app/pages/LoginProgress/index.tsx
// 로그인 진행 화면

import React, { useEffect } from 'react';
import { useGameFlowStore } from '../../../processes/game-flow';

export default function LoginProgress() {
  const { setAuthenticated } = useGameFlowStore();

  useEffect(() => {
    // 3초 후 인증 상태 설정 및 메인메뉴로 이동
    const timer = setTimeout(() => {
      setAuthenticated(true);
      // next() 대신 goto로 MAIN_MENU로 직접 이동
      useGameFlowStore.getState().goto('MAIN_MENU');
    }, 3000);

    return () => clearTimeout(timer);
  }, [setAuthenticated]);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center">
      <div className="text-center">
        {/* 로딩 애니메이션 */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4">
            {/* <div className="animate-spin rounded-full h-20 w-20 border-4 border-yellow-200 border-t-yellow-500"></div> */}
          </div>
        </div>

        {/* 제목 */}
        <h2 className="text-2xl font-bold text-gray-800 mb-10">
          게임을 준비하고 있습니다.
        </h2>
        {/* <p className="text-gray-600 ">잠시만 기다려주세요</p> */}

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
          {'TIP: 소리를 키고 진행해주세요.'}
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
