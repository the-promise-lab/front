// src/processes/game-flow/types.ts
// 게임 플로우 관련 타입 정의

export type GameStep =
  | 'AUTH_CHECK' // 인증 상태 확인
  | 'LOGIN' // 로그인 페이지
  | 'LOGIN_PROGRESS' // 로그인 진행 중
  | 'MAIN_MENU' // 메인 메뉴
  | 'PROGRESS' // 게임 준비 진행 중
  | 'CHARACTER_SELECT' // 캐릭터 선택
  | 'PLAYING'; // 게임 플레이

export interface GameFlowState {
  step: GameStep;
  isAuthenticated: boolean;
  // 추가 상태들 (필요시 확장)
  selectedCharacter?: string;
}

export interface GameFlowActions {
  setAuthenticated: (isAuthenticated: boolean) => void;
  goto: (step: GameStep) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
  setSelectedCharacter: (character: string) => void;
}

// 게임 단계 순서 정의
export const GAME_STEP_ORDER: GameStep[] = [
  'AUTH_CHECK',
  'LOGIN',
  'LOGIN_PROGRESS',
  'MAIN_MENU',
  'PROGRESS',
  'CHARACTER_SELECT',
  'PLAYING',
] as const;

// 초기 상태
export const INITIAL_GAME_FLOW_STATE: GameFlowState = {
  step: 'AUTH_CHECK',
  isAuthenticated: false,
  selectedCharacter: undefined,
};
