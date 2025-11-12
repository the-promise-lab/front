import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { KakaoUserInfo } from './types';
import { config } from '@config/env';

export interface User {
  id: string | number;
  name: string;
  profileImage?: string;
  email?: string;
  provider: 'kakao' | 'guest';
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoggingOut: boolean;
  lastLogoutTime: number | null;
  accessToken: string | null;
}

interface AuthActions {
  login: (user: User, accessToken?: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      isLoggedIn: false,
      isLoggingOut: false,
      lastLogoutTime: null,
      accessToken: null,

      // Actions
      login: (user: User, accessToken?: string) => {
        set({
          user,
          isLoggedIn: true,
          isLoggingOut: false,
          accessToken: accessToken || null,
        });
      },

      logout: async () => {
        // 로그아웃 시작
        set({ isLoggingOut: true });

        try {
          // 서버에 로그아웃 요청 (쿠키 기반)
          await fetch(`${config.API_BASE_URL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include', // 쿠키 포함
          });
        } catch (error) {
          console.error('서버 로그아웃 실패:', error);
          // 서버 로그아웃 실패해도 클라이언트 상태는 초기화
        }

        // 클라이언트 상태 초기화
        set({
          user: null,
          isLoggedIn: false,
          isLoggingOut: false,
          lastLogoutTime: Date.now(),
          accessToken: null,
        });
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...userData },
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        isLoggingOut: state.isLoggingOut,
        lastLogoutTime: state.lastLogoutTime,
        accessToken: state.accessToken,
      }),
    }
  )
);

// Kakao 사용자 정보를 앱 사용자 형식으로 변환하는 헬퍼 함수
export const convertKakaoUserToAppUser = (kakaoUser: KakaoUserInfo): User => {
  return {
    id: kakaoUser.id,
    name:
      kakaoUser.properties.nickname || kakaoUser.kakao_account.profile.nickname,
    profileImage:
      kakaoUser.properties.profile_image ||
      kakaoUser.kakao_account.profile.profile_image_url,
    email: kakaoUser.kakao_account.email,
    provider: 'kakao',
  };
};
