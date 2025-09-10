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
  logout: () => useGameFlowStore.getState().setAuthenticated(false),

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
