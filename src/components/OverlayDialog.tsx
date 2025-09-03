import React, { useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OverlayDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  showTitle?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  closeOnBackdropClick?: boolean;
  position?: { x: number; y: number };
  backgroundColor?: string;
}

export default function OverlayDialog({
  open,
  onClose,
  title,
  showTitle = true,
  children,
  footer,
  className = '',
  closeOnBackdropClick = true,
  position,
  backgroundColor = 'bg-black/60',
}: OverlayDialogProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  if (!open) return null;

  // 위치 기반 CSS 변수 계산
  const positionStyle = position
    ? ({
        '--dialog-x': `${Math.min(position.x, window.innerWidth - 280)}px`,
        '--dialog-y': `${Math.min(position.y, window.innerHeight - 200)}px`,
      } as React.CSSProperties)
    : {};

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={() => closeOnBackdropClick && onClose()}
      aria-modal="true"
      role="dialog"
      style={positionStyle}
    >
      <div className={cn('absolute inset-0', backgroundColor)} />
      <div
        className={cn(
          position
            ? 'absolute'
            : 'fixed inset-0 flex items-center justify-center'
        )}
      >
        <div
          className={cn(
            'relative z-10 bg-white shadow-xl',
            position && 'absolute left-[var(--dialog-x)] top-[var(--dialog-y)]',
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {showTitle && title && (
            <div className="mb-4 text-lg font-semibold text-gray-900">
              {title}
            </div>
          )}
          <div className={showTitle && title ? 'mb-5' : ''}>{children}</div>
          {footer && (
            <div className="mt-4 flex justify-end gap-2">{footer}</div>
          )}
        </div>
      </div>
    </div>
  );
}
