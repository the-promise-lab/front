const targetMarkerPng: string = '/target_marker.png';

/**
 * PNG 이미지를 Canvas의 특정 위치에 그립니다.
 * * @param ctx - Canvas 2D 렌더링 컨텍스트.
 * @param x - 마커의 중심 x 좌표.
 * @param y - 마커의 중심 y 좌표.
 * @param width - 그릴 이미지의 너비.
 * @param height - 그릴 이미지의 높이.
 * @returns {Promise<void>} 이미지가 로드되고 그려지면 완료되는 Promise.
 */
export function drawMarker(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // 이미지 로드 성공 시
    img.onload = () => {
      try {
        // 중심 좌표 기준으로 좌상단 좌표 계산 후 Canvas에 이미지 그리기
        const markerLeft = x - width / 2;
        const markerTop = y - height / 2;
        ctx.drawImage(img, markerLeft, markerTop, width, height);
        resolve();
      } catch (error) {
        // drawImage 중 예상치 못한 오류 발생 시
        reject(new Error(`Failed to draw image: ${error}`));
      }
    };

    // 이미지 로드 실패 시
    img.onerror = () => {
      reject(new Error(`Failed to load image from URL: ${targetMarkerPng}`));
    };

    // 이미지 로드 시작
    img.src = targetMarkerPng;
  });
}
