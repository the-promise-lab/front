import { OpenAPI } from '@api';
import { config } from '@config/env';
import { useAuthStore } from '@shared/auth/model/useAuthStore';

/**
 * API 클라이언트 초기화
 * - OpenAPI.BASE: API 서버 주소 설정
 * - OpenAPI.TOKEN: 매 요청마다 accessToken을 헤더에 포함
 * - OpenAPI.WITH_CREDENTIALS: 쿠키 포함
 * - OpenAPI.HEADERS: 커스텀 헤더
 */
export function setupApiClient() {
  OpenAPI.BASE = config.API_BASE_URL;
  OpenAPI.WITH_CREDENTIALS = true;
  OpenAPI.CREDENTIALS = 'include';
  OpenAPI.HEADERS = async () => ({ 'X-Client': 'web' });

  // 매 요청마다 zustand store에서 토큰을 가져오는 resolver 함수
  OpenAPI.TOKEN = async () => {
    return useAuthStore.getState().accessToken || '';
  };
}
