import { useCallback } from 'react';
import {
  useGameSession,
  adaptGameSessionFromApi,
} from '@entities/game-session';
import { useGameFlowStore } from './useGameFlowStore';
import { useShallow } from 'zustand/react/shallow';

/**
 * 게임 이어하기 훅
 *
 * MainMenu에서 "이어하기" 버튼 클릭 시 사용
 * - 기존 세션 조회
 * - 세션 로드 + PROGRESS(LoadingPage)로 이동
 *
 * @example
 * ```tsx
 * const { continueGame, hasSession, isLoading, error } = useContinueGame();
 *
 * {hasSession && (
 *   <button onClick={continueGame}>▶️ 이어하기</button>
 * )}
 * ```
 */
export function useContinueGame() {
  const { loadGameSession, continueGame } = useGameFlowStore(
    useShallow(state => ({
      loadGameSession: state.loadGameSession,
      continueGame: state.continueGame,
    }))
  );

  // 기존 세션 조회
  const { data: sessionData, isLoading, isError, error } = useGameSession();

  const hasSession = sessionData !== null && sessionData !== undefined;

  const continueGameSession = useCallback(() => {
    if (!sessionData) {
      console.warn('[useContinueGame] 세션 데이터가 없습니다');
      return;
    }

    console.log('[useContinueGame] 이어하기', sessionData);

    // 세션 데이터 변환 및 로드
    const adaptedSession = adaptGameSessionFromApi(sessionData);
    loadGameSession(adaptedSession);

    // 게임 플로우 이어하기 (isNewGame=false + goto PROGRESS)
    continueGame();
  }, [sessionData, loadGameSession, continueGame]);

  return {
    continueGameSession,
    hasSession,
    isLoading,
    isError,
    error,
  };
}
