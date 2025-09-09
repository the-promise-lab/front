import { ApiError, AuthService } from '@api';
import { useAuthStore } from './useAuthStore';
import { useEffect } from 'react';

export const useCheckAuthState = () => {
  const { isLoggedIn, login } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) return;

    // 서버에서 쿠키로 로그인 처리 후 돌아온 경우
    const checkLoginStatus = async () => {
      try {
        // 서버에 프로필 요청 (쿠키에 JWT 토큰이 포함됨)
        const response = await AuthService.authControllerGetProfile();

        console.log('🔍 서버에서 받은 사용자 정보:', response);

        // 로그인 처리 (토큰은 쿠키에 있으므로 별도로 전달하지 않음)
        login(response, 'cookie-based-token');
      } catch (error) {
        if (error instanceof ApiError) {
          console.error('로그인 상태 확인 실패:', error.message);
        } else {
          console.error('로그인 상태 확인 실패:', error);
        }
      }
    };

    checkLoginStatus();
  }, [login, isLoggedIn]);

  return { isLoggedIn, login };
};
