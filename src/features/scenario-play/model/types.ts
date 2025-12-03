export type ScenarioEventType =
  | 'Simple'
  | 'StoryChoice'
  | 'ItemChoice'
  | 'Status'
  | 'System';

export type ScenarioStatus =
  | 'IN_PROGRESS'
  | 'DAY_END'
  | 'GAME_END'
  | 'GAME_OVER'
  | 'SUDDEN_DEATH';

export interface ScenarioCharacter {
  characterCode: string;
  position: string | null;
  emotion: string | null;
  isSpeaker: boolean | null;
}

export interface ScenarioChoiceOption {
  choiceOptionId: number;
  text: string;
}

export interface ScenarioChoiceOutcome {
  resultType: string;
  events: ScenarioEvent[];
}

export interface ScenarioChoice {
  title: string;
  description: string;
  thumbnail: string;
  type: 'StoryChoice' | 'ItemChoice';
  options: ScenarioChoiceOption[];
  fallback: {
    choiceOptionId: number;
    text: string;
  };
  outcomes: Record<string, ScenarioChoiceOutcome>;
}

export interface ScenarioEffect {
  characterCode: string | null;
  effectType: string; // 'hp', 'mental' 등
  change: number | null;
  newValue: number | null;
}

export interface ScenarioItemChange {
  itemId: number;
  itemName: string | null;
  quantityChange: number;
  newQuantity: number | null;
}

export interface ScenarioSessionEffect {
  effectType: string;
  change: number;
  newValue: number | null;
}

// 시나리오 이벤트 (하나의 화면에 대응)
export interface ScenarioEvent {
  eventId: number;
  type: ScenarioEventType;
  script?: string;
  characters: ScenarioCharacter[];
  bgImage?: string;
  sceneEffect?: string;
  bgm?: string;
  bgmVolume?: number;
  se?: string;
  seVolume?: number;
  seLoop?: boolean;
  choice?: ScenarioChoice;
  effects?: ScenarioEffect[];
  itemChanges?: ScenarioItemChange[];
  sessionEffects?: ScenarioSessionEffect[];
}

// Day / Act 메타 정보
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

// 선택 제출용 타입 (서버 NextActRequestDto 구조에 맞춤)
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
      hpChange: number;
      mentalChange: number;
    }>;
    sessionStatChanges?: Array<{
      statType: 'LifePoint';
      change: number;
    }>;
  };
}

export interface ScenarioState {
  currentActBundle: ScenarioActBundle | null;
  currentEventIndex: number;
  pendingChoice: {
    optionId: number;
    itemId?: number;
  } | null;
  isLoading: boolean;
  error: Error | null;
}

export interface ScenarioActions {
  loadActBundle: (bundle: ScenarioActBundle) => void;
  nextEvent: () => boolean;
  prevEvent: () => boolean;
  selectChoice: (optionId: number, itemId?: number) => void;
  clearChoice: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

// 편의 타입
export type GetCurrentEvent = (state: ScenarioState) => ScenarioEvent | null;
export type GetRemainingEvents = (state: ScenarioState) => number;
