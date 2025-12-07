import { create } from 'zustand';
import type { Shelf, ShelfItem } from './types';

interface ShelfSelectionStore {
  shelves: Shelf[];
  currentShelfId: number | null;
  selectedShelfItems: ShelfItem[];
  visitedShelfIds: number[];

  setShelves: (shelves: Shelf[]) => void;
  setCurrentShelfId: (shelfId: number | null) => void;
  setSelectedShelfItems: (items: ShelfItem[]) => void;

  initShelves: (shelves: Shelf[]) => void;
  selectNewShelfItem: (item: ShelfItem) => void;
  removeSelectedItem: (itemId: string) => void;
  clearSelectedItems: () => void;
  moveToNextShelf: () => void;
  moveToPreviousShelf: () => void;
  moveToShelf: (storeSectionId: number) => void;
  moveToShelfByCode: (sectionCode: string) => void;

  getCurrentShelf: () => Shelf | null;
  getCurrentShelfCode: () => string | null;
  getNextShelf: () => Shelf | null;
  getPreviousShelf: () => Shelf | null;
  getShelfById: (shelfId: number) => Shelf | null;

  isShelfVisited: (shelfId: number) => boolean;
  getVisitedShelves: () => number[];
  clearVisitedShelves: () => void;
}

export const useShelfSelectionStore = create<ShelfSelectionStore>()(
  (set, get) => ({
    shelves: [],
    currentShelfId: null,
    selectedShelfItems: [],
    visitedShelfIds: [],

    setShelves: shelves => set({ shelves }),
    setCurrentShelfId: shelfId => set({ currentShelfId: shelfId }),
    setSelectedShelfItems: items => set({ selectedShelfItems: items }),

    initShelves: shelves => {
      const initialShelfId = shelves.length > 0 ? shelves[0].id : null;
      set({
        shelves,
        currentShelfId: initialShelfId,
        selectedShelfItems: [],
        visitedShelfIds: initialShelfId !== null ? [initialShelfId] : [],
      });
    },

    selectNewShelfItem: item => {
      const { selectedShelfItems } = get();

      const hasStock = item.quantity > 0;
      if (!hasStock) {
        return;
      }

      const alreadySelectedItem = selectedShelfItems.find(
        selectedItem => selectedItem.id === item.id
      );

      if (alreadySelectedItem) {
        set({
          selectedShelfItems: selectedShelfItems.map(selectedItem =>
            selectedItem.id === item.id
              ? { ...selectedItem, quantity: selectedItem.quantity + 1 }
              : selectedItem
          ),
        });
      } else {
        set({
          selectedShelfItems: [...selectedShelfItems, { ...item, quantity: 1 }],
        });
      }
    },

    removeSelectedItem: itemId => {
      const { selectedShelfItems } = get();
      const targetItem = selectedShelfItems.find(item => item.id === itemId);

      if (!targetItem) return;

      if (targetItem.quantity > 1) {
        set({
          selectedShelfItems: selectedShelfItems.map(item =>
            item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
          ),
        });
      } else {
        set({
          selectedShelfItems: selectedShelfItems.filter(
            item => item.id !== itemId
          ),
        });
      }
    },

    clearSelectedItems: () => {
      set({ selectedShelfItems: [] });
    },

    getCurrentShelf: () => {
      const { shelves, currentShelfId } = get();
      if (!currentShelfId) return null;
      return shelves.find(shelf => shelf.id === currentShelfId) || null;
    },

    getCurrentShelfCode: () => {
      const { shelves, currentShelfId } = get();
      if (!currentShelfId) return null;
      const shelf = shelves.find(shelf => shelf.id === currentShelfId);
      return shelf?.code || null;
    },

    getNextShelf: () => {
      const { shelves, currentShelfId } = get();
      const currentIndex = shelves.findIndex(
        shelf => shelf.id === currentShelfId
      );
      return shelves[(currentIndex + 1) % shelves.length] || null;
    },

    getPreviousShelf: () => {
      const { shelves, currentShelfId } = get();
      const currentIndex = shelves.findIndex(
        shelf => shelf.id === currentShelfId
      );
      return (
        shelves[(currentIndex - 1 + shelves.length) % shelves.length] || null
      );
    },

    getShelfById: shelfId => {
      const { shelves } = get();
      return shelves.find(shelf => shelf.id === shelfId) || null;
    },

    moveToNextShelf: () => {
      const { shelves, currentShelfId, visitedShelfIds } = get();
      const currentIndex = shelves.findIndex(
        shelf => shelf.id === currentShelfId
      );
      const nextIndex = (currentIndex + 1) % shelves.length;
      const nextShelfId = shelves[nextIndex].id;

      set({
        currentShelfId: nextShelfId,
        visitedShelfIds: visitedShelfIds.includes(nextShelfId)
          ? visitedShelfIds
          : [...visitedShelfIds, nextShelfId],
      });
    },

    moveToPreviousShelf: () => {
      const { shelves, currentShelfId, visitedShelfIds } = get();
      const currentIndex = shelves.findIndex(
        shelf => shelf.id === currentShelfId
      );
      const previousIndex =
        (currentIndex - 1 + shelves.length) % shelves.length;
      const previousShelfId = shelves[previousIndex].id;

      set({
        currentShelfId: previousShelfId,
        visitedShelfIds: visitedShelfIds.includes(previousShelfId)
          ? visitedShelfIds
          : [...visitedShelfIds, previousShelfId],
      });
    },

    moveToShelf: storeSectionId => {
      const { shelves, visitedShelfIds } = get();
      const shelf = shelves.find(shelf => shelf.id === storeSectionId);
      if (shelf) {
        set({
          currentShelfId: shelf.id,
          visitedShelfIds: visitedShelfIds.includes(shelf.id)
            ? visitedShelfIds
            : [...visitedShelfIds, shelf.id],
        });
      }
    },

    moveToShelfByCode: sectionCode => {
      const { shelves, visitedShelfIds } = get();
      const shelf = shelves.find(shelf => shelf.code === sectionCode);
      if (shelf) {
        set({
          currentShelfId: shelf.id,
          visitedShelfIds: visitedShelfIds.includes(shelf.id)
            ? visitedShelfIds
            : [...visitedShelfIds, shelf.id],
        });
      }
    },

    isShelfVisited: shelfId => {
      const { visitedShelfIds } = get();
      return visitedShelfIds.includes(shelfId);
    },

    getVisitedShelves: () => {
      return get().visitedShelfIds;
    },

    clearVisitedShelves: () => {
      set({ visitedShelfIds: [] });
    },
  })
);
