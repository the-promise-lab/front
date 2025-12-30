# React + TypeScript + Vite (FSD based 5 Layered)

테크포임팩트 LAB 테크니컬 가이드라인을 따르는 React 19 + Vite 기반 프로젝트입니다. 협업·배포 원칙은 [테크포임팩트 LAB의 일하는 방식](https://tech-for-mpact.gitbook.io/lab-guidebook/lab-operations/way-of-working)과 [테크니컬 가이드라인](https://tech-for-mpact.gitbook.io/lab-guidebook/lab-operations/way-of-working/technical-guide#id-4.-github)에 맞춰 정리했습니다.

## 기술 스택

- React 19, TypeScript, Vite, Node.js v22
- Tailwind CSS v4 (정규화 스케일), cn(twmerge+clsx)
- 상태: Zustand(전역), TanStack Query(서버 상태)
- 폼/검증: React Hook Form, Zod
- 애니메이션: Framer Motion, Motion

## 빠른 시작

```bash
npm install
npm run dev # http://localhost:3000
```

### 스크립트

- `npm run dev` 개발 서버
- `npm run build` 타입체크+빌드
- `npm run preview` 로컬 빌드 프리뷰
- `npm run lint` / `npm run lint:fix`
- `npm run type-check`
- `npm run generate-api` (원격 OpenAPI)
- `npm run generate-api-local` (로컬 swagger.json)
- `npm run format` / `npm run format:check`

## 환경 변수

- 예시: `.env.local`
  ```bash
  VITE_API_BASE_URL=https://43.200.235.94.nip.io
  VITE_KAKAO_JAVASCRIPT_KEY=abcd1234cde567fg89
  VITE_KAKAO_REST_API_KEY=rest_abcd1234cde567fg89
  ```
- 상세: `ENV_SETUP.md`
- 접근: `src/config/env.ts` (`config.API_BASE_URL`, `config.KAKAO_JAVASCRIPT_KEY`)

## 아키텍처 (FSD based 5 Layered)

```
app → processes → features → entities → shared
                 ↘ api (codegen)
```

- 단방향 의존, 같은 레벨 직접 의존 금지
- features는 `api/` 계층(codegen)를 통해서만 네트워크/스토리지 접근
- shared는 도메인 무취(UI·lib·auth infra·config)
- app은 조립만, processes는 전역 플로우 오케스트레이션, entities는 핵심 도메인 모델
- 경로 별칭: `@app/* @processes/* @features/* @entities/* @shared/* @api/* @config/*`
- 자세한 규칙: `CODEBASE_ARCHITECTURE_PRINCIPLE.md`, `.cursorrules`

## 디렉터리 구조 (요약)

```
src/
  app/            # 레이아웃, providers, 페이지 조립
  processes/      # 전역 플로우/스토어
  features/       # 사용자 시나리오 단위 UI·model·lib
  entities/       # 도메인 모델/타입
  shared/         # UI, lib, auth infra, styles
  api/            # openapi-typescript-codegen 생성물 (편집 금지)
  config/         # env 래퍼/상수
```

## 품질 & 협업 가이드

- 코딩 컨벤션/레이어 규칙: `CODEBASE_ARCHITECTURE_PRINCIPLE.md`, `.cursorrules`
- 브랜치 예시: `main`(prod) ← `develop` ← `feature/<ticket>` / `fix/<ticket>` / `docs/<topic>`
- 커밋 규칙 예시: `feat: ...`, `fix: ...`, `refactor: ...`, `docs: ...`, `chore: ...`
- PR 템플릿/브랜치 보호/CI: `CI_CD_SETUP_GUIDE.md` 참조
- Lint/포맷: Husky + lint-staged 적용 (`npm run lint`, `npm run format`)

## 배포

- Kakao CI: PR→main 및 main push 시 lint → build → Docker 이미지 빌드/푸시(`thepromise2025/thefrontmise:latest` + 태그) → main push 시 자동 태깅/Release 생성
- Kakao CD: Kakao CI 성공 시 또는 수동 dispatch 시 Docker 이미지 풀 → Blue/Green 배포(포트 3010/3011) → `/opt/thepromise/scripts/switch-frontend.sh`로 Nginx 전환
- 서버 배포 시 `.env`는 `KAKAO_ENV_FILE` 시크릿으로 전달, 헬스체크는 `/` 기반
- 자세한 흐름/필수 시크릿: `CI_CD_SETUP_GUIDE.md`

## 문서 모음

- 아키텍처: `docs/CODEBASE_ARCHITECTURE_PRINCIPLE.md`, `.cursorrules`
- CI/CD: `docs/CI_CD_SETUP_GUIDE.md`
- 환경설정: `docs/ENV_SETUP.md`
- 보안 정책: `docs/SECURITY.md`
- 기여 가이드: `docs/CONTRIBUTING.md`
- 스타일링 가이드: `docs/STYLING_GUIDE.md`
- 배경 관리: `docs/BACKGROUND_USAGE.md`
- 사운드 가이드: `docs/USE_GAME_SOUND_MANUAL_KO.md`, `docs/USE_GAME_SOUND_IMPLEMENTATION_KO.md` (영문판 포함)

## 링크 추가/업데이트 제안

- 상단 소개에 현재 배포 URL/스토리북/디자인 문서 링크 추가 필요 시 업데이트
- 협업 섹션에 팀 합의된 브랜치 네이밍/리뷰 규칙이 확정되면 README에 구체 값 반영
- `.cursorrules`, `docs/*`가 최신인지 검토 후 필요 시 개정 날짜 명시 부탁드립니다.
