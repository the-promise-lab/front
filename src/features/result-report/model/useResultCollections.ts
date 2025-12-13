import { SessionsService } from '@api/services/SessionsService';
import { useQuery } from '@tanstack/react-query';
import { adaptResultCollections } from './adapters';

export default function useResultCollections() {
  return useQuery({
    queryKey: ['resultCollections'],
    queryFn: async () => {
      const result =
        await SessionsService.sessionsControllerGetEndingCollection();
      return adaptResultCollections(result);
    },
  });
}
