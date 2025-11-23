// src/processes/game-flow/types.ts
// 게임 플로우 관련 타입 정의

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
  | 'DAY_FLOW' // 시나리오 DAY 플로우
  | 'EVENT_PHASE' // 이벤트 페이즈
  | 'PLAYING'; // 게임 플레이

// DAY 플로우 내부 단계
export type DayStep =
  | 'PLACE_SCREEN' // 장소 화면
  | 'WARNING_BEFORE_START' // 시작 전 주의사항
  | 'DAY_SCREEN' // DAY 화면
  | 'RANDOM_EVENT_STORY' // 스토리형 랜덤 이벤트
  | 'RANDOM_EVENT_ITEM' // 아이템형 랜덤 이벤트
  | 'CHANGE_STATS_SCREEN' // 스탯 변화 화면
  | 'EVENT_RESULT_SCREEN' // 이벤트 결과 화면
  | 'SINGLE_PORTRAIT_SCREEN' // 단일 초상화 화면
  | 'CUT_SCENE_SCREEN' // 자른 장면 화면
  | 'BAG_SELECTION_SCREEN'; // 가방 선택

// 이벤트 데이터 타입 정의
export interface EventOption {
  text: string;
  value?: string | number; // 스토리 분기를 위한 값
  nextDayStep?: DayStep; // 다음으로 이동할 DAY_STEP
  statChanges?: StatChanges; // 선택 시 스탯 변화
}

export interface StatChanges {
  mentality?: number;
  hp?: number;
  success?: StatChanges;
  fail?: StatChanges;
}

// 캐릭터 정보 타입
export interface Character {
  name: string;
  image: string;
  mentality: number;
  hp: number;
  colors?: {
    backgroundColor: string;
    borderColor: string;
  };
}

export interface EventData {
  id: number;
  title: string;
  descriptions: string[]; // 개행 처리를 위한 배열
  image?: string;
  options?: EventOption[]; // 스토리형 이벤트용
  candidateItems?: string[]; // 아이템형 이벤트용
  changeStatsValue?: StatChanges; // 아이템형 이벤트용
  backgroundImage?: string;
}

export interface DayFlowEvent {
  id: number;
  dayStep: DayStep;
  eventData: EventData;
}

export interface GameFlowState {
  step: GameStep;
  isAuthenticated: boolean;
  // DAY_FLOW 관련 상태
  dayStep?: DayStep;
  currentDayStepIndex?: number;
  currentEventData?: EventData; // 현재 이벤트 데이터
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
  // DAY_FLOW 관련 액션
  gotoDayStep: (dayStep: DayStep) => void;
  nextDayStep: () => void;
  backDayStep: () => void;
  resetDayFlow: () => void;
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
  startDayFlow: () => void;
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
  'PACKING_PHASE',
  'INTRO_STORY_3',
  'DAY_FLOW',
  'EVENT_PHASE',
  'PLAYING',
] as const;

// DAY 플로우 단계 순서 정의
export const DAY_STEP_ORDER: readonly DayStep[] = [
  'PLACE_SCREEN',
  'WARNING_BEFORE_START',
  'DAY_SCREEN',
  // TODO: RANDOM_EVENT 으로 통합 필요 (서버에서 전달되는 JSON 내부 값을 통한 STORY, ITEM 분기처리)
  // 'RANDOM_EVENT',
  'RANDOM_EVENT_STORY',
  'RANDOM_EVENT_ITEM',
  'CHANGE_STATS_SCREEN',
  'SINGLE_PORTRAIT_SCREEN',
  'CUT_SCENE_SCREEN',
  'EVENT_RESULT_SCREEN',
] as const;

// 초기 상태
export const INITIAL_GAME_FLOW_STATE: GameFlowState = {
  step: 'LOGIN',
  isAuthenticated: false,
  dayStep: 'PLACE_SCREEN',
  currentDayStepIndex: 0,
  gameSession: undefined,
  isNewGame: true,
  selectedCharacterGroupName: undefined,
};
