import { useQuery } from '@tanstack/react-query';
import { GameService } from '@api/services/GameService';

/**
 * 게임 설정 정보(가방, 아이템) 조회 훅
 *
 * @returns SetupInfoDto (bags, items)
 */
export function useBagItemInfo() {
  return useQuery({
    queryKey: ['setupInfo'],
    queryFn: () => GameService.gameControllerGetSetupInfo(),
  });
}
