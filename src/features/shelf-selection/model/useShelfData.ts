import { useMemo } from 'react';
import { useBagItemInfo } from '@entities/game-session/model/useBagItemInfo';
import { adaptShelvesFromSetupInfo } from './adapters';
import type { Shelf } from './types';

/**
 * 게임 설정 정보(아이템)를 조회하여 Shelf[] 형태로 반환하는 훅
 *
 * @returns shelves: Shelf[] - 선반 목록
 * @returns isLoading: boolean - 로딩 상태
 * @returns error: Error | null - 에러 정보
 */
export function useShelfData() {
  const { data, isLoading, error } = useBagItemInfo();

  const shelves = useMemo<Shelf[]>(() => {
    if (!data?.items) return [];
    return adaptShelvesFromSetupInfo(data.items);
  }, [data?.items]);

  return {
    shelves,
    isLoading,
    error,
  };
}
