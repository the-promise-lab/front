# UI/UX 및 스타일링 구현 가이드

이 문서는 프로젝트의 독창적인 레이아웃 구조(16:9 고정 비율, 모바일 주소창 제거 등)와 스타일링 시스템(Tailwind 정규화, 타이포그래피)에 대한 구현 상세와 사용법을 다룹니다.

## 1. 레이아웃 아키텍처 (The 16:9 Container)

이 프로젝트는 모바일 웹에서도 앱과 같은 몰입감을 주기 위해 특수한 레이아웃 구조를 가지고 있습니다.

### 설계 의도 (History)

> "디자인은 1920x1080(16:9) 기준으로 나왔지만, 모든 모바일 디바이스에 맞춰 반응형으로 다시 디자인할 시간적 여유가 없었습니다."

이에 대한 차선책으로, 우리는 **중앙 정렬된 16:9 컨테이너**를 두고 모든 컨텐츠를 그 안에 가두는 방식을 선택했습니다. 남는 영역(Letterbox)은 배경이나 그라디언트로 채워 시네마틱한 느낌을 주도록 의도했습니다.

### 구조도

```
OrientationGuard (가로모드 강제/안내)
  └─ ViewportWidthGuard (최소 너비 보장)
      └─ FullscreenScroll (1000vh 스크롤 영역, 주소창 접기 트릭)
          └─ GlobalBackground (z-0, 배경 레이어)
              └─ UI Container (z-10, fixed, aspect-video)
                  └─ 페이지 컨텐츠
```

### 핵심 메커니즘

1.  **주소창 접기 (FullscreenScroll)**
    - **이유**: 모바일 브라우저의 상단 주소창이 게임의 몰입을 방해하기 때문입니다.
    - **구현**: `1000vh` 높이의 보이지 않는 스크롤 영역(`FullscreenScroll`)을 만들어, 사용자가 화면을 밀어 올리면 자연스럽게 주소창이 접히도록 유도했습니다. 실제 컨텐츠는 `fixed`로 고정되어 있어 움직이지 않습니다.
    - 관련 파일: `src/app/layout/RootLayout/FullscreenScroll/`

2.  **16:9 비율 고정 (UI Container)**
    - **이유**: 고해상도 디자인을 왜곡 없이 모든 기기에서 동일한 비율로 보여주기 위함입니다.
    - **구현**: 화면 중앙에 `aspect-video` (16:9) 비율을 유지하는 컨테이너를 배치하고, 컨텐츠는 이 영역을 벗어나지 않도록 했습니다.
    - 관련 파일: `src/app/layout/RootLayout/index.tsx`

---

## 2. 반응형 전략 (The 0.4x Rule)

### 설계 의도 (History)

> "1920px 기준의 픽셀 값을 모바일(가로폭 좁음)에 그대로 적용하면 요소들이 너무 크게 보입니다."

디자인을 모바일용으로 별도 제작할 수 없는 상황에서, 우리는 **"모바일에서는 모든 픽셀을 0.4배로 줄인다"**는 강력한 규칙을 세웠습니다.

### 정규화된 Tailwind 스케일 사용 (필수)

`src/shared/styles/globals.css`에서 Tailwind의 기본 단위(`rem`)를 재정의하여 이 규칙을 시스템 레벨에서 강제했습니다.

- **원리**: `html { --spacing: 0.1rem; }` (PC 기본값 0.25rem의 40% 수준)
- **규칙**: **절대 픽셀값(`w-[100px]`) 사용 금지.** 반드시 Tailwind 정규 클래스(`w-25`)를 사용해야 모바일에서 자동으로 축소됩니다.

> **예시**: `w-10` (40px)
>
> - PC (>=1024px): **40px**로 렌더링
> - 모바일 (<1024px): **16px** (40px \* 0.4)로 렌더링

### EdgeGradient

16:9 영역 좌우에 빈 공간이 생길 때, 양쪽을 어둡게 처리하여 시선을 중앙으로 집중시키고 빈 공간의 어색함을 덜어줍니다.

- 사용법: `<EdgeGradient />`
- 관련 파일: `src/shared/ui/layout/EdgeGradient.tsx`

---

## 3. 타이포그래피 시스템

모든 텍스트는 중앙 관리되는 `Typography` 컴포넌트를 사용해야 합니다.

### 설계 의도 (History)

단순히 폰트 크기만 줄이는 것이 아니라, **0.4배 룰**을 텍스트에도 일관되게 적용하여 디자인 시스템의 통일성을 유지하기 위함입니다.

### 사용법

```tsx
import Typography from '@shared/ui/Typography';

// h1-b 스타일 (PC 70px -> 모바일 28px)
<Typography variant='h1-b'>제목입니다</Typography>;
```

---

## 4. 배경 및 레이어 관리

### 배경 설정

배경은 페이지별로 다르며, `z-0` 레이어(`GlobalBackground`)에서 처리됩니다.
반드시 **`useSetBackground` 훅**을 사용하여 설정해야 합니다. (인라인 스타일 금지)

```tsx
// ✅ 올바른 예
useSetBackground({ color: '#000' });
```

상세 가이드: `docs/BACKGROUND_USAGE.md`

### BackgroundPortal (16:9 탈출하기)

**이유**: 컨텐츠가 16:9 컨테이너(`z-10`, `relative`) 안에 갇혀 있어, `fixed` 포지셔닝을 해도 컨테이너 밖으로 나갈 수 없는 문제가 있었습니다.
**해결**: `createPortal`을 사용하여 16:9 영역 바깥의 `body` 레벨로 컴포넌트를 이동시키는 `BackgroundPortal`을 구현했습니다. (모달, 전체 화면 오버레이용)

---

## 5. 고급 UI 패턴 (Glass & SVG)

### 설계 의도 (History)

> "게임 특유의 화려한 UI(Gradient Border, Inner Shadow, 반투명 효과 등)를 CSS만으로 완벽하게 구현하기엔 한계가 있었습니다."

따라서 복잡한 UI는 **SVG를 배경으로 깔고 그 위에 컨텐츠를 올리는 방식**을 선택했습니다.

### GlassMenuLayout & GlassButton

- **특징**: 반투명한 유리 질감 배경 + 그라디언트 테두리 + 빛나는 효과
- **구현**: SVG 요소를 `absolute inset-0`으로 배치하여 배경 역할을 하게 하고, `z-index`로 컨텐츠를 그 위에 올립니다.
- **주의**: 버튼 크기가 변할 때 SVG 비율이 깨지지 않도록 `viewBox`나 `preserveAspectRatio` 설정에 주의해야 합니다.

### `cn()` 유틸리티 활용

동적 스타일링 시 `clsx`와 `tailwind-merge`가 결합된 `cn()` 함수를 사용하여 클래스 충돌을 방지합니다.
