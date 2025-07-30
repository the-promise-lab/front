# 🚀 프로젝트 설정 가이드

## 📋 개요

이 프로젝트는 **React 19 + TypeScript + Vite** 기반의 모던 웹 애플리케이션입니다.
팀 개발을 위해 최적화된 개발 환경이 구성되어 있습니다.

## 🛠️ 기술 스택

### **핵심 기술**

- **React 19** - 최신 React 버전
- **TypeScript** - 타입 안전성 보장
- **Vite 5.4.19** - 빠른 개발 서버 및 빌드 도구

### **상태 관리 & 데이터**

- **Jotai** - 경량 상태 관리
- **TanStack Query** - 서버 상태 관리
- **Axios** - HTTP 클라이언트

### **폼 관리 & 검증**

- **React Hook Form** - 성능 최적화된 폼 라이브러리
- **Zod** - TypeScript 네이티브 스키마 검증
- **@hookform/resolvers** - React Hook Form과 Zod 연동

### **스타일링**

- **Tailwind CSS v4** - 유틸리티 퍼스트 CSS 프레임워크
- **PostCSS** - CSS 전처리기
- **Autoprefixer** - 브라우저 호환성 자동 추가

### **개발 도구**

- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **Husky** - Git hooks
- **lint-staged** - 스테이징된 파일만 린팅
- **Vitest** - 단위 테스트

## 📁 프로젝트 구조

```
front/
├── src/
│   ├── api/          # API 관련 함수들
│   ├── components/   # 재사용 가능한 컴포넌트
│   ├── hooks/        # 커스텀 React 훅
│   ├── services/     # 비즈니스 로직
│   ├── types/        # TypeScript 타입 정의
│   ├── utils/        # 유틸리티 함수
│   ├── test/         # 테스트 설정
│   ├── styles/       # 스타일 파일
│   └── assets/       # 정적 리소스
├── public/           # 정적 파일
├── .vscode/          # VS Code 설정
├── .husky/           # Git hooks
└── [설정 파일들]
```

## 🔧 개발 환경 설정

### **1. Node.js 버전**

- **현재**: Node.js v18.17.0
- **권장**: Node.js v20+ (향후 업그레이드 예정)

### **2. 패키지 매니저**

```bash
npm install  # 의존성 설치
```

### **3. 개발 서버 실행**

```bash
npm run dev  # http://localhost:5173 (또는 5174)
```

## 📝 주요 설정 파일들

### **ESLint 설정** (`eslint.config.js`)

- TypeScript ESLint 플러그인
- React Hooks 규칙
- React Refresh (HMR) 지원
- 브라우저 환경 글로벌 변수

### **TypeScript 설정** (`tsconfig.app.json`)

- 엄격한 타입 검사 (`strict: true`)
- 미사용 변수/매개변수 경고
- 모던 ES2022 타겟
- React JSX 지원

### **Tailwind CSS 설정** (`tailwind.config.js`)

- v4 스타일 설정
- src 디렉토리 내 모든 TS/TSX 파일 스캔
- PostCSS와 연동

### **Vite 설정** (`vite.config.ts`)

- React 플러그인
- 빠른 HMR 지원

## 🚀 사용 가능한 스크립트

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run lint     # 코드 린팅
npm run test     # 테스트 실행
npm run preview  # 빌드 결과 미리보기
```

## 🔄 Git Workflow

### **Pre-commit Hooks**

- **Husky**가 Git commit 전에 자동으로 실행
- **lint-staged**가 스테이징된 파일만 검사
- ESLint + Prettier 자동 적용

### **코드 품질**

- **ESLint**: 코드 품질 및 스타일 검사
- **Prettier**: 일관된 코드 포맷팅
- **TypeScript**: 컴파일 타임 타입 검사

## 🎨 VS Code 설정

### **추천 확장 프로그램**

- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag

### **자동 설정**

- 저장 시 자동 포맷팅
- 저장 시 ESLint 자동 수정
- TypeScript 자동 import

## 📦 환경 변수

### **설정 방법**

1. `.env.example` 파일을 참고
2. `.env.local` 파일 생성
3. 필요한 환경 변수 설정

### **주요 환경 변수**

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
NODE_ENV=development
VITE_ENABLE_DEBUG=true
```

## 🧪 테스트 환경

### **Vitest 설정**

- **설정 파일**: `vitest.config.ts`
- **테스트 환경**: jsdom
- **설정 파일**: `src/test/setup.ts`

### **테스트 실행**

```bash
npm run test              # 테스트 실행
npm run test -- --coverage  # 커버리지 포함
```

## 🔍 문제 해결

### **자주 발생하는 문제들**

#### **1. Node.js 버전 호환성**

```bash
# 현재 버전 확인
node --version

# 권장: Node.js 20+ 설치
nvm install 20
nvm use 20
```

#### **2. 의존성 설치 문제**

```bash
# 캐시 클리어 후 재설치
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### **3. 포트 충돌**

```bash
# 다른 포트로 실행
npm run dev -- --port 3001
```

#### **4. ESLint 에러**

```bash
# 자동 수정
npm run lint -- --fix
```

## 📚 추가 리소스

### **공식 문서**

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

### **팀 개발 가이드**

- [컴포넌트 작성 가이드](./COMPONENT_GUIDE.md)
- [API 통신 가이드](./API_GUIDE.md)
- [테스트 작성 가이드](./TESTING_GUIDE.md)

## 🤝 팀 협업

### **브랜치 전략**

- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발 브랜치
- `hotfix/*`: 긴급 수정 브랜치

### **커밋 메시지 규칙**

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 프로세스 수정
```

---

**마지막 업데이트**: 2024년 7월 30일
**버전**: 1.0.0
