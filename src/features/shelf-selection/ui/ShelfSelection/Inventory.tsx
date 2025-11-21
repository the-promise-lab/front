import { InventoryDrawer } from '@entities/inventory';
import { useShelfSelectionStore } from '../../model/useShelfSelectionStore';
import { IconBackpackCircle } from '@shared/ui/icons';
import { useState } from 'react';

export default function Inventory() {
  const { selectedShelfItems } = useShelfSelectionStore();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className='absolute right-11 bottom-11 z-[10] h-36 w-36'
        onClick={() => setIsOpen(true)}
      >
        <IconBackpackCircle className='h-full w-full' />
      </button>
      <InventoryDrawer
        isOpen={isOpen}
        handleClickClose={() => setIsOpen(false)}
        bagImage='/bag.png'
        bagTitle='여행용 백팩'
        bagDescription='가방 설명 블라블라'
        hasWeightBar
        weight={100}
        items={selectedShelfItems.map(item => ({
          id: item.id.toString(),
          name: item.name,
          image: '/chicken-breast.png',
          state: 'default' as const,
        }))}
        handleSlotClick={() => {}}
      />
    </>
  );
}
