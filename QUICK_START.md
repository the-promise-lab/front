# ⚡ 빠른 시작 가이드

## 🎯 5분 만에 개발 환경 설정하기

### **1단계: 저장소 클론**

```bash
git clone [repository-url]
cd front
```

### **2단계: 의존성 설치**

```bash
npm install
```

### **3단계: 개발 서버 실행**

```bash
npm run dev
```

### **4단계: 브라우저에서 확인**

- http://localhost:5173 (또는 5174) 접속
- "Vite + React" 페이지가 보이면 성공! 🎉

---

## 🔧 필수 VS Code 확장 프로그램

프로젝트를 열면 VS Code가 자동으로 추천 확장 프로그램을 제안합니다:

1. **Prettier - Code formatter** ✅
2. **ESLint** ✅
3. **Tailwind CSS IntelliSense** ✅
4. **TypeScript Importer** ✅

---

## 📝 첫 번째 컴포넌트 만들기

### **1. 컴포넌트 생성**

```bash
# src/components/HelloWorld.tsx 생성
```

### **2. 컴포넌트 작성**

```tsx
// src/components/HelloWorld.tsx
import React from 'react';

interface HelloWorldProps {
  name: string;
}

export const HelloWorld: React.FC<HelloWorldProps> = ({ name }) => {
  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h1 className="text-2xl font-bold text-blue-800">Hello, {name}! 👋</h1>
    </div>
  );
};
```

### **3. App.tsx에서 사용**

```tsx
// src/App.tsx
import { HelloWorld } from './components/HelloWorld';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <HelloWorld name="팀원" />
    </div>
  );
}

export default App;
```

---

## 🚀 자주 사용하는 명령어

```bash
# 개발 서버 실행
npm run dev

# 코드 린팅
npm run lint

# 린팅 자동 수정
npm run lint -- --fix

# 빌드
npm run build

# 테스트 실행
npm run test

# 빌드 결과 미리보기
npm run preview
```

---

## 🎨 Tailwind CSS 사용법

### **기본 클래스**

```tsx
// 컨테이너
<div className="container mx-auto px-4">

// 그리드
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// 버튼
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">

// 카드
<div className="bg-white shadow-lg rounded-lg p-6">
```

### **반응형 디자인**

```tsx
// 모바일: text-sm, 데스크톱: text-lg
<h1 className="text-sm md:text-lg lg:text-xl">

// 모바일: 1열, 태블릿: 2열, 데스크톱: 3열
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

---

## 🔄 Git Workflow

### **새 기능 개발**

```bash
# 1. 브랜치 생성
git checkout -b feature/새기능

# 2. 개발 작업
# ... 코드 작성 ...

# 3. 스테이징
git add .

# 4. 커밋 (자동으로 린팅 실행됨)
git commit -m "feat: 새 기능 추가"

# 5. 푸시
git push origin feature/새기능
```

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

## 🐛 문제 해결

### **개발 서버가 실행되지 않을 때**

```bash
# 1. 포트 확인
lsof -i :5173

# 2. 다른 포트로 실행
npm run dev -- --port 3001

# 3. 캐시 클리어
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### **ESLint 에러가 발생할 때**

```bash
# 자동 수정
npm run lint -- --fix

# 특정 파일만 수정
npx eslint src/App.tsx --fix
```

### **타입 에러가 발생할 때**

```bash
# TypeScript 체크
npx tsc --noEmit

# 특정 파일만 체크
npx tsc src/App.tsx --noEmit
```

---

## 📚 다음 단계

1. **PROJECT_SETUP.md** - 상세한 프로젝트 설정 가이드
2. **CHANGELOG.md** - 변경 사항 기록
3. **README.md** - 프로젝트 개요

---

## 💡 개발 팁

### **VS Code 단축키**

- `Cmd + Shift + P`: 명령 팔레트
- `Cmd + .`: 빠른 수정 제안
- `Cmd + Shift + F`: 전체 검색
- `Cmd + B`: 사이드바 토글

### **디버깅**

- 브라우저 개발자 도구 활용
- React Developer Tools 확장 프로그램 설치
- VS Code 디버거 설정

### **성능 최적화**

- React.memo 사용
- useMemo, useCallback 활용
- 불필요한 리렌더링 방지

---

**질문이 있으시면 언제든 팀 리드에게 문의하세요!** 🚀
