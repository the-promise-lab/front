import type React from 'react';
import { useState, useRef, useCallback } from 'react';

interface UseCanvasSideScrollProps {
  maxScrollWidth: number;
  viewportWidth: number;
  initialOffset?: number;
}

interface UseCanvasSideScrollReturn {
  viewOffsetX: number;
  setViewOffsetX: (offset: number) => void;
  isDragging: boolean;

  dragHandlers: {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
}

export function useCanvasSideScroll({
  maxScrollWidth,
  viewportWidth,
  initialOffset = 0,
}: UseCanvasSideScrollProps): UseCanvasSideScrollReturn {
  const [viewOffsetX, setViewOffsetX] = useState(initialOffset);

  const dragStateRef = useRef<{
    startX: number;
    startOffsetX: number;
    hasMoved: boolean;
  } | null>(null);

  // 포인터 X 좌표 추출 (마우스/터치 공통)
  const getPointerX = useCallback(
    (e: React.MouseEvent | React.TouchEvent): number | null => {
      if ('touches' in e) {
        return e.touches[0]?.clientX ?? null;
      }
      return e.clientX;
    },
    []
  );

  // Pointer Down (마우스/터치 시작)
  const handlePointerDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const x = getPointerX(e);
      if (x === null) return;

      dragStateRef.current = {
        startX: x,
        startOffsetX: viewOffsetX,
        hasMoved: false,
      };
    },
    [viewOffsetX, getPointerX]
  );

  // Pointer Move (드래그)
  const handlePointerMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!dragStateRef.current) return;

      const x = getPointerX(e);
      if (x === null) return;

      const deltaX = x - dragStateRef.current.startX;

      // 약간이라도 움직였으면 표시 (3px 임계값)
      if (!dragStateRef.current.hasMoved && Math.abs(deltaX) > 3) {
        dragStateRef.current.hasMoved = true;
      }

      // 스크롤 계산
      const maxScroll = Math.max(0, maxScrollWidth - viewportWidth);
      const nextOffset = Math.min(
        Math.max(dragStateRef.current.startOffsetX - deltaX, 0),
        maxScroll
      );

      setViewOffsetX(nextOffset);
    },
    [maxScrollWidth, viewportWidth, getPointerX]
  );

  // Pointer Up (끝)
  const handlePointerUp = useCallback(() => {
    // 다음 프레임까지 유지 (onClick보다 먼저 실행되도록)
    setTimeout(() => {
      dragStateRef.current = null;
    }, 0);
  }, []);

  const isDragging = dragStateRef.current?.hasMoved ?? false;

  return {
    viewOffsetX,
    setViewOffsetX,
    isDragging,
    dragHandlers: {
      onMouseDown: handlePointerDown,
      onMouseMove: handlePointerMove,
      onMouseUp: handlePointerUp,
      onMouseLeave: handlePointerUp,
      onTouchStart: handlePointerDown,
      onTouchMove: handlePointerMove,
      onTouchEnd: handlePointerUp,
    },
  };
}
