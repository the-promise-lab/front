# FSD based 5 Layered 헌법 (필수 조항)

## 1) 의존 방향(단방향)

```
app  →  processes  →  features  →  entities  →  shared
                                   ↘ api (codegen)
```

- 역방향 금지. 같은 레벨끼리 직접 의존 금지.
- **shared**는 어떤 상위도 import하지 않는다.
- **entities**는 순수 도메인 모델만 다루며, 상위 레이어(features/processes/app)를 참조할 수 없다.
- **features**는 **services**만 통해 네트워크/스토리지 접근(직접 api 호출 금지 — 엄격 모드).

## 2) shared는 “도메인 무취”

- 디자인 시스템 래퍼와 범용 컴포넌트(`shared/ui`), 범용 훅/유틸(`shared/hooks|lib`), 환경설정(`config/`)만.
- 앱 고유 정책/흐름/명칭/타입이 **드러나는 순간** shared에서 하향 이동(→ features/processes).
- 예외적으로, **인증/인가**(auth)와 같이 범용 인프라는 shared로 격상한 바 있다.

## 3) app은 “조립만”

- `app/layout`, `app/providers`, `app/pages`(or screens)에서 **오케스트레이션·배치만** 하고 **비즈니스 로직 금지**.
- 상태 주입/라우팅/전역 가드(Orientation 등)만 허용.

## 4) processes는 “횡단 오케스트레이션”

- 라우터 없이도 필요한 **전역 플로우(온보딩/게임 진행 등)**는 `processes/*`로.
- 프로세스 상태는 여기서 관리(예: `processes/game-flow/model/useGameFlowStore.ts`).
- 커지면 FSM(XState) 등으로 승격 가능.

## 5) entities는 "핵심 도메인 엔티티"

- 프로젝트 전반에서 공유되는 **핵심 비즈니스 도메인 개념**(GameSession, User, Character 등)을 담는다.
- 구조: `entities/<entity>/{model, lib, api}`
- **순수 도메인 로직과 타입 정의**에 집중. UI 컴포넌트는 포함하지 않는 것을 권장.
- features와 processes에서 공통으로 사용하는 도메인 모델이 여기 위치.
- 여러 feature에서 중복되는 도메인 개념이 3회 이상 반복될 때 entities로 승격 고려.

## 6) features는 "사용자 시나리오 단위의 응집"

- 구조: `features/<feat>/{ui, model, lib, mocks}`
- **공개 표면**만 `index.ts`로 배럴 export. 내부 구조는 외부에서 직접 접근 금지.
- feature 내부 유틸/훅은 **공용처럼 보여도** 우선 여기에 둔다(진짜 범용이면 entities 또는 shared로 승격).
- entities의 도메인 모델을 가져다가 특정 사용자 시나리오에 맞게 활용.

## 7) services와 api의 분리

- `src/api/` = **openapi-typescript-codegen 생성물(편집 금지)**
- `src/services/` = **우리가 만든 어댑터/래퍼**(토큰주입, 에러표준화, 리트라이/캐싱, 로깅).
- features는 services만 의존(엄격 모드).

## 8) 네이밍/코로케이션 규약

- 폴더: kebab-case / 컴포넌트: PascalCase / 훅·유틸: camelCase.
- 테스트/스토리/스타일은 **같은 폴더에 코로케이션**.
- 루트에 **barrel** 두어 외부 노출 최소화(`index.ts`).

## 9) 환경/설정의 경계

- `src/config/`에 환경 래퍼(`env.ts`), 전역 상수/플래그, API 기본설정.
- 어디서나 읽을 수 있지만 **쓰기/부작용은 금지**(쓰기/사이드이펙트는 services에서).

## 10) Mock/테스트 자산의 위치

- 기능 전용 mock: `features/<feat>/mocks/*`(co-location).
- 여러 곳에서 쓰는 공통 테스트 인프라: `src/test/*` (MSW server, 공통 factories, RTL render 등).
- 런타임 데모용 정적 JSON은 `public/mocks/*`.

## 11) 변경의 신호와 승격/분리 기준

- 도메인 모델이 여러 feature에서 3회 이상 중복 → `entities/`로 승격.
- 어떤 유틸이 3개 이상 feature에서 중복되고 도메인 무관 → `shared/`로 승격.
- entities에 UI 로직이 섞이기 시작 → 해당 feature로 **하향 이동**.
- shared가 도메인 냄새 나기 시작 → 해당 entities/feature/process로 **하향 이동**.

---

# 권고 조항(운영 노하우)

### A. ESLint로 강제

- `eslint-plugin-boundaries`로 **단방향 의존**과 **테스트/목 예외**를 강제.

### B. 공개면(Stable API) 관리

- 각 feature는 **외부에 약속된 것만** `index.ts`로 export.
- 외부에 드러난 타입/함수는 **semver 마인드**로 변경(브레이킹 시 마이그레이션 가이드).

### C. 상태 범위 스코핑

- 전역 상태는 **processes**에서만(필요 최소한).
- feature 내부 상태는 feature에 격리.
- 전역 store에 feature 비즈니스 로직 섞지 않기.

### D. 서비스 단일화

- 인증/에러/로깅/리트라이/백오프/캐싱(React Query·Zustand persist)은 **services**에서 한 번에.
- 이렇게 하면 모든 feature가 공짜로 혜택을 받음.

### E. 경로 별칭

- `@app/*`, `@processes/*`, `@features/*`, `@entities/*`, `@shared/*`, `@api/*`, `@config/*`
- 깊은 상대경로 금지.

---

# 짧은 폴더 예시

```
src/
  app/
    App.tsx
    layout/
      RootLayout/
        index.tsx
        OrientationGuard/
          index.tsx
    pages/
      LandingPage/
        index.tsx
      MainMenu/
        index.tsx

  processes/
    game-flow/

  features/
    shelf-selection/
      ui/
        ShelfSelection/
      model/
        types.ts
        useShelfSelectionStore.ts
      __mocks__/
      index.ts

  entities/                   # 핵심 도메인 엔티티
    game-session/
      model/
        types.ts
        adapters.ts
        useGameSession.ts
      index.ts

  api/                        # codegen 산출물 (편집 금지)
    services/
      AppService.ts
      AuthService.ts

  shared/
    ui/
      Button.tsx
      ...
    lib/
      utils.ts
      ...
    styles/
      globals.css
      ...
    assets/
    auth/                     # (격상된 인증, 범용 인프라로 취급)
      model/
        useAuthStore.ts
        types.ts
      index.ts

  config/
    env.ts
```
