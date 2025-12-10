import { SessionsService } from '@api/services/SessionsService';
import { useQuery } from '@tanstack/react-query';
import { adaptResultReport } from './adapters';

export default function useResultReport(sessionId: string | null) {
  return useQuery({
    enabled: !!sessionId,
    queryKey: ['resultReport'],
    queryFn: async () => {
      if (!sessionId) return null;
      const result =
        await SessionsService.sessionsControllerGetSessionReport(sessionId);
      return adaptResultReport(result);
    },
  });
}
