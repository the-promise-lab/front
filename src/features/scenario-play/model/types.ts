/**
 * scenario-play 도메인 타입 정의
 *
 * 서버 DTO(SessionEventDto, NextActResponseDto 등)와 1:1 또는 변환 관계를 가지며,
 * 프론트엔드에서 사용하기 편한 형태로 정의합니다.
 */

// ============================================================================
// 시나리오 이벤트 타입 (서버 SessionEventDto.type과 1:1 매핑)
// ============================================================================

export type ScenarioEventType =
  | 'Simple'
  | 'StoryChoice'
  | 'ItemChoice'
  | 'Status'
  | 'System';

// ============================================================================
// 시나리오 상태 (서버 NextActResponseDto.status와 1:1 매핑)
// ============================================================================

export type ScenarioStatus =
  | 'IN_PROGRESS'
  | 'DAY_END'
  | 'GAME_END'
  | 'GAME_OVER'
  | 'SUDDEN_DEATH';

// ============================================================================
// 하위 도메인 타입들
// ============================================================================

/** 이벤트 내 캐릭터 정보 */
export interface ScenarioCharacter {
  characterCode: string;
  position: string | null;
  emotion: string | null;
  isSpeaker: boolean | null;
}

/** 선택지 옵션 */
export interface ScenarioChoiceOption {
  id: number;
  text: string;
  // 아이템 선택지의 경우 아이템 정보
  itemId?: number;
  itemName?: string;
}

/** 선택지 정보 (StoryChoice, ItemChoice 이벤트용) */
export interface ScenarioChoice {
  options: ScenarioChoiceOption[];
}

/** 캐릭터 스탯 변화 */
export interface ScenarioEffect {
  characterCode: string | null;
  effectType: string; // 'hp', 'mental' 등
  change: number | null;
  newValue: number | null;
}

/** 아이템 변화 */
export interface ScenarioItemChange {
  itemId: number;
  itemName: string | null;
  quantityChange: number;
  newQuantity: number | null;
}

/** 세션 스탯 변화 */
export interface ScenarioSessionEffect {
  effectType: string;
  change: number;
  newValue: number | null;
}

// ============================================================================
// 시나리오 이벤트 (하나의 화면에 대응)
// ============================================================================

export interface ScenarioEvent {
  eventId: number;
  type: ScenarioEventType;
  /** 대사/내레이션 */
  script?: string;
  /** 등장 캐릭터 목록 */
  characters: ScenarioCharacter[];
  /** 배경 이미지 */
  bgImage?: string;
  /** 장면 효과 */
  sceneEffect?: string;
  /** 배경음 */
  bgm?: string;
  bgmVolume?: number;
  /** 효과음 */
  se?: string;
  seVolume?: number;
  seLoop?: boolean;
  /** 선택지 (StoryChoice, ItemChoice 타입에서 사용) */
  choice?: ScenarioChoice;
  /** 캐릭터 스탯 변화 (Status 타입에서 사용) */
  effects?: ScenarioEffect[];
  /** 아이템 변화 */
  itemChanges?: ScenarioItemChange[];
  /** 세션 스탯 변화 */
  sessionEffects?: ScenarioSessionEffect[];
}

// ============================================================================
// Day / Act 메타 정보
// ============================================================================

export interface ScenarioDayMeta {
  id: number;
  number: number;
}

export interface ScenarioActMeta {
  id: number;
  sequenceNumber: number;
  title: string | null;
}

export interface ScenarioEnding {
  endingId: number;
  endingIndex: number;
  title: string;
  endingImage: string | null;
}

// ============================================================================
// Act 번들 (하나의 Act 응답 전체)
// ============================================================================

export interface ScenarioActBundle {
  sessionId: string;
  status: ScenarioStatus;
  day: ScenarioDayMeta | null;
  act: ScenarioActMeta | null;
  events: ScenarioEvent[];
  ending: ScenarioEnding | null;
}

// ============================================================================
// 선택 제출용 타입
// ============================================================================

export interface SubmitChoiceParams {
  lastActId: number;
  choice: {
    optionId: number;
    itemId?: number;
  };
  updates?: {
    itemChanges?: Array<{
      itemId: number;
      quantityChange: number;
    }>;
    characterStatusChanges?: Array<{
      characterCode: string;
      effectType: string;
      change: number;
    }>;
    sessionStatChanges?: Array<{
      effectType: string;
      change: number;
    }>;
  };
}

// ============================================================================
// 스토어 상태 타입
// ============================================================================

export interface ScenarioState {
  /** 현재 Act 번들 */
  currentActBundle: ScenarioActBundle | null;
  /** 현재 표시 중인 이벤트 인덱스 */
  currentEventIndex: number;
  /** 선택 대기 중인 선택지 (제출 전까지 보관) */
  pendingChoice: {
    optionId: number;
    itemId?: number;
  } | null;
  /** 로딩 상태 */
  isLoading: boolean;
  /** 에러 상태 */
  error: Error | null;
}

export interface ScenarioActions {
  /** Act 번들 로드 */
  loadActBundle: (bundle: ScenarioActBundle) => void;
  /** 다음 이벤트로 이동 (마지막이면 false 반환) */
  nextEvent: () => boolean;
  /** 이전 이벤트로 이동 (첫 번째면 false 반환) */
  prevEvent: () => boolean;
  /** 선택지 선택 (아직 제출 전) */
  selectChoice: (optionId: number, itemId?: number) => void;
  /** 선택 취소 */
  clearChoice: () => void;
  /** 로딩 상태 설정 */
  setLoading: (isLoading: boolean) => void;
  /** 에러 설정 */
  setError: (error: Error | null) => void;
  /** 상태 초기화 */
  reset: () => void;
}

// ============================================================================
// 편의 타입
// ============================================================================

/** 현재 이벤트 가져오기 헬퍼 */
export type GetCurrentEvent = (state: ScenarioState) => ScenarioEvent | null;

/** 남은 이벤트 수 가져오기 헬퍼 */
export type GetRemainingEvents = (state: ScenarioState) => number;
