import { ApiError, AuthService } from '@api';
import { useAuthStore } from './useAuthStore';
import { useEffect, useRef } from 'react';

export const useCheckAuthState = (
  onAuthCheck: (isLoggedIn: boolean) => void
) => {
  const { isLoggedIn, isLoggingOut, lastLogoutTime, login, logout } =
    useAuthStore();

  // onAuthCheck 콜백을 ref로 저장하여 의존성 배열에서 제거
  const onAuthCheckRef = useRef(onAuthCheck);
  useEffect(() => {
    onAuthCheckRef.current = onAuthCheck;
  }, [onAuthCheck]);

  // 수동으로 인증 상태 확인
  useEffect(() => {
    // 로그아웃 중이거나 로그아웃 후 0.5초 이내라면 인증 확인하지 않음
    if (isLoggingOut || (lastLogoutTime && Date.now() - lastLogoutTime < 500)) {
      return;
    }

    const checkAuthStatus = async () => {
      const currentToken = useAuthStore.getState().accessToken;

      // 유효한 토큰이 없으면 인증 실패 처리
      if (!currentToken) {
        onAuthCheckRef.current(false);
        return;
      }

      try {
        const response = await AuthService.authControllerGetProfile();
        // 기존 토큰 유지하면서 프로필만 업데이트
        login(response, currentToken);
        onAuthCheckRef.current(true);
      } catch (error) {
        if (error instanceof ApiError) {
          console.error('로그인 상태 확인 실패:', error.message);
        } else {
          console.error('로그인 상태 확인 실패:', error);
        }
        // 401 등 에러 시 토큰 무효화
        logout();
        onAuthCheckRef.current(false);
      }
    };

    checkAuthStatus();
  }, [isLoggedIn, isLoggingOut, lastLogoutTime, login, logout]);

  return { isLoggedIn, login };
};
