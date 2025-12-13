import { SessionsService } from '@api/services/SessionsService';
import { useQuery } from '@tanstack/react-query';
import { adaptPlayHistory } from './adapters';

export default function usePlayHistory() {
  return useQuery({
    queryKey: ['playHistory'],
    queryFn: async () => {
      const result = await SessionsService.sessionsControllerGetHistory(1, 100);
      return adaptPlayHistory(result);
    },
  });
}
