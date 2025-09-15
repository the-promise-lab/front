// src/app/pages/AuthCheck/index.tsx
// 인증 상태 확인 컴포넌트

import { useEffect } from 'react';
import { useGameFlowStore } from '../../../processes/game-flow';
import { useAuthStore } from '../../../shared/auth/model/useAuthStore';
import { config } from '../../../config/env';

export default function AuthCheck() {
  const { setAuthenticated } = useGameFlowStore();
  const { isLoggedIn, login } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      setAuthenticated(true);
      return;
    }

    const checkAuthStatus = async () => {
      try {
        // 서버에 프로필 요청 (쿠키에 JWT 토큰이 포함됨)
        const response = await fetch(
          `${config.API_BASE_URL}/api/auth/profile`,
          {
            method: 'GET',
            credentials: 'include', // 쿠키 포함
          }
        );

        if (response.ok) {
          const userData = await response.json();
          console.log('🔍 서버에서 받은 사용자 정보:', userData);
          login(userData, 'cookie-based-token');
          setAuthenticated(true);
        } else {
          console.log('로그인되지 않은 상태');
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('로그인 상태 확인 실패:', error);
        setAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, [setAuthenticated, isLoggedIn, login]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-yellow-500"></div>
        <p className="text-gray-600">인증 상태를 확인하는 중...</p>
      </div>
    </div>
  );
}
