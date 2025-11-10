import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GameService } from '@api';

/**
 * 새로운 게임 세션을 생성하는 훅
 *
 * @returns {UseMutationResult} React Query Mutation 결과 객체
 * - mutate: 세션 생성 함수
 * - isLoading: 로딩 상태
 * - isError: 에러 상태
 * - isSuccess: 성공 상태
 * - data: 생성된 세션 데이터
 *
 * @example
 * const { mutate: createSession, isLoading } = useCreateGameSession({
 *   onSuccess: (data) => {
 *     console.log('세션 생성 완료:', data);
 *   },
 * });
 *
 * createSession();
 */
export function useCreateGameSession(options?: {
  onSuccess?: (
    data: Awaited<
      ReturnType<typeof GameService.gameControllerCreateGameSession>
    >
  ) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => GameService.gameControllerCreateGameSession(),
    onSuccess: data => {
      // 세션 생성 성공시 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['gameSession'] });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}
