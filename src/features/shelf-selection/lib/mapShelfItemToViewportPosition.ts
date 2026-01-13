import type { ShelfItem } from '../model/types';

interface ImageScale {
  width: number;
  height: number;
  offsetX: number;
}

interface CanvasSize {
  width: number;
  height: number;
}

interface MapShelfItemToViewportPositionParams {
  item: ShelfItem;
  imageScale: ImageScale;
  canvasSize: CanvasSize;
  viewOffsetX: number;
}

interface ViewportPosition {
  xPx: number;
  yPx: number;
}

/**
 * ShelfItem의 상대 좌표(0~1)를 현재 뷰포트 기준 px 좌표로 변환합니다.
 * - 이미지가 뷰포트보다 클 때는 횡스크롤(viewOffsetX)을 반영해 크롭된 부분을 보정합니다.
 * - 이미지가 뷰포트보다 작거나 같을 때는 중앙 정렬(offsetX)을 반영합니다.
 */
export function mapShelfItemToViewportPosition({
  item,
  imageScale,
  canvasSize,
  viewOffsetX,
}: MapShelfItemToViewportPositionParams): ViewportPosition | null {
  if (imageScale.width === 0 || canvasSize.width === 0) return null;

  const isWide = imageScale.width > canvasSize.width;
  const baseX = item.x * imageScale.width;
  const xPx = isWide ? baseX - viewOffsetX : baseX + imageScale.offsetX;
  const yPx = item.y * imageScale.height;

  return { xPx, yPx };
}
