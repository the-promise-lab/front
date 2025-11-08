// src/features/character-selection/model/types.ts
// 캐릭터 선택 관련 타입 정의

export interface Character {
  id: string;
  name: string;
  image: string;
  description: string;
  characteristics: {
    strength: number;
    intelligence: number;
    agility: number;
    luck: number;
  };
  specialAbility: string;
}

// 캐릭터 세트 (예: 헴과 병철 세트)
export interface CharacterSet {
  id: string;
  name: string;
  characters: Character[];
  description: string;
  specialAbility: string;
  isLocked?: boolean; // 미공개 여부
}

export interface CharacterSelectionState {
  characterSets: CharacterSet[];
  currentIndex: number;
  selectedCharacterSet: CharacterSet | null;
}

export interface CharacterSelectionActions {
  setCharacterSets: (characterSets: CharacterSet[]) => void;
  moveToNext: () => void;
  moveToPrevious: () => void;
  selectCharacterSet: (characterSet: CharacterSet) => void;
  reset: () => void;
}
