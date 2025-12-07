import { useQuery } from '@tanstack/react-query';
import { SessionsService } from '@api/services/SessionsService';
import { adaptIntroResponse } from './adapters';
import type { IntroEventBundle } from './types';

interface UseIntroEventsOptions {
  introMode: number;
  enabled?: boolean;
}

export function useIntroEvents({
  introMode,
  enabled = true,
}: UseIntroEventsOptions) {
  return useQuery<IntroEventBundle>({
    queryKey: ['intro', introMode],
    queryFn: async () => {
      const response = await SessionsService.sessionsControllerPlayIntro({
        introMode,
      });
      return adaptIntroResponse(response);
    },
    enabled: enabled && Number.isFinite(introMode),
  });
}

