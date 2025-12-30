# 환경변수 설정 가이드

## 1. Node.js 버전 요구사항

이 프로젝트는 **Node.js 22.x** 버전을 기준으로 개발 및 빌드됩니다.

- 로컬 개발 시 `nvm` 등을 사용하여 버전을 맞춰주세요: `nvm use 22`
- CI/CD 파이프라인도 Node.js 22 버전을 사용합니다.

## 2. 환경변수 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# .env.local 예시
VITE_API_BASE_URL=https://api.bttf.kr
VITE_KAKAO_JAVASCRIPT_KEY=your_kakao_js_key
VITE_KAKAO_REST_API_KEY=your_kakao_rest_key
```

> **중요**: 실제 키 값은 `SECURITY.md` 정책에 따라 관련 담당자에게 요청하여 안전하게 전달받아야 합니다.

## 3. 환경변수 설명

- `VITE_API_BASE_URL`: 백엔드 서버의 기본 URL
- `VITE_KAKAO_JAVASCRIPT_KEY`: 카카오 개발자 콘솔에서 발급받은 JavaScript 키
- `VITE_KAKAO_REST_API_KEY`: 카카오 REST API 호출용 키

## 4. 사용법

코드에서는 `src/config/env.ts`를 통해 환경변수에 접근합니다:

```typescript
import { config } from '@/config/env';

// API 호출 시
fetch(`${config.API_BASE_URL}/api/endpoint`);

// 카카오 키 사용 시
window.Kakao.init(config.KAKAO_JAVASCRIPT_KEY);
```

## 5. 주의사항 (보안)

1. **커밋 금지**: `.env.local` 파일은 `.gitignore`에 추가되어 Git에 커밋되지 않습니다. 실수로 커밋하지 않도록 주의하세요.
2. **접두사**: Vite에서는 `VITE_` 접두사가 붙은 환경변수만 클라이언트(브라우저)에서 접근 가능합니다.
3. **프로덕션**: 배포 환경의 환경변수 설정은 `CI_CD_SETUP_GUIDE.md`를 참고하세요.

자세한 보안 정책은 [SECURITY.md](SECURITY.md)를 참고하시기 바랍니다.
