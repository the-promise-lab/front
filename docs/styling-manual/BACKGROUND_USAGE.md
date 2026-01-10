# 배경 설정 가이드 (Background Management)

## 개요

`useSetBackground` 훅을 사용하여 페이지/컴포넌트의 배경을 설정할 수 있습니다.

- 선언형(마운트 시 자동 설정) + 명령형(이벤트 핸들러에서 변경) 모두 지원
- 자동 cleanup 지원 (언마운트 시 원래 배경으로 복원)

## 설치 위치

```
src/
  shared/
    model/
      useBackgroundStore.ts    # Zustand store (내부 사용)
      useSetBackground.ts      # 공개 API (커스텀 훅)

  app/
    layout/
      RootLayout/
        GlobalBackground.tsx   # 배경 렌더링 컴포넌트
```

## 사용법

### 레벨 1: 페이지 마운트 시 배경 설정 (90% 케이스)

```typescript
import { useSetBackground } from '@shared/model';

function EventPhasePage() {
  // 페이지가 마운트되면 배경색 설정
  // 페이지가 언마운트되면 자동으로 원래 배경으로 복원
  useSetBackground({ color: '#1e293b' });

  return <div>이벤트 페이지 내용</div>;
}
```

### 레벨 2: 이벤트 핸들러에서 배경 변경 (9% 케이스)

```typescript
import { useSetBackground } from '@shared/model';

function IntroStoryPage() {
  // 초기 배경 설정 + 명령형 API 받기
  const { setBackgroundImage } = useSetBackground({ color: '#000' });

  const handleSceneChange = (sceneNumber: number) => {
    // 장면이 바뀔 때마다 배경 이미지 변경
    setBackgroundImage(`/scene-${sceneNumber}.png`);
  };

  return (
    <div>
      <button onClick={() => handleSceneChange(1)}>장면 1</button>
      <button onClick={() => handleSceneChange(2)}>장면 2</button>
      <button onClick={() => handleSceneChange(3)}>장면 3</button>
    </div>
  );
}
```

### 레벨 3: Store 직접 접근 (1% 케이스 - 복잡한 로직)

```typescript
import { useBackgroundStore } from '@shared/model';

function ComplexAnimationPage() {
  const { setBackgroundColor, resetBackground } = useBackgroundStore();

  const handleComplexAnimation = async () => {
    // 수동으로 복잡한 배경 애니메이션 시퀀스 제어
    setBackgroundColor('#111');
    await delay(1000);
    setBackgroundColor('#222');
    await delay(1000);
    setBackgroundColor('#333');
    await delay(1000);
    resetBackground();
  };

  return (
    <button onClick={handleComplexAnimation}>
      애니메이션 시작
    </button>
  );
}
```

## API 레퍼런스

### `useSetBackground(initialBackground?, options?)`

#### 파라미터

**`initialBackground?: BackgroundConfig`**

- `color?: string` - 배경 색상 (예: `'#1e293b'`, `'rgba(0,0,0,0.8)'`)
- `image?: string` - 배경 이미지 경로 (예: `'/bg-image.png'`)
- `gradient?: string` - 배경 그라디언트 (예: `'linear-gradient(to bottom, #000, #333)'`)
- `className?: string` - Tailwind CSS 클래스 (예: `'bg-black'`, `'bg-gradient-to-b from-slate-900 to-slate-950'`)

우선순위: `image` > `gradient` > `color` (className은 독립적으로 적용)

**`options?: UseSetBackgroundOptions`**

- `cleanup?: boolean` - 언마운트 시 배경 리셋 여부 (기본값: `true`)

#### 반환값

```typescript
{
  setBackgroundColor: (color: string) => void;
  setBackgroundImage: (image: string) => void;
  setBackgroundGradient: (gradient: string) => void;
  setBackgroundClassName: (className: string) => void;
  resetBackground: () => void;
}
```

## 사용 예시

### 1. 배경색 설정

```typescript
function EventPage() {
  useSetBackground({ color: '#1e293b' });
  return <div>이벤트</div>;
}
```

### 2. 배경 이미지 설정

```typescript
function IntroPage() {
  useSetBackground({ image: '/cut-scene-bg.png' });
  return <div>인트로</div>;
}
```

### 3. 그라디언트 배경

```typescript
function MenuPage() {
  useSetBackground({
    gradient: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)'
  });
  return <div>메뉴</div>;
}
```

### 4. Tailwind CSS 클래스 사용

```typescript
function DarkModePage() {
  useSetBackground({
    className: 'bg-black'
  });
  return <div>다크모드</div>;
}
```

### 5. Tailwind 그라디언트 사용

```typescript
function GradientPage() {
  useSetBackground({
    className: 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950'
  });
  return <div>그라디언트 배경</div>;
}
```

### 6. 여러 Tailwind 클래스 조합

```typescript
function ComplexBgPage() {
  useSetBackground({
    className: 'bg-black bg-opacity-80 backdrop-blur-sm'
  });
  return <div>복잡한 배경</div>;
}
```

### 7. cleanup 없이 배경 유지

```typescript
function CharacterSelectPage() {
  // 다음 페이지로 넘어가도 이 배경 유지
  useSetBackground(
    { image: '/char-select-bg.png' },
    { cleanup: false }
  );
  return <div>캐릭터 선택</div>;
}
```

### 8. 조건부 배경 변경

```typescript
function PackingPage({ isDarkMode }: { isDarkMode: boolean }) {
  useSetBackground({
    color: isDarkMode ? '#000' : '#fff'
  });
  return <div>패킹</div>;
}
```

### 9. 초기값 없이 이벤트 핸들러에서만 사용

```typescript
function DialogContent() {
  const { setBackgroundColor, resetBackground } = useSetBackground();

  const handleOpen = () => {
    setBackgroundColor('rgba(0,0,0,0.8)');
  };

  const handleClose = () => {
    resetBackground();
  };

  return (
    <div>
      <button onClick={handleOpen}>다이얼로그 열기</button>
      <button onClick={handleClose}>다이얼로그 닫기</button>
    </div>
  );
}
```

### 10. 명령형 API로 className 변경

```typescript
function ThemeSwitcher() {
  const { setBackgroundClassName } = useSetBackground();

  const handleDarkMode = () => {
    setBackgroundClassName('bg-black');
  };

  const handleLightMode = () => {
    setBackgroundClassName('bg-white');
  };

  const handleGradient = () => {
    setBackgroundClassName('bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900');
  };

  return (
    <div>
      <button onClick={handleDarkMode}>다크 모드</button>
      <button onClick={handleLightMode}>라이트 모드</button>
      <button onClick={handleGradient}>그라디언트</button>
    </div>
  );
}
```

### 11. 애니메이션 시퀀스

```typescript
function CutSceneAnimation() {
  const { setBackgroundImage } = useSetBackground();

  useEffect(() => {
    const playSequence = async () => {
      setBackgroundImage('/intro-1.png');
      await delay(2000);
      setBackgroundImage('/intro-2.png');
      await delay(2000);
      setBackgroundImage('/intro-3.png');
    };

    playSequence();
  }, [setBackgroundImage]);

  return <div>컷씬 재생 중...</div>;
}
```

## 기본 배경

배경을 설정하지 않으면 기본 그라디언트가 적용됩니다:

```css
linear-gradient(180deg, rgba(2,6,23,1) 0%, rgba(15,23,42,1) 50%, rgba(2,6,23,1) 100%)
```

기본 배경을 변경하려면 `GlobalBackground.tsx`의 `DEFAULT_BACKGROUND` 상수를 수정하세요.

## 아키텍처

```
OrientationGuard (회전 가드)
  └─ GlobalBackground (z-0, fixed inset-0)
      └─ FullscreenScroll (1000vh 스크롤 영역)
          └─ UI Container (z-10, aspect-[16/9])
              └─ 페이지 컨텐츠
```

- **GlobalBackground**: `fixed inset-0 z-0`으로 화면 전체를 덮는 배경 레이어
- **UI Container**: `z-10`으로 배경 위에 16:9 비율로 고정된 컨텐츠 영역
- 좌우 여백에도 배경이 보임

## 주의사항

1. **우선순위**: `image` > `gradient` > `color` 순으로 적용됩니다. `className`은 독립적으로 적용됩니다.
2. **className 동작**: `className`은 다른 배경 설정과 함께 사용할 수 있습니다. 예를 들어, `color`와 `className`을 동시에 설정하면 둘 다 적용됩니다.
3. **cleanup**: 기본적으로 컴포넌트 언마운트 시 배경이 리셋됩니다. 유지하려면 `{ cleanup: false }` 설정.
4. **deps**: `initialBackground` 객체가 변경될 때마다 배경이 다시 설정됩니다. 불필요한 재렌더링을 방지하려면 `useMemo`를 사용하세요.

```typescript
// ❌ 나쁜 예: 매 렌더링마다 새 객체 생성
useSetBackground({ color: '#000' });

// ✅ 좋은 예: 객체가 변경되지 않으면 재설정 안 함
const background = useMemo(() => ({ color: '#000' }), []);
useSetBackground(background);

// ✅ 더 좋은 예: 의존성이 명확
const background = useMemo(
  () => ({
    color: isDarkMode ? '#000' : '#fff',
  }),
  [isDarkMode]
);
useSetBackground(background);
```
