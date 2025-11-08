import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GameService } from '@api/services/GameService';
import { adaptPlayingCharacterToCharacter } from './adapters';
// TODO: Phase 3에서 추가
// import { useGameFlowStore } from '@processes/game-flow';

interface SelectCharacterParams {
  characterGroupId: number;
  groupName: string; // 선택 시점의 그룹 이름
}

interface UseSelectCharacterSetOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * 캐릭터 선택 훅
 * POST /api/game/session/character-set 호출
 * - 서버에 선택 요청 전송
 * - gameSession에 자동 저장 (Phase 3에서 연결)
 *
 * @param options - 성공/실패 콜백
 * @returns Mutation 객체
 *
 * @example
 * ```tsx
 * const { mutate: selectCharacter, isPending } = useSelectCharacterSet({
 *   onSuccess: () => console.log('선택 완료'),
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

  // TODO: Phase 3에서 주석 해제
  // const savePlayingCharacters = useGameFlowStore(
  //   (state) => state.savePlayingCharacters
  // );

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
        .map(adaptPlayingCharacterToCharacter)
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
        characters,
      });

      // TODO: Phase 3에서 주석 해제
      // gameSession에 저장
      // savePlayingCharacters({
      //   characterSetId: response.id,
      //   characterGroupId: response.characterGroupId,
      //   characters,
      // });

      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['gameSession'] });

      // 사용자 정의 콜백 실행
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      console.error('[useSelectCharacterSet] 캐릭터 선택 실패:', error);
      options?.onError?.(error);
    },
  });
}
