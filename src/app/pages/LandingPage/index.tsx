import React, { useEffect } from 'react';
import { useGameFlowStore } from '../../../processes/game-flow';
import { config } from '../../../config/env';

export default function LandingPage() {
  const { setAuthenticated } = useGameFlowStore();

  // 카카오 로그인 후 돌아왔을 때만 인증 상태 확인
  useEffect(() => {
    const checkAuthStatus = async () => {
      // URL에 카카오 로그인 관련 파라미터가 있는지 확인
      const urlParams = new URLSearchParams(window.location.search);
      const isKakaoCallback =
        urlParams.has('code') ||
        urlParams.has('state') ||
        window.location.pathname.includes('callback') ||
        document.referrer.includes('kakao');

      // 로그아웃 후인지 확인 (sessionStorage에 로그아웃 플래그가 있는지)
      const isLogout = sessionStorage.getItem('logout') === 'true';

      // 카카오 로그인 콜백이 아니거나 로그아웃 후인 경우 인증 상태 확인하지 않음
      if (!isKakaoCallback || isLogout) {
        // 로그아웃 플래그 제거
        if (isLogout) {
          sessionStorage.removeItem('logout');
        }
        return;
      }

      try {
        const response = await fetch(
          `${config.API_BASE_URL}/api/auth/profile`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (response.ok) {
          const userData = await response.json();
          console.log('🔍 카카오 로그인 후 사용자 정보:', userData);
          // 카카오 로그인 후에는 바로 메인메뉴로 이동
          useGameFlowStore.getState().setAuthenticated(true);
          useGameFlowStore.getState().goto('MAIN_MENU');
        }
      } catch (error) {
        console.error('인증 상태 확인 실패:', error);
      }
    };

    checkAuthStatus();
  }, [setAuthenticated]);

  const handleKakaoLogin = () => {
    // 서버의 카카오 로그인 엔드포인트로 리다이렉트
    window.location.href = `${config.API_BASE_URL}/api/auth/kakao`;
  };

  const handleGuestLogin = () => {
    // 게스트 로그인 처리 - 바로 메인메뉴로 이동
    useGameFlowStore.getState().setAuthenticated(true);
    useGameFlowStore.getState().goto('MAIN_MENU');
  };

  return (
    <div className="h-dvh w-screen overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100">
      {/* 가로모드 메인 컨텐츠 */}
      <div className="flex h-full">
        {/* 왼쪽 영역: 브랜딩 */}
        <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-500 p-8">
          <div className="text-center text-white">
            <h1 className="mb-2 text-2xl font-bold">The Promise</h1>
            <p className="mb-6 text-sm text-yellow-100">재난 대비 훈련 게임</p>

            {/* 특징 포인트 */}
            {/* <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-yellow-200">✓</span>
                <span></span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-yellow-200">✓</span>
                <span></span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-yellow-200">✓</span>
                <span></span>
              </div>
            </div> */}
          </div>
        </div>

        {/* 오른쪽 영역: 로그인 */}
        <div className="flex flex-1 flex-col items-center justify-center bg-white p-8">
          <div className="w-full max-w-sm">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-xl font-bold text-gray-800">시작하기</h2>
            </div>

            <div className="space-y-3">
              {/* 카카오 로그인 */}
              <button
                onClick={handleKakaoLogin}
                className="flex w-full touch-manipulation items-center justify-center gap-3 rounded-lg bg-yellow-400 px-4 py-3 font-medium text-gray-800 transition-all hover:bg-yellow-500 active:bg-yellow-600"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 5.731 2 10.286c0 2.858 1.818 5.377 4.545 6.952L5.91 21.09c-.13.41.278.758.643.548l5.12-2.78C11.834 18.924 11.916 18.929 12 18.929c5.523 0 10-3.731 10-8.643C22 5.731 17.523 2 12 2z" />
                </svg>
                카카오톡으로 시작하기
              </button>

              {/* 구분선 */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-gray-500">또는</span>
                </div>
              </div>

              {/* 게스트 로그인 */}
              <button
                onClick={handleGuestLogin}
                className="w-full touch-manipulation rounded-lg bg-gray-100 px-4 py-3 font-medium text-gray-700 transition-all hover:bg-gray-200 active:bg-gray-300"
              >
                게스트로 시작하기
              </button>
            </div>

            {/* 약관 동의 */}
            <div className="mt-6 text-center">
              <p className="text-xs leading-relaxed text-gray-400">
                로그인하면 서비스 이용약관 및<br />
                개인정보처리방침에 동의한 것으로 간주됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
