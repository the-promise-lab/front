import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GameService } from '@api/services/GameService';
import type { SelectCharacterSetResponseDto } from '@api/models/SelectCharacterSetResponseDto';
import { adaptPlayingCharacterFromApi } from '@entities/game-session';
import type { PlayingCharacter } from '@entities/game-session';

interface SelectCharacterParams {
  characterGroupId: number;
  groupName: string; // 선택 시점의 그룹 이름
}

interface SelectCharacterResult {
  response: SelectCharacterSetResponseDto;
  playingCharacters: PlayingCharacter[]; // 변환된 캐릭터 정보 (메타데이터 포함)
}

interface UseSelectCharacterSetOptions {
  onSuccess?: (result: SelectCharacterResult) => void;
  onError?: (error: Error) => void;
}

/**
 * 캐릭터 선택 훅
 * POST /api/game/session/character-set 호출
 * - 서버에 선택 요청 전송
 * - 변환된 캐릭터 정보를 콜백으로 반환
 * - 저장 로직은 호출하는 쪽(UI 레이어)에서 처리
 *
 * @param options - 성공/실패 콜백
 * @returns Mutation 객체
 *
 * @example
 * ```tsx
 * const { mutate: selectCharacter, isPending } = useSelectCharacterSet({
 *   onSuccess: ({ response, characters }) => {
 *     // gameSession에 저장 (app/processes 레이어에서 처리)
 *     savePlayingCharacters({ ... });
 *   },
 *   onError: (error) => alert(error.message),
 * });
 *
 * const handleSelect = () => {
 *   selectCharacter({
 *     characterGroupId: 1,
 *     groupName: '헴과 병철',
 *   });
 * };
 * ```
 */
export function useSelectCharacterSet(options?: UseSelectCharacterSetOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: SelectCharacterParams) => {
      const response = await GameService.gameControllerSelectCharacterSet({
        characterGroupId: params.characterGroupId,
      });
      return { response, groupName: params.groupName };
    },
    onSuccess: ({ response }) => {
      // 서버 응답 + 메타데이터 결합
      const characters = response.playingCharacter
        .map(adaptPlayingCharacterFromApi)
        .filter((char): char is NonNullable<typeof char> => char !== null);

      if (characters.length === 0) {
        console.error(
          '[useSelectCharacterSet] 변환된 캐릭터가 없습니다. characterMappings를 확인하세요.'
        );
        return;
      }

      console.log('[useSelectCharacterSet] 캐릭터 선택 성공:', {
        characterSetId: response.id,
        characterGroupId: response.characterGroupId,
        playingCharacters: characters,
      });

      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['gameSession'] });

      // 사용자 정의 콜백 실행 (저장 로직은 호출하는 쪽에서 처리)
      options?.onSuccess?.({ response, playingCharacters: characters });
    },
    onError: (error: Error) => {
      console.error('[useSelectCharacterSet] 캐릭터 선택 실패:', error);
      options?.onError?.(error);
    },
  });
}
