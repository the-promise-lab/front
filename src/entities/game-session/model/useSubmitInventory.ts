import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GameService } from '@api';
import type { SubmitInventoryDto, SubmitInventoryResultDto } from '@api';

/**
 * 인벤토리 제출 훅
 *
 * @returns {UseMutationResult} React Query Mutation 결과 객체
 * - mutate: 인벤토리 제출 함수
 * - isLoading: 로딩 상태
 * - isError: 에러 상태
 * - isSuccess: 성공 상태
 * - data: 제출 결과 데이터 (SubmitInventoryResultDto)
 *
 * @example
 * const { mutate: submitInventory } = useSubmitInventory({
 *   onSuccess: (data) => {
 *     console.log('인벤토리 제출 완료:', data);
 *   },
 * });
 *
 * submitInventory({ bagId: 1, slots: [...] });
 */
export function useSubmitInventory(options?: {
  onSuccess?: (data: SubmitInventoryResultDto) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitInventoryDto) =>
      GameService.gameControllerSubmitInventory(payload),
    onSuccess: data => {
      // 인벤토리 제출 성공시 게임 세션 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['gameSession'] });
      queryClient.invalidateQueries({ queryKey: ['setupInfo'] });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}
