import { useEffect } from 'react';
import ShelfSelectionCanvas from '@/components/ShelfSelection/ShelfSelectionCanvas';
import { useShelfSelectionStore } from '@/hooks/store/useShelfSelectionStore';
import { mockShelves } from '@/mocks';

interface ShelfSelectionProps {
  onBackToMenu: () => void;
}

export default function ShelfSelection({ onBackToMenu }: ShelfSelectionProps) {
  const {
    getCurrentShelf,
    selectedShelfItems,
    initShelves,
    setCurrentShelfId,
    shelves,
    currentShelfId,
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
    <div className="h-screen w-screen overflow-hidden bg-gray-100 relative">
      <div className="fixed top-4 left-4 z-10 flex gap-2 items-center">
        {shelves.map((shelf) => (
          <button
            key={shelf.id}
            onClick={() => setCurrentShelfId(shelf.id)}
            className={`px-3 py-1 text-sm rounded text-white ${
              currentShelfId === shelf.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {shelf.name}
          </button>
        ))}

        {/* 메인 메뉴로 돌아가기 버튼 */}
        <button
          onClick={onBackToMenu}
          className="px-3 py-1 text-sm bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 transition-colors rounded shadow-sm hover:shadow-md ml-2"
        >
          메인 메뉴
        </button>
      </div>

      <div className="fixed top-1/2 left-2 -translate-y-1/2 z-10">
        <button
          className="px-3 py-1 text-sm rounded bg-gray-200 text-white"
          onClick={() => moveToPreviousShelf()}
        >
          Previous
        </button>
      </div>

      <div className="fixed top-1/2 right-2 -translate-y-1/2 z-10">
        <button
          className="px-3 py-1 text-sm rounded bg-gray-200 text-white"
          onClick={() => moveToNextShelf()}
        >
          Next
        </button>
      </div>

      <div className="fixed top-4 right-4 z-10 bg-white p-3 rounded shadow max-w-xs text-black">
        <h3 className="font-bold mb-2">
          선택된 아이템들 ({selectedShelfItems.length})
        </h3>
        <div className="text-sm space-y-1 max-h-40 overflow-y-auto">
          {selectedShelfItems.map((item) => (
            <div key={item.id} className="border-b pb-1">
              {item.name} (x {item.quantity}) (ID: {item.id})
            </div>
          ))}
        </div>
      </div>

      <ShelfSelectionCanvas
        backgroundImage={currentShelf.backgroundImage}
        items={currentShelf.shelfItems}
      />
    </div>
  );
}
