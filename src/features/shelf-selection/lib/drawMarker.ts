const targetMarkerPng: string = '/target_marker.png';

// 전역 캐시
let cachedMarkerImage: HTMLImageElement | null = null;
let imageLoadPromise: Promise<HTMLImageElement> | null = null;

/**
 * 마커 이미지를 미리 로드하고 캐시합니다.
 * 여러 번 호출해도 이미지는 한 번만 로드됩니다.
 * @returns {Promise<HTMLImageElement>} 로드된 이미지 엘리먼트를 반환하는 Promise.
 */
export function preloadMarkerImage(): Promise<HTMLImageElement> {
  // 이미 로드된 경우 즉시 반환
  if (cachedMarkerImage) {
    return Promise.resolve(cachedMarkerImage);
  }

  // 로딩 중인 경우 기존 Promise 반환
  if (imageLoadPromise) {
    return imageLoadPromise;
  }

  // 새로 로드 시작
  imageLoadPromise = new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      cachedMarkerImage = img;
      resolve(img);
    };

    img.onerror = () => {
      imageLoadPromise = null;
      reject(new Error(`Failed to load marker image: ${targetMarkerPng}`));
    };

    img.src = targetMarkerPng;
  });

  return imageLoadPromise;
}

/**
 * 캐시된 이미지로 마커를 Canvas의 특정 위치에 동기적으로 그립니다.
 * preloadMarkerImage()를 먼저 호출해야 합니다.
 * @param ctx - Canvas 2D 렌더링 컨텍스트.
 * @param x - 마커의 중심 x 좌표.
 * @param y - 마커의 중심 y 좌표.
 * @param width - 그릴 이미지의 너비.
 * @param height - 그릴 이미지의 높이.
 */
export function drawMarker(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  if (!cachedMarkerImage) {
    console.warn('Marker image not loaded. Call preloadMarkerImage() first.');
    return;
  }

  // 중심 좌표 기준으로 좌상단 좌표 계산 후 Canvas에 이미지 그리기
  const markerLeft = x - width / 2;
  const markerTop = y - height / 2;
  ctx.drawImage(cachedMarkerImage, markerLeft, markerTop, width, height);
}
