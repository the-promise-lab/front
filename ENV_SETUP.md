# 환경변수 설정 가이드

## 환경변수 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# .env.local
VITE_API_BASE_URL=https://43.200.235.94.nip.io
VITE_KAKAO_JAVASCRIPT_KEY=abcd1234cde567fg89
VITE_KAKAO_REST_API_KEY=rest_abcd1234cde567fg89
```

## 환경변수 설명

- `VITE_API_BASE_URL`: 백엔드 서버의 기본 URL
- `VITE_KAKAO_JAVASCRIPT_KEY`: 카카오 개발자 콘솔에서 발급받은 JavaScript 키
- `VITE_KAKAO_REST_API_KEY`: 카카오 REST API 호출용 키

## 사용법

코드에서는 `src/config/env.ts`를 통해 환경변수에 접근합니다:

```typescript
import { config } from '@/config/env';

// API 호출 시
fetch(`${config.API_BASE_URL}/api/endpoint`);

// 카카오 키 사용 시
window.Kakao.init(config.KAKAO_JAVASCRIPT_KEY);
```

## 주의사항

1. `.env.local` 파일은 `.gitignore`에 추가되어 Git에 커밋되지 않습니다.
2. Vite에서는 `VITE_` 접두사가 붙은 환경변수만 클라이언트에서 접근 가능합니다.
3. 환경변수가 설정되지 않은 경우 기본값이 사용됩니다.

## 개발/프로덕션 환경별 설정

- **개발환경**: `.env.local` 파일 사용
- **프로덕션**: 배포 플랫폼의 환경변수 설정 사용
