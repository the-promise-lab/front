import { memo, useMemo } from 'react';
import { cn } from '@shared/lib/utils';
import type { ShelfItem } from '../../model/types';
import { mapShelfItemToViewportPosition } from '../../lib/mapShelfItemToViewportPosition';
import Typography from '@shared/ui/Typography';

interface ImageScale {
  width: number;
  height: number;
  offsetX: number;
}

interface CanvasSize {
  width: number;
  height: number;
}

interface ItemNameLabelOverlayProps {
  items: ShelfItem[];
  imageScale: ImageScale;
  canvasSize: CanvasSize;
  viewOffsetX: number;
}

const EDGE_PADDING_PX = 12; // 화면 양끝 여유 (폭 미측정 대비 최소 여백)
const LABEL_GAP_PX = 18; // 마커 중심에서 라벨 상단까지의 간격

export const ItemNameLabelOverlay = memo(function ItemNameLabelOverlay({
  items,
  imageScale,
  canvasSize,
  viewOffsetX,
}: ItemNameLabelOverlayProps) {
  const mappedItems = useMemo(() => {
    return items
      .map(item => {
        const pos = mapShelfItemToViewportPosition({
          item,
          imageScale,
          canvasSize,
          viewOffsetX,
        });
        if (!pos) return null;

        // 가장자리 클램프: 라벨이 화면 밖으로 삐져나가지 않도록 좌우 여유를 둡니다.
        const clampedX = Math.min(
          Math.max(pos.xPx, EDGE_PADDING_PX),
          Math.max(canvasSize.width - EDGE_PADDING_PX, EDGE_PADDING_PX)
        );

        return { ...pos, xPx: clampedX, item };
      })
      .filter(Boolean) as Array<{ xPx: number; yPx: number; item: ShelfItem }>;
  }, [items, imageScale, canvasSize, viewOffsetX]);

  if (imageScale.width === 0 || canvasSize.width === 0) return null;

  return (
    <div className='pointer-events-none absolute inset-0'>
      {mappedItems.map(({ item, xPx, yPx }) => (
        <div
          key={item.id}
          className={cn(
            'pointer-events-none absolute flex items-center justify-center',
            'h-11 w-fit',
            'border border-white bg-white/30',
            'shadow-[1px_1px_1px_0px_rgba(0,0,0,0.25)]',
            'px-6 py-4'
          )}
          style={{
            transform: `translate3d(${xPx}px, ${yPx + LABEL_GAP_PX}px, 0) translateX(-50%)`,
          }}
        >
          <Typography variant='caption' className='text-white'>
            {item.name}
          </Typography>
        </div>
      ))}
    </div>
  );
});
