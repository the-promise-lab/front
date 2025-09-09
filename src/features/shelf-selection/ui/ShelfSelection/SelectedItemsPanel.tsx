import { useState } from 'react';
import { cn } from '@shared/lib/utils';
import type { ShelfItem } from '../../model/types';

const MAX_VISIBLE_ITEMS = 10;

interface SelectedItemsPanelProps {
  selectedItems: ShelfItem[];
}

export default function SelectedItemsPanel({
  selectedItems,
}: SelectedItemsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 좌측 하단 토글 버튼 */}
      <button
        className={cn(
          'fixed bottom-4 left-4 z-20 w-12 h-12 bg-white text-gray-700 rounded-lg shadow-lg border border-gray-200',
          'flex items-center justify-center text-sm font-medium transition-colors',
          'hover:bg-gray-50 active:bg-gray-100'
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? '아이템 목록 닫기' : '아이템 목록 열기'}
      >
        {selectedItems.length}
      </button>

      {/* 슬라이딩 패널 */}
      <div
        className={cn(
          'fixed bottom-4 left-1 z-10 bg-white rounded-lg shadow-xl border',
          'h-12 flex items-center transition-all duration-300 ease-out origin-left',
          isOpen
            ? 'w-96 translate-x-16 opacity-100'
            : 'w-12 translate-x-0 opacity-0 scale-x-0'
        )}
      >
        {isOpen && (
          <div className="flex gap-1 p-2 overflow-x-auto">
            {/* 최대 아이템 표시 */}
            {selectedItems.slice(0, MAX_VISIBLE_ITEMS).map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-8 h-8 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-xs font-medium text-gray-700"
                title={`${item.name} (x${item.quantity})`}
              >
                <span className="truncate px-1">{item.name.slice(0, 2)}</span>
              </div>
            ))}

            {/* 최대 표시 개수 초과 시 더보기 표시 */}
            {selectedItems.length > MAX_VISIBLE_ITEMS && (
              <div className="flex-shrink-0 w-8 h-8 bg-gray-200 border border-gray-300 rounded flex items-center justify-center text-xs font-bold text-gray-600">
                +{selectedItems.length - MAX_VISIBLE_ITEMS}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 배경 클릭 시 닫기 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
