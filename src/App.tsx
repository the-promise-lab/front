import { useEffect } from 'react';
import { ShelfSelector } from '@/components/ShelfSelector';
import { useShelfSelectionStore } from '@/hooks/store/useShelfSelectionStore';
import { mockShelves } from '@/mocks';
import './App.css';

function App() {
  const {
    getCurrentShelf,
    selectedShelfItems,
    initShelves,
    setCurrentShelfId,
    shelves,
    currentShelfId,
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
    <div className="App">
      <div className="fixed top-4 left-4 z-10 flex gap-2">
        {shelves.map((shelf) => (
          <button
            key={shelf.id}
            onClick={() => setCurrentShelfId(shelf.id)}
            className={`px-3 py-1 text-sm rounded ${
              currentShelfId === shelf.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {shelf.name}
          </button>
        ))}
      </div>

      <div className="fixed top-4 right-4 z-10 bg-white p-3 rounded shadow max-w-xs">
        <h3 className="font-bold mb-2">
          선택된 아이템들 ({selectedShelfItems.length})
        </h3>
        <div className="text-sm space-y-1 max-h-40 overflow-y-auto">
          {selectedShelfItems.map((item) => (
            <div key={item.id} className="border-b pb-1">
              {item.name} (ID: {item.id})
            </div>
          ))}
        </div>
      </div>

      <ShelfSelector
        backgroundImage={currentShelf.backgroundImage}
        items={currentShelf.shelfItems}
      />
    </div>
  );
}

export default App;
