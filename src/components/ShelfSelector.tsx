import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';

interface ShelfItem {
  id: string;
  name: string;
  // 이미지 내 상대 좌표 (0-1 범위)
  x: number;
  y: number;
}

const ITEM_SIZE_PIXEL = 20;

interface ShelfSelectorProps {
  backgroundImage: string;
  items: ShelfItem[];
  onItemSelect: (item: ShelfItem) => void;
}

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
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState({ width: 0, height: 0 });
  const [zoomLevel, setZoomLevel] = useState(2);
  const itemPixelSize = useMemo(() => {
    return ITEM_SIZE_PIXEL * zoomLevel;
  }, [zoomLevel]);

  // 뷰포트 크기 계산 (svw, svh 기준)
  const calculateCanvasSize = useCallback(() => {
    const svw = Math.min(window.innerWidth, window.screen.width);
    const svh = Math.min(window.innerHeight, window.screen.height);

    return { width: svw, height: svh };
  }, []);

  // 이미지 배율 계산 (이미지 width가 디바이스 화면의 2배)
  const calculateImageScale = useCallback(
    (imgWidth: number, imgHeight: number) => {
      const svw = Math.min(window.innerWidth, window.screen.width);
      const targetWidth = svw * zoomLevel; // 디바이스 화면의 2배
      const scaleRatio = targetWidth / imgWidth;

      return {
        width: imgWidth * scaleRatio,
        height: imgHeight * scaleRatio,
      };
    },
    [zoomLevel]
  );

  // 아이템 영역 그리기 (디버그용)
  const drawItemAreas = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (imageScale.width === 0) return;

      ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.lineWidth = 2;

      items.forEach((item) => {
        // 스케일된 이미지 좌표에서 현재 뷰포트 기준으로 변환
        const scaledX = item.x * imageScale.width - canvasOffset.x;
        const scaledY = item.y * imageScale.height - canvasOffset.y;

        // 뷰포트 내에 있는 아이템만 그리기
        if (
          scaledX >= -itemPixelSize &&
          scaledX <= canvasSize.width + itemPixelSize &&
          scaledY >= -itemPixelSize &&
          scaledY <= canvasSize.height + itemPixelSize
        ) {
          ctx.strokeRect(
            scaledX - itemPixelSize / 2,
            scaledY - itemPixelSize / 2,
            itemPixelSize,
            itemPixelSize
          );
        }
      });
    },
    [canvasSize, items, imageScale, canvasOffset, itemPixelSize]
  );

  // 배경 이미지 로드
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setBackgroundImg(img);
      // 이미지 로드 완료 시 배율 계산
      const scale = calculateImageScale(img.naturalWidth, img.naturalHeight);
      setImageScale(scale);
    };
    img.src = backgroundImage;
  }, [backgroundImage, calculateImageScale]);

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
    if (!canvasRef.current || !backgroundImg || imageScale.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 고해상도 디스플레이 대응
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize.width * dpr;
    canvas.height = canvasSize.height * dpr;
    ctx.scale(dpr, dpr);

    // 배경 이미지 그리기 (뷰포트에 맞게 일부분만 렌더링)
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    // drawImage(소스이미지, 소스x, 소스y, 소스width, 소스height, 대상x, 대상y, 대상width, 대상height)
    ctx.drawImage(
      backgroundImg,
      // 소스 이미지에서 잘라낼 영역 (offset 적용)
      canvasOffset.x * (backgroundImg.naturalWidth / imageScale.width), // 원본 이미지 기준으로 변환
      canvasOffset.y * (backgroundImg.naturalHeight / imageScale.height),
      canvasSize.width * (backgroundImg.naturalWidth / imageScale.width), // 뷰포트 크기만큼
      canvasSize.height * (backgroundImg.naturalHeight / imageScale.height),
      // 캔버스에 그릴 위치 (전체 캔버스에 채움)
      0,
      0,
      canvasSize.width,
      canvasSize.height
    );

    // 디버그용: 아이템 위치 표시
    drawItemAreas(ctx);
  }, [
    canvasSize,
    backgroundImg,
    items,
    drawItemAreas,
    canvasOffset,
    imageScale,
  ]);

  // 좌표 정규화: 캔버스 좌표 -> 이미지 내 절대 좌표
  const getImageCoordinates = useCallback(
    (clientX: number, clientY: number) => {
      if (!canvasRef.current || imageScale.width === 0) return null;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();

      // 캔버스 내부 좌표로 변환
      const canvasX = clientX - rect.left;
      const canvasY = clientY - rect.top;

      // 스케일된 이미지 좌표로 변환 (오프셋 적용)
      const imageX = canvasX + canvasOffset.x;
      const imageY = canvasY + canvasOffset.y;

      return { x: imageX, y: imageY };
    },
    [canvasSize, canvasOffset, imageScale]
  );

  // 아이템 선택 감지
  const detectItemSelection = useCallback(
    (imageX: number, imageY: number) => {
      if (imageScale.width === 0) return null;

      for (const item of items) {
        // 아이템의 실제 스케일된 좌표
        const itemX = item.x * imageScale.width;
        const itemY = item.y * imageScale.height;

        const halfSize = itemPixelSize / 2;

        const isInXRange =
          imageX >= itemX - halfSize && imageX <= itemX + halfSize;
        const isInYRange =
          imageY >= itemY - halfSize && imageY <= itemY + halfSize;

        if (isInXRange && isInYRange) {
          return item;
        }
      }
      return null;
    },
    [items, imageScale, itemPixelSize]
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

      const imageCoords = getImageCoordinates(clientX, clientY);
      if (!imageCoords) return;

      const selectedItem = detectItemSelection(imageCoords.x, imageCoords.y);
      if (selectedItem) {
        onItemSelect(selectedItem);
      }
    },
    [getImageCoordinates, detectItemSelection, onItemSelect]
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
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
      <div
        id="button-down"
        className="absolute bottom-12 right-12 w-4 h-4 bg-black/50 border-2 border-amber-50"
        onClick={() => {
          const svh = Math.min(window.innerHeight, window.screen.height);
          const moveStep = svh * 0.1; // 10% 이동
          setCanvasOffset({ x: canvasOffset.x, y: canvasOffset.y + moveStep });
        }}
      />
      <div
        id="button-up"
        className="absolute bottom-16 right-12 w-4 h-4 bg-black/50 border-2 border-amber-50"
        onClick={() => {
          const svh = Math.min(window.innerHeight, window.screen.height);
          const moveStep = svh * 0.1; // 10% 이동
          setCanvasOffset({ x: canvasOffset.x, y: canvasOffset.y - moveStep });
        }}
      />
      <div
        id="button-left"
        className="absolute bottom-12 right-16 w-4 h-4 bg-black/50 border-2 border-amber-50"
        onClick={() => {
          const svw = Math.min(window.innerWidth, window.screen.width);
          const moveStep = svw * 0.1; // 10% 이동
          setCanvasOffset({ x: canvasOffset.x - moveStep, y: canvasOffset.y });
        }}
      />
      <div
        id="button-right"
        className="absolute bottom-12 right-8 w-4 h-4 bg-black/50 border-2 border-amber-50"
        onClick={() => {
          const svw = Math.min(window.innerWidth, window.screen.width);
          const moveStep = svw * 0.1; // 10% 이동
          setCanvasOffset({ x: canvasOffset.x + moveStep, y: canvasOffset.y });
        }}
      />
      <div
        id="button-zoom-in"
        className="absolute bottom-12 left-12 w-4 h-4 bg-black/50 border-2 border-amber-50"
        onClick={() => setZoomLevel(zoomLevel + 0.25)}
      />
      <div
        id="button-zoom-out"
        className="absolute bottom-12 left-16 w-4 h-4 bg-black/50 border-2 border-amber-50"
        onClick={() => setZoomLevel(zoomLevel - 0.25)}
      />
    </div>
  );
}
