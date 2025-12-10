import { create } from 'zustand';
import type { GameFlowState, GameFlowActions, GameStep } from '../types';
import type { GameSession, Inventory } from '@entities/game-session';
import type { PlayingCharacterStatusDto } from '@api';
import { GAME_STEP_ORDER, INITIAL_GAME_FLOW_STATE } from '../types';
import { resolveCharacterGroupName } from '../lib/characterAssets';

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

    // 게임 세션 관련 액션들
    loadGameSession: (session: GameSession) => {
      set({
        gameSession: session,
        selectedCharacterGroupName: session.playingCharacterSet
          ? resolveCharacterGroupName(
              session.playingCharacterSet.characterGroupId
            )
          : undefined,
      });
    },

    clearGameSession: () => {
      set({ gameSession: undefined, selectedCharacterGroupName: undefined });
    },

    setIsNewGame: (isNew: boolean) => {
      set({ isNewGame: isNew });
    },

    savePlayingCharacters: (params, groupName) => {
      set(state => {
        if (!state.gameSession) {
          console.warn(
            '[useGameFlowStore] gameSession이 없습니다. 먼저 게임 세션을 생성하세요.'
          );
          return state;
        }

        const resolvedGroupName = resolveCharacterGroupName(
          params.characterGroupId,
          groupName
        );

        console.log('[useGameFlowStore] 저장되는 캐릭터 정보:', {
          playingCharacterSet: params,
          groupName: resolvedGroupName,
        });

        return {
          gameSession: {
            ...state.gameSession,
            playingCharacterSet: params,
          },
          selectedCharacterGroupName: resolvedGroupName,
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
            bag: bag,
          },
        };
      });
    },

    saveInventory: (inventory: Inventory) => {
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
            inventory: inventory,
          },
        };
      });
    },

    // SCENARIO_FLOW 시작
    startScenarioFlow: () => {
      const store = useGameFlowStore.getState();
      store.goto('SCENARIO_FLOW');
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
      const gameSession = store.gameSession;
      const goto = store.goto;
      const startScenarioFlow = store.startScenarioFlow;
      if (!gameSession) {
        console.warn(
          'LoadingPage: 게임 세션이 정상적으로 생성되지 않음 - ERROR'
        );
        goto('MAIN_MENU'); // TODO: 적절한 에러 처리 로직 구현.
      } else if (!gameSession.playingCharacterSet) {
        console.log('LoadingPage: 이어하기 - CHARACTER_SELECT로 이동');
        goto('CHARACTER_SELECT');
      } else if (!gameSession.currentActId) {
        console.log('LoadingPage: 이어하기 - INTRO_STORY부터 재개');
        goto('INTRO_STORY');
      } else {
        console.log('LoadingPage: 이어하기 - SCENARIO_FLOW로 이동');
        startScenarioFlow();
      }
    },

    // 게임 리셋
    resetGame: () => {
      const store = useGameFlowStore.getState();
      store.reset();
    },

    // 서버 응답으로 캐릭터 스탯 동기화
    syncPlayingCharactersFromServer: (
      playingCharacters: PlayingCharacterStatusDto[]
    ) => {
      set(state => {
        if (!state.gameSession?.playingCharacterSet) {
          console.warn(
            '[useGameFlowStore] playingCharacterSet이 없습니다. 동기화를 건너뜁니다.'
          );
          return state;
        }

        // 서버 응답으로 직접 교체 (characterCode로 매칭)
        const updatedCharacters =
          state.gameSession.playingCharacterSet.playingCharacters.map(char => {
            const serverChar = playingCharacters.find(
              sc => sc.characterCode === char.characterCode
            );

            if (serverChar) {
              return {
                ...char,
                currentHp: serverChar.currentHp,
                currentMental: serverChar.currentMental,
              };
            }
            return char;
          });

        return {
          gameSession: {
            ...state.gameSession,
            playingCharacterSet: {
              ...state.gameSession.playingCharacterSet,
              playingCharacters: updatedCharacters,
            },
          },
        };
      });
    },

    deleteUsedItemFromInventory: (itemId: number) => {
      set(state => {
        if (!state.gameSession?.inventory) {
          return state;
        }
        const updatedItems = state.gameSession.inventory.items.filter(
          item => item.item.id !== itemId
        );
        return {
          gameSession: {
            ...state.gameSession,
            inventory: {
              ...state.gameSession.inventory,
              items: updatedItems,
            },
          },
        };
      });
    },
  })
);

export const playingCharacterSetSelector = (state: GameFlowState) =>
  state.gameSession?.playingCharacterSet;
export const selectedBagSelector = (state: GameFlowState) =>
  state.gameSession?.bag;
export const inventorySelector = (state: GameFlowState) =>
  state.gameSession?.inventory;
export const sessionIdSelector = (state: GameFlowState) =>
  state.gameSession?.id;
export const playingCharactersSelector = (state: GameFlowState) =>
  state.gameSession?.playingCharacterSet?.playingCharacters;
