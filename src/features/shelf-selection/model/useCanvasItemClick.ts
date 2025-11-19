import type React from 'react';
import { useState, useCallback } from 'react';

interface UseCanvasItemClickProps<T> {
  items: T[];
  getImageCoordinates: (
    clientX: number,
    clientY: number
  ) => { x: number; y: number } | null;
  detectItemSelection: (imageX: number, imageY: number) => T | null;
  isDragging: boolean; // 드래그 중이면 클릭 무시
}

interface UseCanvasItemClickReturn<T> {
  selectedItem: T | null;
  clickPosition: { x: number; y: number } | undefined;

  handleClick: (e: React.MouseEvent) => void;
  clearSelection: () => void;
}

export function useCanvasItemClick<T>({
  getImageCoordinates,
  detectItemSelection,
  isDragging,
}: UseCanvasItemClickProps<T>): UseCanvasItemClickReturn<T> {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [clickPosition, setClickPosition] = useState<
    { x: number; y: number } | undefined
  >(undefined);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // 드래그 중이었으면 클릭 무시
      if (isDragging) {
        return;
      }

      e.preventDefault();

      const clientX = e.clientX;
      const clientY = e.clientY;

      const imageCoords = getImageCoordinates(clientX, clientY);
      if (!imageCoords) return;

      const item = detectItemSelection(imageCoords.x, imageCoords.y);
      if (item) {
        setSelectedItem(item);
        setClickPosition({ x: clientX, y: clientY });
      }
    },
    [isDragging, getImageCoordinates, detectItemSelection]
  );

  const clearSelection = useCallback(() => {
    setSelectedItem(null);
    setClickPosition(undefined);
  }, []);

  return {
    selectedItem,
    clickPosition,
    handleClick,
    clearSelection,
  };
}
