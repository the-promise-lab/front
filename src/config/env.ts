// 환경변수 설정
export const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  KAKAO_JAVASCRIPT_KEY: import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY,
  KAKAO_REST_API_KEY: import.meta.env.VITE_KAKAO_REST_API_KEY,
} as const;

// 환경변수 검증
if (!config.API_BASE_URL) {
  console.warn('VITE_API_BASE_URL이 설정되지 않았습니다.');
}

if (!config.KAKAO_JAVASCRIPT_KEY) {
  console.warn('VITE_KAKAO_JAVASCRIPT_KEY가 설정되지 않았습니다.');
}

if (!config.KAKAO_REST_API_KEY) {
  console.warn('VITE_KAKAO_REST_API_KEY가 설정되지 않았습니다.');
}
