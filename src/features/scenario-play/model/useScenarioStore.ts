import { create } from 'zustand';
import type {
  ScenarioState,
  ScenarioActions,
  ScenarioActBundle,
  ScenarioEvent,
} from './types';

const INITIAL_STATE: ScenarioState = {
  currentActBundle: null,
  currentEventIndex: 0,
  pendingChoice: null,
  pendingOutcomeResultType: null,
  isLoading: false,
  error: null,
};

export const useScenarioStore = create<ScenarioState & ScenarioActions>()(
  set => ({
    ...INITIAL_STATE,

    loadActBundle: (bundle: ScenarioActBundle) => {
      set({
        currentActBundle: bundle,
        currentEventIndex: 0,
        pendingChoice: null,
        pendingOutcomeResultType: null,
        isLoading: false,
        error: null,
      });
    },

    nextEvent: () => {
      let hasMore = false;
      set(state => {
        const eventsLength = state.currentActBundle?.events.length ?? 0;
        const nextIndex = state.currentEventIndex + 1;

        if (nextIndex < eventsLength) {
          hasMore = true;
          return { currentEventIndex: nextIndex };
        }
        return state;
      });
      return hasMore;
    },

    prevEvent: () => {
      let hasPrev = false;
      set(state => {
        if (state.currentEventIndex > 0) {
          hasPrev = true;
          return { currentEventIndex: state.currentEventIndex - 1 };
        }
        return state;
      });
      return hasPrev;
    },

    selectChoice: (optionId: number, itemId?: number) => {
      set({
        pendingChoice: { optionId, itemId },
      });
    },

    appendOutcomeEvents: (events: ScenarioEvent[], resultType: string) => {
      set(state => {
        if (!state.currentActBundle) return state;

        // 현재 events에 outcome events를 추가
        const updatedBundle = {
          ...state.currentActBundle,
          events: [...state.currentActBundle.events, ...events],
        };

        return {
          currentActBundle: updatedBundle,
          pendingOutcomeResultType: resultType,
        };
      });
    },

    clearChoice: () => {
      set({ pendingChoice: null, pendingOutcomeResultType: null });
    },

    setLoading: (isLoading: boolean) => {
      set({ isLoading });
    },

    setError: (error: Error | null) => {
      set({ error });
    },

    reset: () => {
      set(INITIAL_STATE);
    },

    skipDialogueEvents: () => {
      let hasMore = false;
      set(state => {
        const events = state.currentActBundle?.events ?? [];
        const currentIndex = state.currentEventIndex;

        // 현재 인덱스 이후에서 Simple이 아닌 첫 번째 이벤트 찾기
        let nextNonSimpleIndex = -1;
        for (let i = currentIndex; i < events.length; i++) {
          if (events[i].type !== 'Simple') {
            nextNonSimpleIndex = i;
            break;
          }
        }

        if (nextNonSimpleIndex !== -1) {
          // 비-Simple 이벤트로 이동
          hasMore = true;
          return { currentEventIndex: nextNonSimpleIndex };
        } else {
          // 모든 남은 이벤트가 Simple - 마지막 이벤트로 이동
          const lastIndex = events.length - 1;
          if (lastIndex > currentIndex) {
            return { currentEventIndex: lastIndex };
          }
          return state;
        }
      });
      return hasMore;
    },
  })
);

// Selectors
export const selectCurrentEvent = (
  state: ScenarioState
): ScenarioEvent | null => {
  return state.currentActBundle?.events[state.currentEventIndex] ?? null;
};

export const selectRemainingEvents = (state: ScenarioState): number => {
  const total = state.currentActBundle?.events.length ?? 0;
  return Math.max(0, total - state.currentEventIndex - 1);
};

export const selectIsLastEvent = (state: ScenarioState): boolean => {
  const total = state.currentActBundle?.events.length ?? 0;
  return state.currentEventIndex >= total - 1;
};

export const selectCurrentDay = (state: ScenarioState) => {
  return state.currentActBundle?.day ?? null;
};

export const selectCurrentAct = (state: ScenarioState) => {
  return state.currentActBundle?.act ?? null;
};

export const selectStatus = (state: ScenarioState) => {
  return state.currentActBundle?.status ?? null;
};

export const selectPendingOutcomeResultType = (state: ScenarioState) => {
  return state.pendingOutcomeResultType;
};
