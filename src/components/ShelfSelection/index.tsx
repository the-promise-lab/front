import { useEffect } from 'react';
import ShelfSelectionCanvas from '@/components/ShelfSelection/ShelfSelectionCanvas';
import SelectedItemsPanel from '@/components/ShelfSelection/SelectedItemsPanel';
import { useShelfSelectionStore } from '@/hooks/store/useShelfSelectionStore';
import { mockShelves } from '@/mocks';

export default function ShelfSelection() {
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
          className="px-3 py-1 text-sm rounded bg-gray-200"
          onClick={() => moveToPreviousShelf()}
        >
          Previous
        </button>
      </div>

      <div className="fixed top-1/2 right-2 -translate-y-1/2 z-10">
        <button
          className="px-3 py-1 text-sm rounded bg-gray-200"
          onClick={() => moveToNextShelf()}
        >
          Next
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
