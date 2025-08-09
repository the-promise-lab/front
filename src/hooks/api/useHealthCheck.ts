import { useQuery } from '@tanstack/react-query';
import { AppService } from '@/api';

export function useHealthCheck() {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => AppService.appControllerGetHealth(),
  });
}
