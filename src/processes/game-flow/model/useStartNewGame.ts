import { useCallback } from 'react';
import {
  useCreateGameSession,
  adaptCreateGameSessionFromApi,
} from '@entities/game-session';
import { useGameFlowStore } from './useGameFlowStore';
import { useShallow } from 'zustand/react/shallow';

/**
 * 새 게임 시작 훅
 *
 * MainMenu에서 "새 게임 시작" 버튼 클릭 시 사용
 * - 세션 생성 API 호출
 * - 성공 시 세션 로드 + PROGRESS(LoadingPage)로 이동
 * - 실패 시 에러 처리
 *
 * @example
 * ```tsx
 * const { startNewGame, isCreating, error } = useStartNewGame();
 *
 * <button onClick={startNewGame} disabled={isCreating}>
 *   {isCreating ? '새 게임 시작 중...' : '🎮 새 게임 시작'}
 * </button>
 * ```
 */
export function useStartNewGame() {
  const { loadGameSession, startNewGame } = useGameFlowStore(
    useShallow(state => ({
      loadGameSession: state.loadGameSession,
      startNewGame: state.startNewGame,
    }))
  );

  const {
    mutate: createSession,
    isPending: isCreating,
    isError,
    error,
  } = useCreateGameSession({
    onSuccess: data => {
      console.log('[useStartNewGame] 게임 세션 생성 완료', data);

      // 세션 데이터 변환 및 로드
      const adaptedSession = adaptCreateGameSessionFromApi(data);
      loadGameSession(adaptedSession);

      // 게임 플로우 시작 (clearGameSession + isNewGame=true + goto PROGRESS)
      startNewGame();
    },
    onError: error => {
      console.error('[useStartNewGame] 게임 세션 생성 실패', error);
    },
  });

  const createNewGameSession = useCallback(() => {
    console.log('[useStartNewGame] 새 게임 시작 요청');
    createSession();
  }, [createSession]);

  return {
    createNewGameSession,
    isCreating,
    isError,
    error,
  };
}
