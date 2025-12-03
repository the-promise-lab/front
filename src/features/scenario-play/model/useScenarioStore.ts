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

    clearChoice: () => {
      set({ pendingChoice: null });
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
