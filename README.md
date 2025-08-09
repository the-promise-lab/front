# React + TypeScript + Vite 프로젝트

모던 웹 개발을 위한 React + TypeScript + Vite 기반 프로젝트입니다.

## 🚀 기술 스택

- **React 19** - 최신 React 버전
- **TypeScript** - 타입 안전성
- **Vite** - 빠른 개발 서버 및 빌드 도구
- **Tailwind CSS v4** - 유틸리티 퍼스트 CSS 프레임워크
- **Jotai** - 경량 상태 관리
- **TanStack Query** - 서버 상태 관리
- **React Hook Form + Zod** - 폼 관리 및 검증

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 린팅
npm run lint


```

## 🏗️ 프로젝트 구조

```
src/
├── api/          # API 관련
├── components/   # 재사용 컴포넌트
├── hooks/        # 커스텀 훅
├── services/     # 비즈니스 로직
├── types/        # TypeScript 타입 정의
├── utils/        # 유틸리티 함수

```

## 🔧 개발 도구

- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **Husky** - Git hooks
- **lint-staged** - 스테이징된 파일만 린팅

## 📝 환경 변수

`.env.example` 파일을 참고하여 필요한 환경 변수를 설정하세요.

## OpenAPI TypeGen

```bash
npx openapi \
--input {backend-url}/api/docs-json \
--output src/api \
--client axios \
--exportSchemas true
```

`src/api/`에서 `AppService`를 import하고, `AppService`의 메서드를 사용하여 API를 호출합니다.

```ts
import { AppService } from '@/api';

const message = await AppService.appControllerGetHello();
const health = await AppService.appControllerGetHealth(); // 타입: HealthCheckDto
```

TanStack Query 예시

```ts
import { useQuery } from '@tanstack/react-query';
import { AppService } from '@/api';

function useHealth() {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => AppService.appControllerGetHealth(),
  });
}
```

에러 처리 예시

```tsx
import { ApiError, AppService } from '@/api';

try {
  await AppService.appControllerGetHealth();
} catch (e) {
  if (e instanceof ApiError) {
    // e.status, e.body 등 참조 가능
  }
}
```
