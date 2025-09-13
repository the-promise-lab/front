import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useShelfSelectionStore } from '../../model/useShelfSelectionStore';
import type { ShelfItem } from '../../model/types';
import ItemPreviewDialog from './ItemPreviewDialog';

const ITEM_SIZE_PIXEL = 20;

interface ShelfSelectionCanvasProps {
  backgroundImage: string;
  items: ShelfItem[];
}

export default function ShelfSelectionCanvas({
  backgroundImage,
  items,
}: ShelfSelectionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [backgroundImg, setBackgroundImg] = useState<HTMLImageElement | null>(
    null
  );
  const [imageScale, setImageScale] = useState({
    width: 0,
    height: 0,
    offsetX: 0, // 가로 중앙 정렬을 위한 오프셋
  });

  // 가로 스와이프(횡스크롤) 상태
  const [viewOffsetX, setViewOffsetX] = useState(0); // 현재 뷰의 가로 시작 위치(px)
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragStartOffsetX, setDragStartOffsetX] = useState(0);

  const [previewItem, setPreviewItem] = useState<ShelfItem | null>(null);
  const [clickPosition, setClickPosition] = useState<
    { x: number; y: number } | undefined
  >(undefined);

  const { selectNewShelfItem } = useShelfSelectionStore();
  const handleConfirmAdd = useCallback(() => {
    if (!previewItem) return;
    selectNewShelfItem(previewItem);
    setPreviewItem(null);
    setClickPosition(undefined);
  }, [previewItem, selectNewShelfItem]);

  // 뷰포트 크기 계산 (svw, svh 기준)
  const calculateCanvasSize = useCallback(() => {
    const svw = window.innerWidth;
    const svh = window.innerHeight;
    return { width: svw, height: svh };
  }, []);

  // 이미지 스케일 계산 (높이 100svh 기준, 원본 비율 유지)
  const calculateImageScale = useCallback(
    (imgWidth: number, imgHeight: number) => {
      const { width: containerWidth, height: containerHeight } =
        calculateCanvasSize();

      // 높이를 100dvh에 맞추고 원본 비율 유지
      const scaleRatio = containerHeight / imgHeight;
      const scaledWidth = imgWidth * scaleRatio;
      const scaledHeight = containerHeight;

      // 중앙 정렬을 위한 오프셋 계산 (이미지가 작든 크든 항상 중앙 정렬)
      const offsetX = (containerWidth - scaledWidth) / 2;

      return {
        width: scaledWidth,
        height: scaledHeight,
        offsetX,
      };
    },
    [calculateCanvasSize]
  );

  // 아이템 영역 그리기 (디버그용)
  const drawItemAreas = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (imageScale.width === 0) return;

      ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.lineWidth = 2;

      items.forEach((item) => {
        // 이미지 내 상대 좌표를 스케일된 캔버스 좌표로 변환
        const isWide = imageScale.width > canvasSize.width;
        const baseX = item.x * imageScale.width;
        const scaledX = isWide
          ? baseX - viewOffsetX // 크롭된 경우, 현재 뷰의 시작점을 빼서 캔버스 좌표로 변환
          : baseX + imageScale.offsetX; // 전체 이미지가 보이는 경우 중앙 오프셋 적용
        const scaledY = item.y * imageScale.height;

        // 아이템 영역 그리기
        ctx.strokeRect(
          scaledX - ITEM_SIZE_PIXEL / 2,
          scaledY - ITEM_SIZE_PIXEL / 2,
          ITEM_SIZE_PIXEL,
          ITEM_SIZE_PIXEL
        );
      });
    },
    [items, imageScale, canvasSize.width, viewOffsetX]
  );

  // 배경 이미지 로드
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setBackgroundImg(img);
      // 이미지 로드 완료 시 배율 계산
      const scale = calculateImageScale(img.naturalWidth, img.naturalHeight);
      setImageScale(scale);
      // 초기 뷰 오프셋을 중앙으로 설정(이미지가 화면보다 클 때만 의미 있음)
      const container = calculateCanvasSize();
      const maxScroll = Math.max(0, scale.width - container.width);
      setViewOffsetX(maxScroll > 0 ? Math.floor(maxScroll / 2) : 0);
    };
    img.src = backgroundImage;
  }, [backgroundImage, calculateImageScale]);

  // Canvas 크기 설정 및 리사이즈 처리
  useEffect(() => {
    const size = calculateCanvasSize();
    setCanvasSize(size);

    const handleResize = () => {
      const newSize = calculateCanvasSize();
      setCanvasSize(newSize);

      // 리사이즈 시 이미지 스케일도 재계산
      if (backgroundImg) {
        const newScale = calculateImageScale(
          backgroundImg.naturalWidth,
          backgroundImg.naturalHeight
        );
        setImageScale(newScale);
        // 리사이즈 시 현재 오프셋을 허용 범위로 클램프
        const maxScroll = Math.max(0, newScale.width - newSize.width);
        setViewOffsetX((prev) => Math.min(Math.max(prev, 0), maxScroll));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateCanvasSize, calculateImageScale, backgroundImg]);

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

    // 배경 클리어
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    // 이미지 그리기 (항상 중앙 정렬 또는 크롭)
    if (imageScale.width <= canvasSize.width) {
      // 이미지가 화면보다 작거나 같은 경우 - 중앙에 배치하고 양쪽 여백
      ctx.drawImage(
        backgroundImg,
        imageScale.offsetX, // 중앙 정렬 오프셋
        0,
        imageScale.width,
        imageScale.height
      );
    } else {
      // 이미지가 화면보다 큰 경우 - 현재 뷰 시작점(viewOffsetX)을 기준으로 잘라서 표시
      const cropStartX = viewOffsetX;
      const sourceStartX =
        cropStartX * (backgroundImg.naturalWidth / imageScale.width);
      const sourceWidth =
        canvasSize.width * (backgroundImg.naturalWidth / imageScale.width);

      ctx.drawImage(
        backgroundImg,
        sourceStartX, // 소스 이미지에서 중앙 부분 시작점
        0, // 소스 Y (전체 높이 사용)
        sourceWidth, // 소스 너비 (화면 너비만큼)
        backgroundImg.naturalHeight, // 소스 높이 (전체 높이)
        0, // 캔버스 X
        0, // 캔버스 Y
        canvasSize.width, // 캔버스 너비
        canvasSize.height // 캔버스 높이
      );
    }

    // 디버그용: 아이템 위치 표시
    drawItemAreas(ctx);
  }, [canvasSize, backgroundImg, drawItemAreas, imageScale, viewOffsetX]);

  // 좌표 정규화: 캔버스 좌표 -> 이미지 내 절대 좌표
  const getImageCoordinates = useCallback(
    (clientX: number, clientY: number) => {
      if (!canvasRef.current || imageScale.width === 0) return null;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();

      // 캔버스 내부 좌표로 변환
      const canvasX = clientX - rect.left;
      const canvasY = clientY - rect.top;

      // 이미지 좌표로 변환
      if (imageScale.width <= canvasSize.width) {
        // 이미지가 작거나 같은 경우 - 오프셋 고려
        const imageX = canvasX - imageScale.offsetX;
        const imageY = canvasY;
        return { x: imageX, y: imageY };
      } else {
        // 이미지가 큰 경우 - 현재 뷰 시작점(viewOffsetX) 고려
        const cropStartX = viewOffsetX;
        const imageX = canvasX + cropStartX;
        const imageY = canvasY;
        return { x: imageX, y: imageY };
      }
    },
    [canvasSize, imageScale, viewOffsetX]
  );

  // 아이템 선택 감지
  const detectItemSelection = useCallback(
    (imageX: number, imageY: number) => {
      if (imageScale.width === 0) return null;

      for (const item of items) {
        // 아이템의 실제 스케일된 좌표
        const itemX = item.x * imageScale.width;
        const itemY = item.y * imageScale.height;

        const halfSize = ITEM_SIZE_PIXEL / 2;

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
    [items, imageScale]
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
        setPreviewItem(selectedItem);
        setClickPosition({ x: clientX, y: clientY });
      }
    },
    [getImageCoordinates, detectItemSelection]
  );

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{
          width: `${canvasSize.width}px`,
          height: `${canvasSize.height}px`,
          touchAction: 'none',
        }}
        className="cursor-pointer block"
        onClick={handleCanvasInteraction}
        onTouchStart={(e) => {
          if (e.touches.length > 0) {
            setDragStartX(e.touches[0].clientX);
            setDragStartOffsetX(viewOffsetX);
          }
        }}
        onTouchMove={(e) => {
          if (dragStartX == null) return;
          const x = e.touches[0]?.clientX;
          if (x == null) return;
          const deltaX = x - dragStartX; // 오른쪽(+)으로 드래그 시 오른쪽 영역을 보도록 이동
          const maxScroll = Math.max(0, imageScale.width - canvasSize.width);
          const next = Math.min(
            Math.max(dragStartOffsetX - deltaX, 0),
            maxScroll
          );
          setViewOffsetX(next);
        }}
        onTouchEnd={(e) => {
          // 탭 제스처 처리: 이동량이 매우 작으면 선택으로 간주
          const endX = e.changedTouches?.[0]?.clientX;
          const endY = e.changedTouches?.[0]?.clientY;
          if (dragStartX != null && endX != null && endY != null) {
            const moved = Math.abs(endX - dragStartX);
            if (moved < 5) {
              const rect = canvasRef.current?.getBoundingClientRect();
              if (!rect) return setDragStartX(null);
              const clientX = endX;
              const clientY = endY;
              const imageCoords = getImageCoordinates(clientX, clientY);
              if (imageCoords) {
                const selectedItem = detectItemSelection(
                  imageCoords.x,
                  imageCoords.y
                );
                if (selectedItem) {
                  setPreviewItem(selectedItem);
                  setClickPosition({ x: clientX, y: clientY });
                }
              }
            }
          }
          setDragStartX(null);
        }}
      />

      <ItemPreviewDialog
        item={previewItem}
        open={!!previewItem}
        onClose={() => {
          setPreviewItem(null);
          setClickPosition(undefined);
        }}
        onConfirm={handleConfirmAdd}
        position={clickPosition}
      />
    </div>
  );
}
