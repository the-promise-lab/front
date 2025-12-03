import { useMutation } from '@tanstack/react-query';
import { SessionsService } from '@api/services/SessionsService';
import { adaptNextActResponse, adaptChoiceToRequest } from './adapters';
import type { ScenarioActBundle, SubmitChoiceParams } from './types';

interface UseLoadCurrentActOptions {
  onSuccess?: (data: ScenarioActBundle) => void;
  onError?: (error: Error) => void;
}

/**
 * 현재 Act 불러오기 훅
 *
 * 빈 객체 {} 호출하는 케이스:
 * - 처음 시작할 때
 * - 이어하기할 때
 * - DAY_END 후 다음 Day의 첫 번째 Act를 불러올 때
 */
export function useLoadCurrentAct(options?: UseLoadCurrentActOptions) {
  return useMutation({
    mutationFn: async () => {
      const response = await SessionsService.sessionsControllerExecuteNextAct(
        {}
      );
      return adaptNextActResponse(response);
    },
    onSuccess: data => {
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      console.error('[useLoadCurrentAct] 실패:', error);
      options?.onError?.(error);
    },
  });
}

interface UseSubmitChoiceAndLoadNextActOptions {
  onSuccess?: (data: ScenarioActBundle) => void;
  onError?: (error: Error) => void;
}

/**
 * 선택 후 다음 Act 요청 훅
 *
 * 선택지를 선택한 후 다음 Act를 요청할 때 사용
 */
export function useSubmitChoiceAndLoadNextAct(
  options?: UseSubmitChoiceAndLoadNextActOptions
) {
  return useMutation({
    mutationFn: async (params: SubmitChoiceParams) => {
      const request = adaptChoiceToRequest(params);
      const response =
        await SessionsService.sessionsControllerExecuteNextAct(request);
      return adaptNextActResponse(response);
    },
    onSuccess: data => {
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      console.error('[useSubmitChoiceAndLoadNextAct] 실패:', error);
      options?.onError?.(error);
    },
  });
}
