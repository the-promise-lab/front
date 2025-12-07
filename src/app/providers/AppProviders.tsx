import type { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
  useIsMutating,
} from '@tanstack/react-query';
import { useEffect, useState, useRef } from 'react';
import Toast from '@shared/ui/toast';
import { SpinnerCustom } from '@shared/ui/Spinner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

interface AppProvidersProps {
  children: ReactNode;
}

function GlobalLoadingSpinner() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = isFetching > 0 || isMutating > 0;
  const [showSpinner, setShowSpinner] = useState(false);
  const loadingStartTimeRef = useRef<number | null>(null);
  const minDisplayTimeRef = useRef(1000); // 최소 1초 표시

  useEffect(() => {
    if (isLoading) {
      // 로딩이 시작되면 시작 시간 기록
      if (loadingStartTimeRef.current === null) {
        loadingStartTimeRef.current = Date.now();
        setShowSpinner(true);
      }
    } else {
      // 로딩이 끝났을 때
      if (loadingStartTimeRef.current !== null) {
        const elapsed = Date.now() - loadingStartTimeRef.current;
        const remaining = Math.max(0, minDisplayTimeRef.current - elapsed);

        // 최소 표시 시간이 지나지 않았다면 남은 시간만큼 대기
        if (remaining > 0) {
          setTimeout(() => {
            setShowSpinner(false);
            loadingStartTimeRef.current = null;
          }, remaining);
        } else {
          setShowSpinner(false);
          loadingStartTimeRef.current = null;
        }
      }
    }
  }, [isLoading]);

  if (!showSpinner) return null;

  return (
    <div className='fixed right-5 bottom-5 z-50'>
      <SpinnerCustom />
    </div>
  );
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <GlobalLoadingSpinner />
      <Toast />
    </QueryClientProvider>
  );
}
