// src/app/pages/LoginProgress/index.tsx
// 로그인 진행 화면

import React, { useEffect } from 'react';
import { useGameFlowStore } from '../../../processes/game-flow';

export default function LoginProgress() {
  useEffect(() => {
    // 3초 후 캐릭터 선택으로 이동
    const timer = setTimeout(() => {
      useGameFlowStore.getState().goto('CHARACTER_SELECT');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="text-center">
        {/* 로딩 애니메이션 */}
        <div className="mb-8">
          <div className="mx-auto mb-4 h-20 w-20">
            {/* <div className="animate-spin rounded-full h-20 w-20 border-4 border-yellow-200 border-t-yellow-500"></div> */}
          </div>
        </div>

        {/* 제목 */}
        <h2 className="mb-10 text-2xl font-bold text-gray-800">
          게임을 준비하고 있습니다.
        </h2>
        {/* <p className="text-gray-600 ">잠시만 기다려주세요</p> */}

        {/* Progress Bar */}
        <div className="mx-auto w-64">
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full animate-pulse rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"
              style={{
                animation: 'progress 3s linear forwards',
                width: '0%',
              }}
            />
          </div>
        </div>

        {/* 진행률 텍스트 */}
        <p className="mt-4 text-sm text-gray-500">
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
