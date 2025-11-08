import { useQuery } from '@tanstack/react-query';
import { GameService } from '@api';

/**
 * 기존 게임 세션을 조회하는 훅
 *
 * @returns {UseQueryResult} React Query 결과 객체
 * - data: 게임 세션 데이터 (있는 경우)
 * - isLoading: 로딩 상태
 * - isError: 에러 상태 (404 포함)
 * - error: 에러 객체
 *
 * @example
 * const { data: session, isLoading, isError } = useGameSession();
 * const hasExistingSession = !isError && session;
 */
export function useGameSession() {
  return useQuery({
    queryKey: ['gameSession'],
    queryFn: () => GameService.gameControllerFindGameSession(),
    retry: false, // 404 에러 시 재시도하지 않음
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
    gcTime: 1000 * 60 * 10, // 10분간 캐시 유지 (구 cacheTime)
  });
}
