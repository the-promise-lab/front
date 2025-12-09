import { GameService } from '@api';
import { useQuery } from '@tanstack/react-query';

export function useCdnResources() {
  return useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      try {
        return await GameService.gameControllerGetResources();
      } catch (error) {
        console.error(error);
        return {} as Record<string, string[]>;
      }
    },
  });
}
