// src/processes/game-flow/model/useGameFlowStore.ts
// 게임 플로우 전역 상태 관리

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameFlowState, GameFlowActions, GameStep } from '../types';
import { GAME_STEP_ORDER, INITIAL_GAME_FLOW_STATE } from '../types';

export const useGameFlowStore = create<GameFlowState & GameFlowActions>()(
  persist(
    (set, get) => ({
      // 초기 상태
      ...INITIAL_GAME_FLOW_STATE,

      // 액션들
      setAuthenticated: (isAuthenticated: boolean) => {
        set({
          isAuthenticated,
          step: isAuthenticated ? 'MAIN_MENU' : 'LOGIN',
        });
      },

      goto: (step: GameStep) => {
        set({ step });
      },

      next: () => {
        const { step } = get();
        const currentIndex = GAME_STEP_ORDER.indexOf(step);

        if (currentIndex >= 0 && currentIndex < GAME_STEP_ORDER.length - 1) {
          const nextStep = GAME_STEP_ORDER[currentIndex + 1];
          set({ step: nextStep });
        }
      },

      back: () => {
        const { step } = get();
        const currentIndex = GAME_STEP_ORDER.indexOf(step);

        if (currentIndex > 0) {
          const prevStep = GAME_STEP_ORDER[currentIndex - 1];
          set({ step: prevStep });
        }
      },

      reset: () => {
        set(INITIAL_GAME_FLOW_STATE);
      },

      setSelectedCharacter: (character: string) => {
        set({ selectedCharacter: character });
      },
    }),
    {
      name: 'game-flow-storage', // localStorage 키
      partialize: (state) => ({
        step: state.step,
        isAuthenticated: state.isAuthenticated,
        selectedCharacter: state.selectedCharacter,
      }),
    }
  )
);

// 편의 함수들
export const gameFlowActions = {
  // 인증 관련
  login: () => useGameFlowStore.getState().setAuthenticated(true),
  logout: async () => {
    try {
      // 서버에 로그아웃 요청을 보내서 쿠키 삭제
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
        {
          method: 'POST',
          credentials: 'include', // 쿠키 포함
        }
      );

      if (response.ok) {
        console.log('로그아웃 성공');
      } else {
        console.warn('로그아웃 요청 실패, 로컬 상태만 초기화');
      }
    } catch (error) {
      console.error('로그아웃 요청 중 오류:', error);
    } finally {
      // 서버 요청 성공/실패와 관계없이 로컬 상태 초기화
      useGameFlowStore.getState().setAuthenticated(false);
      // 로그아웃 플래그 설정 (LandingPage에서 인증 상태 확인하지 않도록)
      sessionStorage.setItem('logout', 'true');
      // 로그인 화면으로 이동
      useGameFlowStore.getState().goto('LOGIN');
    }
  },

  // 네비게이션
  goToLogin: () => useGameFlowStore.getState().goto('LOGIN'),
  goToMainMenu: () => useGameFlowStore.getState().goto('MAIN_MENU'),
  goToCharacterSelect: () =>
    useGameFlowStore.getState().goto('CHARACTER_SELECT'),
  goToPlaying: () => useGameFlowStore.getState().goto('PLAYING'),

  // 게임 시작
  startGame: () => {
    const store = useGameFlowStore.getState();
    store.goto('CHARACTER_SELECT');
  },

  // 게임 리셋
  resetGame: () => {
    const store = useGameFlowStore.getState();
    store.reset();
  },
};
