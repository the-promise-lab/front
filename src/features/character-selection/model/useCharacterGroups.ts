import { useQuery } from '@tanstack/react-query';
import { GameService } from '@api/services/GameService';
import { adaptCharacterSetFromApi } from '@entities/game-session/model/adapters';
import type { CharacterSet } from '@entities/game-session';

/**
 * 캐릭터 그룹 목록 조회 훅
 * GET /api/game/character-groups 호출
 *
 * @returns {
 *   data: CharacterSet[] - 변환된 캐릭터 세트 목록
 *   isLoading: boolean - 로딩 상태
 *   error: Error | null - 에러 정보
 * }
 *
 * @example
 * ```tsx
 * const { data: characterSets, isLoading, error } = useCharacterGroups();
 *
 * if (isLoading) return <Loading />;
 * if (error) return <Error message={error.message} />;
 *
 * return <CharacterList sets={characterSets} />;
 * ```
 */
export function useCharacterGroups() {
  return useQuery<CharacterSet[], Error>({
    queryKey: ['characterGroups'],
    queryFn: async () => {
      const groups = await GameService.gameControllerGetCharacterGroups();
      return groups.map(adaptCharacterSetFromApi);
    },
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 2, // 실패 시 2번 재시도
  });
}
