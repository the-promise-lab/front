import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Shelf, ShelfItem } from './types';

const STORAGE_KEY = 'shelf-selection-storage';
interface ShelfSelectionStore {
  shelves: Shelf[];
  currentShelfId: number | null;
  selectedShelfItems: ShelfItem[];

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

  getCurrentShelf: () => Shelf | null;
  getNextShelf: () => Shelf | null;
  getPreviousShelf: () => Shelf | null;
  getShelfById: (shelfId: number) => Shelf | null;
}

export const useShelfSelectionStore = create<ShelfSelectionStore>()(
  persist(
    (set, get) => ({
      shelves: [],
      currentShelfId: null,
      selectedShelfItems: [],

      setShelves: shelves => set({ shelves }),
      setCurrentShelfId: shelfId => set({ currentShelfId: shelfId }),
      setSelectedShelfItems: items => set({ selectedShelfItems: items }),

      initShelves: shelves => {
        set({
          shelves,
          currentShelfId: shelves.length > 0 ? shelves[0].id : null,
          selectedShelfItems: [],
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
            selectedShelfItems: [
              ...selectedShelfItems,
              { ...item, quantity: 1 },
            ],
          });
        }
      },

      removeSelectedItem: itemId => {
        const { selectedShelfItems } = get();
        const targetItem = selectedShelfItems.find(item => item.id === itemId);

        if (!targetItem) return;

        if (targetItem.quantity > 1) {
          // 수량이 2개 이상이면 1개 감소
          set({
            selectedShelfItems: selectedShelfItems.map(item =>
              item.id === itemId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          });
        } else {
          // 수량이 1개면 아이템 제거
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
        const { shelves, currentShelfId } = get();
        const currentIndex = shelves.findIndex(
          shelf => shelf.id === currentShelfId
        );
        const nextIndex = (currentIndex + 1) % shelves.length;
        set({ currentShelfId: shelves[nextIndex].id });
      },

      moveToPreviousShelf: () => {
        const { shelves, currentShelfId } = get();
        const currentIndex = shelves.findIndex(
          shelf => shelf.id === currentShelfId
        );
        const previousIndex =
          (currentIndex - 1 + shelves.length) % shelves.length;
        set({ currentShelfId: shelves[previousIndex].id });
      },

      moveToShelf: storeSectionId => {
        const { shelves } = get();
        const shelf = shelves.find(shelf => shelf.id === storeSectionId);
        if (shelf) {
          set({ currentShelfId: shelf.id });
        }
      },
    }),
    {
      name: STORAGE_KEY,
      storage: {
        getItem: name => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: name => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
