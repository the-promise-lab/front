import { SessionsService } from '@api/services/SessionsService';
import { useQuery } from '@tanstack/react-query';

export default function useResultReport(sessionId: string) {
  return useQuery({
    enabled: !!sessionId,
    queryKey: ['resultReport'],
    queryFn: () =>
      SessionsService.sessionsControllerGetSessionReport(sessionId),
  });
}
