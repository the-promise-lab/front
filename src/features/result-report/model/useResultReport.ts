import { SessionsService } from '@api/services/SessionsService';
import { useQuery } from '@tanstack/react-query';
import { adaptResultReport } from './adapters';

export default function useResultReport(sessionId: string) {
  return useQuery({
    enabled: !!sessionId,
    queryKey: ['resultReport'],
    queryFn: async () => {
      const result =
        await SessionsService.sessionsControllerGetSessionReport(sessionId);
      return adaptResultReport(result);
    },
  });
}
