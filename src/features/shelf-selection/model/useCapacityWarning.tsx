import { useState, useCallback, type ReactNode, useRef, useMemo } from 'react';
import CapacityWarningBannerComponent from '../ui/ShelfSelection/kit/CapacityWarningBannerComponent.tsx';

interface CapacityWarningHook {
  showWarning: () => void;
  CapacityWarningBanner: ReactNode;
}

export function useCapacityWarning(): CapacityWarningHook {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showWarning = useCallback(() => {
    setIsVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  }, []);

  const CapacityWarningBanner = useMemo(() => {
    return (
      <CapacityWarningBannerComponent
        key='capacity-warning'
        isVisible={isVisible}
      />
    );
  }, [isVisible]);

  return {
    showWarning,
    CapacityWarningBanner,
  };
}
