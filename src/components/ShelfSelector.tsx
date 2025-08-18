import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ShelfItem {
  id: string;
  name: string;
  // 이미지 내 상대 좌표 (0-1 범위)
  x: number;
  y: number;
  // 터치 영역 크기 (상대값)
  width: number;
  height: number;
}

interface ShelfSelectorProps {
  backgroundImage: string;
  items: ShelfItem[];
  onItemSelect: (item: ShelfItem) => void;
}

const VIEWPORT_RATIO = 0.9; // svw/svh 비율

export function ShelfSelector({
  backgroundImage,
  items,
  onItemSelect,
}: ShelfSelectorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [backgroundImg, setBackgroundImg] = useState<HTMLImageElement | null>(
    null
  );

  // 뷰포트 크기 계산 (svw, svh 기준)
  const calculateCanvasSize = useCallback(() => {
    const svw = Math.min(window.innerWidth, window.screen.width);
    const svh = Math.min(window.innerHeight, window.screen.height);

    const size = Math.min(svw, svh) * VIEWPORT_RATIO;
    return { width: size, height: size };
  }, []);

  // 배경 이미지 로드
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setBackgroundImg(img);
    };
    img.src = backgroundImage;
  }, [backgroundImage]);

  // Canvas 크기 설정
  useEffect(() => {
    const size = calculateCanvasSize();
    setCanvasSize(size);

    const handleResize = () => {
      const newSize = calculateCanvasSize();
      setCanvasSize(newSize);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateCanvasSize]);

  // Canvas 렌더링
  useEffect(() => {
    if (!canvasRef.current || !backgroundImg) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 고해상도 디스플레이 대응
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize.width * dpr;
    canvas.height = canvasSize.height * dpr;
    ctx.scale(dpr, dpr);

    // 배경 이미지 그리기 (캔버스 크기에 맞게 스케일링)
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    ctx.drawImage(backgroundImg, 0, 0, canvasSize.width, canvasSize.height);

    // 디버그용: 아이템 위치 표시
    drawItemAreas(ctx);
  }, [canvasSize, backgroundImg, items]);

  // 좌표 정규화: 캔버스 좌표 -> 상대 좌표 (0-1)
  const normalizeCoordinates = useCallback(
    (clientX: number, clientY: number) => {
      if (!canvasRef.current) return null;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();

      // 캔버스 내부 좌표로 변환
      const canvasX = clientX - rect.left;
      const canvasY = clientY - rect.top;

      // 0-1 범위로 정규화
      const normalizedX = canvasX / canvasSize.width;
      const normalizedY = canvasY / canvasSize.height;

      return { x: normalizedX, y: normalizedY };
    },
    [canvasSize]
  );

  // 아이템 선택 감지
  const detectItemSelection = useCallback(
    (normalizedX: number, normalizedY: number) => {
      for (const item of items) {
        const halfWidth = item.width / 2;
        const halfHeight = item.height / 2;

        const isInXRange =
          normalizedX >= item.x - halfWidth &&
          normalizedX <= item.x + halfWidth;
        const isInYRange =
          normalizedY >= item.y - halfHeight &&
          normalizedY <= item.y + halfHeight;

        if (isInXRange && isInYRange) {
          return item;
        }
      }
      return null;
    },
    [items]
  );

  // 터치/클릭 이벤트 핸들러
  const handleCanvasInteraction = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      event.preventDefault();

      let clientX: number, clientY: number;

      if ('touches' in event && event.touches.length > 0) {
        // 터치 이벤트
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else if ('clientX' in event) {
        // 마우스 이벤트
        clientX = event.clientX;
        clientY = event.clientY;
      } else {
        return;
      }

      const normalized = normalizeCoordinates(clientX, clientY);
      if (!normalized) return;

      const selectedItem = detectItemSelection(normalized.x, normalized.y);
      if (selectedItem) {
        onItemSelect(selectedItem);
      }
    },
    [normalizeCoordinates, detectItemSelection, onItemSelect]
  );

  // 아이템 영역 그리기 (디버그용)
  const drawItemAreas = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.lineWidth = 2;

    items.forEach((item) => {
      const x = item.x * canvasSize.width;
      const y = item.y * canvasSize.height;
      const width = item.width * canvasSize.width;
      const height = item.height * canvasSize.height;

      ctx.strokeRect(x - width / 2, y - height / 2, width, height);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <canvas
        ref={canvasRef}
        style={{
          width: `${canvasSize.width}px`,
          height: `${canvasSize.height}px`,
          border: '1px solid #ccc',
          touchAction: 'none', // 스크롤 방지
        }}
        className="cursor-pointer"
        onClick={handleCanvasInteraction}
        onTouchStart={handleCanvasInteraction}
      />
    </div>
  );
}
