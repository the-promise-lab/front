import { InventoryDrawer, type SlotItem } from '@entities/inventory';
import { useShelfSelectionStore } from '../../model/useShelfSelectionStore';
import { IconBackpackCircle } from '@shared/ui/icons';
import { useState } from 'react';
import { cn } from '@shared/lib/utils';
import type { Bag } from '@entities/game-session';
import { useButtonClickSfx } from '@shared/audio';

export default function Inventory({ bag }: { bag: Bag }) {
  const { selectedShelfItems, removeSelectedItem } = useShelfSelectionStore();
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const playPopupClick = useButtonClickSfx({ variant: 'popup' });

  const handleClickOpen = () => {
    playPopupClick();
    setIsOpen(true);
  };

  const currentWieght = selectedShelfItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const bagCapacity = bag.capacity;

  // weight에 따라 색상 결정 (80% 이상이면 빨간색, 아니면 청록색)
  const isOverweight = currentWieght >= bagCapacity * 0.8;
  const progressColor = isOverweight ? '#FF4E59' : '#01EAD6';

  // 원형 프로그레스 바를 위한 SVG 계산
  const radius = 71; // 원의 반지름
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(currentWieght, 0), bagCapacity); // 0~MAX 범위 제한
  const strokeDashoffset =
    circumference - (progress / bagCapacity) * circumference;

  const handleSlotClick = (item: SlotItem) => {
    if (item.state === 'default') {
      setItemToDelete(item.id);
    } else if (item.state === 'delete') {
      setItemToDelete(null);
      // slotId에서 실제 itemId와 인덱스를 추출
      const [itemId] = item.id.split('-');
      removeSelectedItem(itemId);
    }
  };

  const slotItems: SlotItem[] = selectedShelfItems.flatMap(item => {
    const itemId = item.id.toString();
    const quantity = Math.max(1, item.quantity ?? 1);

    return Array.from({ length: quantity }, (_, index) => {
      const slotId = `${itemId}-${index}`;
      const slotState =
        itemToDelete === slotId ? 'delete' : ('default' as const);

      return {
        id: slotId,
        name: item.name,
        image: item.image ?? '/chicken-breast.png',
        state: slotState,
      };
    });
  });

  return (
    <>
      <button
        className='pointer-events-auto absolute right-11 bottom-11 z-10 h-36 w-36'
        onClick={handleClickOpen}
      >
        <div className='relative h-full w-full'>
          {/* 기존 백팩 아이콘 (배경 원 포함) */}
          <IconBackpackCircle className='h-full w-full' />

          {/* 원형 프로그레스 바 (SVG) */}
          <svg className='absolute inset-0 -rotate-90' viewBox='0 0 160 160'>
            <circle
              cx='80'
              cy='80'
              r={radius}
              fill='none'
              stroke={progressColor}
              strokeWidth='11'
              strokeLinecap='round'
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={cn(
                'transition-all duration-300 ease-in-out',
                isOverweight && 'drop-shadow-[0_0_10px_rgba(255,78,89,0.6)]',
                !isOverweight && 'drop-shadow-[0_0_10px_rgba(1,234,214,0.6)]'
              )}
            />
          </svg>
        </div>
      </button>
      <InventoryDrawer
        isOpen={isOpen}
        handleClickClose={() => setIsOpen(false)}
        bagImage={bag.image}
        bagTitle={bag.name}
        bagDescription={`아이템 적재 가능: ${bagCapacity}개`}
        hasWeightBar
        weight={(progress / bagCapacity) * 100}
        items={slotItems}
        handleSlotClick={handleSlotClick}
      />
    </>
  );
}
