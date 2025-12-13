import { SessionsService } from '@api/services/SessionsService';
import { useQuery } from '@tanstack/react-query';
import { adaptRankingSummary } from './adapters';

export default function useResultReport() {
  return useQuery({
    queryKey: ['rankingSummary'],
    queryFn: async () => {
      const result =
        await SessionsService.sessionsControllerGetRankingSummary();
      return adaptRankingSummary(result);
    },
  });
}
