import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { BACKGROUND_PORTAL_ID } from '../model/constants';

interface BackgroundPortalProps {
  children: ReactNode;
}

export function BackgroundPortal({ children }: BackgroundPortalProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const node = document.getElementById(BACKGROUND_PORTAL_ID);
    setContainer(node);
  }, []);

  if (!container) return null;

  return createPortal(children, container);
}
