import { useQuery } from '@tanstack/react-query';
import { GameService } from '@api';
import type { ApiError } from '@api';

/**
 * 기존 게임 세션을 조회하는 훅
 *
 * @returns {UseQueryResult} React Query 결과 객체
 * - data: 게임 세션 데이터 (있는 경우) 또는 null (세션 없음)
 * - isLoading: 로딩 상태
 * - isError: 에러 상태 (404는 제외, null 반환)
 * - error: 에러 객체 (실제 에러만 포함)
 *
 * @example
 * const { data: session, isLoading, isError } = useGameSession();
 * const hasExistingSession = session !== null;
 */
export function useGameSession() {
  return useQuery({
    queryKey: ['gameSession'],
    queryFn: async () => {
      try {
        return await GameService.gameControllerFindGameSession();
      } catch (error) {
        // 404는 "세션이 없음"을 의미하므로 정상 처리
        if ((error as ApiError).status === 404) {
          return null;
        }
        // 그 외 에러는 재throw
        throw error;
      }
    },
    retry: false, // 에러 시 재시도하지 않음
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
    gcTime: 1000 * 60 * 10, // 10분간 캐시 유지 (구 cacheTime)
  });
}
