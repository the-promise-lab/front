import { useQuery } from '@tanstack/react-query';
import { AppService } from '../../api/services/AppService';

export function useHealthCheck() {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => AppService.appControllerGetHealth(),
  });
}
