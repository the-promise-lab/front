import { create } from 'zustand';
import type {
  GameFlowState,
  GameFlowActions,
  GameStep,
  DayStep,
  EventData,
} from '../types';
import type { GameSession, Inventory } from '@entities/game-session';
import {
  GAME_STEP_ORDER,
  DAY_STEP_ORDER,
  INITIAL_GAME_FLOW_STATE,
} from '../types';
import { getEventDataByDayStep } from '../data/dayFlowData';

export const useGameFlowStore = create<GameFlowState & GameFlowActions>()(
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
      const currentStep = get().step;

      // DAY_FLOW에서 다른 단계로 이동할 때 DAY_STEP 초기화
      if (currentStep === 'DAY_FLOW' && step !== 'DAY_FLOW') {
        set({
          step,
          dayStep: 'PLACE_SCREEN',
          currentDayStepIndex: 0,
        });
      } else {
        set({ step });
      }
    },

    next: () => {
      const { step } = get();
      const currentIndex = GAME_STEP_ORDER.indexOf(step);

      if (currentIndex >= 0 && currentIndex < GAME_STEP_ORDER.length - 1) {
        const nextStep = GAME_STEP_ORDER[currentIndex + 1];

        // DAY_FLOW에서 다른 단계로 이동할 때 DAY_STEP 초기화
        if (step === 'DAY_FLOW' && nextStep !== 'DAY_FLOW') {
          set({
            step: nextStep,
            dayStep: 'PLACE_SCREEN',
            currentDayStepIndex: 0,
          });
        } else {
          set({ step: nextStep });
        }
      }
    },

    back: () => {
      const { step } = get();
      const currentIndex = GAME_STEP_ORDER.indexOf(step);

      if (currentIndex > 0) {
        const prevStep = GAME_STEP_ORDER[currentIndex - 1];

        // DAY_FLOW에서 다른 단계로 이동할 때 DAY_STEP 초기화
        if (step === 'DAY_FLOW' && prevStep !== 'DAY_FLOW') {
          set({
            step: prevStep,
            dayStep: 'PLACE_SCREEN',
            currentDayStepIndex: 0,
          });
        } else {
          set({ step: prevStep });
        }
      }
    },

    reset: () => {
      set(INITIAL_GAME_FLOW_STATE);
    },

    // DAY_FLOW 관련 액션들
    gotoDayStep: (dayStep: DayStep) => {
      const dayStepIndex = DAY_STEP_ORDER.indexOf(dayStep);
      const eventData: EventData | undefined =
        dayStep === 'EVENT_RESULT_SCREEN'
          ? undefined
          : getEventDataByDayStep(dayStep);

      set({
        dayStep,
        currentDayStepIndex: dayStepIndex >= 0 ? dayStepIndex : 0,
        currentEventData: eventData,
      });
    },

    nextDayStep: () => {
      const { currentDayStepIndex } = get();
      const nextIndex =
        currentDayStepIndex !== undefined ? currentDayStepIndex + 1 : 0;

      if (nextIndex < DAY_STEP_ORDER.length) {
        const nextDayStep = DAY_STEP_ORDER[nextIndex];
        const eventData: EventData | undefined =
          nextDayStep === 'EVENT_RESULT_SCREEN'
            ? undefined
            : getEventDataByDayStep(nextDayStep);

        set({
          dayStep: nextDayStep,
          currentDayStepIndex: nextIndex,
          currentEventData: eventData,
        });
      } else {
        // 마지막 단계에서 다시 처음으로 (순환)
        const firstDayStep = DAY_STEP_ORDER[0];
        const eventData: EventData | undefined =
          firstDayStep === 'EVENT_RESULT_SCREEN'
            ? undefined
            : getEventDataByDayStep(firstDayStep);

        set({
          dayStep: firstDayStep,
          currentDayStepIndex: 0,
          currentEventData: eventData,
        });
      }
    },

    backDayStep: () => {
      const { currentDayStepIndex } = get();
      const prevIndex =
        currentDayStepIndex !== undefined ? currentDayStepIndex - 1 : 0;

      if (prevIndex >= 0) {
        const prevDayStep = DAY_STEP_ORDER[prevIndex];
        const eventData: EventData | undefined =
          prevDayStep === 'EVENT_RESULT_SCREEN'
            ? undefined
            : getEventDataByDayStep(prevDayStep);

        set({
          dayStep: prevDayStep,
          currentDayStepIndex: prevIndex,
          currentEventData: eventData,
        });
      }
    },

    resetDayFlow: () => {
      const eventData: EventData | undefined =
        getEventDataByDayStep('PLACE_SCREEN');

      set({
        dayStep: 'PLACE_SCREEN',
        currentDayStepIndex: 0,
        currentEventData: eventData,
      });
    },

    // 게임 세션 관련 액션들
    loadGameSession: (session: GameSession) => {
      set({ gameSession: session });
    },

    clearGameSession: () => {
      set({ gameSession: undefined });
    },

    setIsNewGame: (isNew: boolean) => {
      set({ isNewGame: isNew });
    },

    savePlayingCharacters: params => {
      set(state => {
        if (!state.gameSession) {
          console.warn(
            '[useGameFlowStore] gameSession이 없습니다. 먼저 게임 세션을 생성하세요.'
          );
          return state;
        }

        return {
          gameSession: {
            ...state.gameSession,
            playingCharacterSet: {
              ...params,
            },
          },
        };
      });
    },

    saveBag: bag => {
      set(state => {
        if (!state.gameSession) {
          console.warn(
            '[useGameFlowStore] gameSession이 없습니다. 먼저 게임 세션을 생성하세요.'
          );
          return state;
        }

        return {
          gameSession: {
            ...state.gameSession,
            selectedBag: bag,
          },
        };
      });
    },

    saveInventory: (inventories: Inventory[]) => {
      set(state => {
        if (!state.gameSession) {
          console.warn(
            '[useGameFlowStore] gameSession이 없습니다. 먼저 게임 세션을 생성하세요.'
          );
          return state;
        }

        return {
          gameSession: {
            ...state.gameSession,
            inventories: inventories,
          },
        };
      });
    },

    // DAY_FLOW 관련 편의 함수들
    startDayFlow: () => {
      const store = useGameFlowStore.getState();
      store.goto('DAY_FLOW');
      store.resetDayFlow();
    },

    // 새 게임 시작
    startNewGame: (newGameSession: GameSession) => {
      const store = useGameFlowStore.getState();
      store.loadGameSession(newGameSession);
      store.setIsNewGame(true); // 새 게임 플래그 설정
      store.goto('PROGRESS'); // LoadingPage로 이동
    },

    // 이어하기 (세션은 MainMenu에서 이미 로드됨)
    continueGame: () => {
      const store = useGameFlowStore.getState();
      store.setIsNewGame(false); // 이어하기 플래그 설정
      store.goto('PROGRESS'); // LoadingPage를 거쳐서 DAY_FLOW로
    },

    // 게임 리셋
    resetGame: () => {
      const store = useGameFlowStore.getState();
      store.reset();
    },
  })
);
