// src/features/character-selection/model/useCharacterSelectionStore.ts
// 캐릭터 선택 상태 관리

import { create } from 'zustand';
import type {
  CharacterSet,
  CharacterSelectionState,
  CharacterSelectionActions,
} from './types';

export const useCharacterSelectionStore = create<
  CharacterSelectionState & CharacterSelectionActions
>()((set, get) => ({
  // 초기 상태
  characterSets: [],
  currentIndex: 0,
  selectedCharacterSet: null,

  // 액션들
  setCharacterSets: (characterSets: CharacterSet[]) => {
    set({ characterSets, currentIndex: 0, selectedCharacterSet: null });
  },

  moveToNext: () => {
    const { characterSets, currentIndex } = get();
    const nextIndex =
      currentIndex < characterSets.length - 1 ? currentIndex + 1 : 0;
    set({ currentIndex: nextIndex });
  },

  moveToPrevious: () => {
    const { characterSets, currentIndex } = get();
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : characterSets.length - 1;
    set({ currentIndex: prevIndex });
  },

  selectCharacterSet: (characterSet: CharacterSet) => {
    set({ selectedCharacterSet: characterSet });
  },

  reset: () => {
    set({ characterSets: [], currentIndex: 0, selectedCharacterSet: null });
  },
}));

// 편의 함수들
export const characterSelectionActions = {
  // 현재 캐릭터 세트 가져오기
  getCurrentCharacterSet: () => {
    const { characterSets, currentIndex } =
      useCharacterSelectionStore.getState();
    return characterSets[currentIndex] || null;
  },

  // 선택 완료
  confirmSelection: () => {
    const { characterSets, currentIndex, selectCharacterSet } =
      useCharacterSelectionStore.getState();
    const currentCharacterSet = characterSets[currentIndex];
    if (currentCharacterSet) {
      selectCharacterSet(currentCharacterSet);
    }
  },
};
