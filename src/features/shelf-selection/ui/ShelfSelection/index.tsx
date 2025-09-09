import { useEffect } from 'react';
import ShelfSelectionCanvas from './ShelfSelectionCanvas';
import SelectedItemsPanel from './SelectedItemsPanel';
import { useShelfSelectionStore } from '../../model/useShelfSelectionStore';
import { mockShelves } from '../../__mocks__';

interface ShelfSelectionProps {
  onBackToMenu: () => void;
}

export default function ShelfSelection({ onBackToMenu }: ShelfSelectionProps) {
  // TODO: onBackToMenu 기능 구현 예정
  void onBackToMenu;
  const {
    getCurrentShelf,
    selectedShelfItems,
    initShelves,
    moveToNextShelf,
    moveToPreviousShelf,
  } = useShelfSelectionStore();

  useEffect(() => {
    initShelves(mockShelves);
  }, [initShelves]);

  const currentShelf = getCurrentShelf();

  if (!currentShelf) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>데이터를 로딩 중...</div>
      </div>
    );
  }
  return (
    <div>
      <div className="fixed top-1/2 left-2 -translate-y-1/2 z-10">
        <button
          className="w-12 h-12 text-sm rounded-full bg-transparent flex items-center justify-center border-gray-300 border"
          onClick={() => moveToPreviousShelf()}
        >
          <PreviousIcon />
        </button>
      </div>

      <div className="fixed top-1/2 right-2 -translate-y-1/2 z-10">
        <button
          className="w-12 h-12 text-sm rounded-full bg-transparent flex items-center justify-center border-gray-300 border"
          onClick={() => moveToNextShelf()}
        >
          <NextIcon />
        </button>
      </div>

      <SelectedItemsPanel selectedItems={selectedShelfItems} />

      <ShelfSelectionCanvas
        backgroundImage={currentShelf.backgroundImage}
        items={currentShelf.shelfItems}
      />
    </div>
  );
}

const PreviousIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const NextIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 6 15 12 9 18" />
  </svg>
);
