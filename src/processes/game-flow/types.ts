// src/processes/game-flow/types.ts
// 게임 플로우 관련 타입 정의

export type GameStep =
  | 'AUTH_CHECK' // 인증 상태 확인
  | 'LOGIN' // 로그인 페이지
  | 'LOGIN_PROGRESS' // 로그인 진행 중
  | 'MAIN_MENU' // 메인 메뉴
  | 'PROGRESS' // 게임 준비 진행 중
  | 'CHARACTER_SELECT' // 캐릭터 선택
  | 'DAY_FLOW' // 시나리오 DAY 플로우
  | 'PLAYING'; // 게임 플레이

// DAY 플로우 내부 단계
export type DayStep =
  | 'PLACE_SCREEN' // 장소 화면
  | 'WARNING_BEFORE_START' // 시작 전 주의사항
  | 'DAY_SCREEN' // DAY 화면
  | 'RANDOM_EVENT_STORY' // 스토리형 랜덤 이벤트
  | 'RANDOM_EVENT_ITEM'; // 아이템형 랜덤 이벤트

export interface GameFlowState {
  step: GameStep;
  isAuthenticated: boolean;
  // 추가 상태들 (필요시 확장)
  selectedCharacter?: string;
  // DAY_FLOW 관련 상태
  dayStep?: DayStep;
  currentDayStepIndex?: number;
}

export interface GameFlowActions {
  setAuthenticated: (isAuthenticated: boolean) => void;
  goto: (step: GameStep) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
  setSelectedCharacter: (character: string) => void;
  // DAY_FLOW 관련 액션
  gotoDayStep: (dayStep: DayStep) => void;
  nextDayStep: () => void;
  backDayStep: () => void;
  resetDayFlow: () => void;
}

// 게임 단계 순서 정의
export const GAME_STEP_ORDER: GameStep[] = [
  'AUTH_CHECK',
  'LOGIN',
  'LOGIN_PROGRESS',
  'MAIN_MENU',
  'PROGRESS',
  'CHARACTER_SELECT',
  'DAY_FLOW',
  'PLAYING',
] as const;

// DAY 플로우 단계 순서 정의
export const DAY_STEP_ORDER: DayStep[] = [
  'PLACE_SCREEN',
  'WARNING_BEFORE_START',
  'DAY_SCREEN',
  'RANDOM_EVENT_STORY',
  'RANDOM_EVENT_ITEM',
] as const;

// 초기 상태
export const INITIAL_GAME_FLOW_STATE: GameFlowState = {
  step: 'AUTH_CHECK',
  isAuthenticated: false,
  selectedCharacter: undefined,
  dayStep: 'PLACE_SCREEN',
  currentDayStepIndex: 0,
};
