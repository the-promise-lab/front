// src/features/character-selection/model/useCharacterSelectionStore.ts
// 캐릭터 선택 상태 관리

import { create } from 'zustand';
import type {
  Character,
  CharacterSelectionState,
  CharacterSelectionActions,
} from './types';

export const useCharacterSelectionStore = create<
  CharacterSelectionState & CharacterSelectionActions
>()((set, get) => ({
  // 초기 상태
  characters: [],
  currentIndex: 0,
  selectedCharacter: null,

  // 액션들
  setCharacters: (characters: Character[]) => {
    set({ characters, currentIndex: 0, selectedCharacter: null });
  },

  moveToNext: () => {
    const { characters, currentIndex } = get();
    const nextIndex =
      currentIndex < characters.length - 1 ? currentIndex + 1 : 0;
    set({ currentIndex: nextIndex });
  },

  moveToPrevious: () => {
    const { characters, currentIndex } = get();
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : characters.length - 1;
    set({ currentIndex: prevIndex });
  },

  selectCharacter: (character: Character) => {
    set({ selectedCharacter: character });
  },

  reset: () => {
    set({ characters: [], currentIndex: 0, selectedCharacter: null });
  },
}));

// 편의 함수들
export const characterSelectionActions = {
  // 현재 캐릭터 가져오기
  getCurrentCharacter: () => {
    const { characters, currentIndex } = useCharacterSelectionStore.getState();
    return characters[currentIndex] || null;
  },

  // 선택 완료
  confirmSelection: () => {
    const { characters, currentIndex, selectCharacter } =
      useCharacterSelectionStore.getState();
    const currentCharacter = characters[currentIndex];
    if (currentCharacter) {
      selectCharacter(currentCharacter);
    }
  },
};
