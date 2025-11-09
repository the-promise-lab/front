import { ApiError, AuthService } from '@api';
import { useAuthStore } from './useAuthStore';
import { useEffect } from 'react';

export const useCheckAuthState = (
  onAuthCheck: (isLoggedIn: boolean) => void
) => {
  const { isLoggedIn, isLoggingOut, lastLogoutTime, login, logout } =
    useAuthStore();

  // 수동으로 인증 상태 확인
  useEffect(() => {
    // 로그아웃 중이거나 로그아웃 후 0.5초 이내라면 인증 확인하지 않음
    if (isLoggingOut || (lastLogoutTime && Date.now() - lastLogoutTime < 500)) {
      return;
    }

    // 카카오 로그인 후 인증 확인을 위해 1초 지연
    const isKakaoCallback =
      window.location.search.includes('code=') &&
      window.location.search.includes('state=');
    if (isKakaoCallback) {
      setTimeout(() => {
        checkAuthStatus();
      }, 1000);
      return;
    }

    const checkAuthStatus = async () => {
      try {
        const response = await AuthService.authControllerGetProfile();
        login(response, 'cookie-based-token');
        onAuthCheck(true);
      } catch (error) {
        if (error instanceof ApiError) {
          console.error('로그인 상태 확인 실패:', error.message);
        } else {
          console.error('로그인 상태 확인 실패:', error);
        }
        onAuthCheck(false);
      }
    };

    checkAuthStatus();
  }, [isLoggedIn, isLoggingOut, lastLogoutTime, login, logout, onAuthCheck]);

  return { isLoggedIn, login };
};
