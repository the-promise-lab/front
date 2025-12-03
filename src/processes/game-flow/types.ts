import type {
  GameSession,
  PlayingCharacterSet,
  Bag,
  Inventory,
} from '@entities/game-session';

export type GameStep =
  | 'LOGIN' // 로그인 페이지
  | 'LOGIN_PROGRESS' // 로그인 진행 중
  | 'MAIN_MENU' // 메인 메뉴
  | 'PROGRESS' // 게임 준비 진행 중
  | 'INTRO_STORY' // 인트로 스토리 (첫 번째)
  | 'CHARACTER_SELECT' // 캐릭터 선택
  | 'BAG_SELECT' // 가방 선택
  | 'INTRO_STORY_2' // 인트로 스토리 (두 번째)
  | 'PACKING_PHASE' // 가방 싸기
  | 'INTRO_STORY_3' // 인트로 스토리 (세 번째)
  | 'ONBOARDING' // 온보딩 화면
  | 'SCENARIO_FLOW' // 시나리오 플로우
  | 'RESULT_REPORT' // 결과 보고서
  | 'PLAYING'; // 게임 플레이

export interface GameFlowState {
  step: GameStep;
  isAuthenticated: boolean;
  // 게임 세션 관련 상태
  gameSession?: GameSession;
  isNewGame: boolean; // 새 게임인지 이어하기인지 구분
  // 선택된 캐릭터 그룹 이름 (상세 정보 조회용)
  selectedCharacterGroupName?: string;
}

export interface PlayingCharacter {
  id: number;
  characterId: number;
  currentHp: number;
  currentMental: number;
  name: string;
  fullImage: string;
  thumbnailImage: string;
  colors: {
    backgroundColor: string;
    borderColor: string;
  };
}

export interface PlayingCharacters {
  characterSetId: number;
  characterGroupId: number;
  playingCharacters: PlayingCharacter[];
}

export interface GameFlowActions {
  setAuthenticated: (isAuthenticated: boolean) => void;
  goto: (step: GameStep) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
  // 게임 세션 관련 액션
  loadGameSession: (session: GameSession) => void;
  clearGameSession: () => void;
  setIsNewGame: (isNew: boolean) => void;
  savePlayingCharacters: (
    params: PlayingCharacterSet,
    groupName?: string
  ) => void;
  saveBag: (bag: Bag) => void;
  saveInventory: (inventory: Inventory) => void;
  startNewGame: (newGameSession: GameSession) => void;
  startScenarioFlow: () => void;
  continueGame: () => void;
  resetGame: () => void;
}

// 게임 단계 순서 정의
export const GAME_STEP_ORDER: readonly GameStep[] = [
  'LOGIN',
  'LOGIN_PROGRESS',
  'MAIN_MENU',
  'PROGRESS',
  'CHARACTER_SELECT',
  'INTRO_STORY',
  'BAG_SELECT',
  'INTRO_STORY_2',
  'ONBOARDING',
  'PACKING_PHASE',
  'INTRO_STORY_3',
  'SCENARIO_FLOW',
  'RESULT_REPORT',
  'PLAYING',
] as const;

// 초기 상태
export const INITIAL_GAME_FLOW_STATE: GameFlowState = {
  step: 'LOGIN',
  isAuthenticated: false,
  gameSession: undefined,
  isNewGame: true,
  selectedCharacterGroupName: undefined,
};
