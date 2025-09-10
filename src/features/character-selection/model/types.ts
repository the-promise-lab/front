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

export interface CharacterSelectionState {
  characters: Character[];
  currentIndex: number;
  selectedCharacter: Character | null;
}

export interface CharacterSelectionActions {
  setCharacters: (characters: Character[]) => void;
  moveToNext: () => void;
  moveToPrevious: () => void;
  selectCharacter: (character: Character) => void;
  reset: () => void;
}
