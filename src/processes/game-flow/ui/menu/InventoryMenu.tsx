import { useState, type MouseEvent } from 'react';
import { cn } from '@shared/lib/utils';
import { IconBackpack } from '@shared/ui/icons';
import { InventoryDrawer, type SlotItem } from '@entities/inventory';

interface InventoryMenuProps {
  className?: string;
  hasWeightBar?: boolean;
  weight?: number; // 0-100 사이의 값
  bagImage?: string;
  bagTitle?: string;
  bagDescription?: string;
  items?: Array<SlotItem>;
}

export default function InventoryMenu({
  className,
  hasWeightBar = true,
  weight = 0,
  bagImage = '/bag.png',
  bagTitle = '여행용 백팩',
  bagDescription = '가방 설명 블라블라',
  items = [],
}: InventoryMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string | undefined>(
    undefined
  );

  const handleSlotClick = (item: SlotItem) => {
    setActiveItemId(item.id);
  };

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  };
  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const slotItems: SlotItem[] = items.map(item => ({
    ...item,
    state: activeItemId === item.id ? 'selected' : 'default',
  }));

  return (
    <>
      {/* 가방 버튼 */}
      <button
        type='button'
        onClick={handleOpen}
        className={cn(
          'p-2.125 h-22 w-22',
          'flex items-center justify-center',
          'transition-transform duration-200 ease-in-out',
          'hover:scale-105 active:scale-95',
          className
        )}
        aria-label='Backpack'
      >
        <IconBackpack className='h-full w-full' />
      </button>

      {/* Drawer 오버레이 및 패널 */}

      <InventoryDrawer
        isOpen={isOpen}
        handleClickClose={handleClose}
        bagImage={bagImage}
        bagTitle={bagTitle}
        bagDescription={bagDescription}
        hasWeightBar={hasWeightBar}
        weight={weight}
        items={slotItems}
        handleSlotClick={handleSlotClick}
      />
    </>
  );
}
