import { useState, type MouseEvent } from 'react';
import { cn } from '@shared/lib/utils';
import { IconBackpack } from '@shared/ui/icons';
import Typography from '@shared/ui/Typography';
import InventorySlot from './InventorySlot';
import WeightGauge from './WeightGauge';
import { AnimatePresence, motion } from 'framer-motion';
import { BackgroundPortal } from '@shared/background-portal';

interface SideInventoryProps {
  className?: string;
  hasWeightBar?: boolean;
  weight?: number; // 0-100 사이의 값
  bagImage?: string;
  bagTitle?: string;
  bagDescription?: string;
  items?: Array<{
    id: string;
    name: string;
    image?: string;
    state?: 'default' | 'selected' | 'delete';
  }>;
}

export default function SideInventory({
  className,
  hasWeightBar = true,
  weight = 0,
  bagImage = '/bag.png',
  bagTitle = '여행용 백팩',
  bagDescription = '가방 설명 블라블라',
  items = [],
}: SideInventoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Mock 데이터: 20개 슬롯 (4x5 그리드)
  const mockItems =
    items.length > 0
      ? items
      : Array.from({ length: 20 }, (_, i) => ({
          id: `item-${i}`,
          name: `아이템 ${i + 1}`,
          image: '/bag.png', // Mock 이미지
          state: i === 2 ? 'delete' : i === 3 ? 'selected' : 'default',
        }));

  const handleSlotClick = (itemId: string) => {
    console.log('Slot clicked:', itemId);
    // TODO: 슬롯 클릭 처리 로직
  };

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  };
  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(false);
  };

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

      <BackgroundPortal>
        <AnimatePresence>
          {isOpen && (
            <div className='fixed inset-0 z-[90]' onClick={handleClose}>
              {/* Drawer 패널 */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={cn(
                  'fixed top-0 right-0 z-[91]',
                  'h-full w-1/2 pl-20',

                  'border-[0.75px] border-l border-white/10',
                  'bg-black/20 shadow-[0_0_42.5px_2px_rgba(0,0,0,0.50)] backdrop-blur-[30px]'
                )}
                onClick={e => e.stopPropagation()}
              >
                {/* 인벤토리 컨텐츠 */}
                <div className='flex h-screen w-full flex-col gap-14 pt-15'>
                  {/* 상단: 가방 이미지 및 정보 */}
                  <div className='flex items-end gap-8'>
                    <div className='relative size-40'>
                      {bagImage ? (
                        <img
                          alt={bagTitle}
                          className='pointer-events-none absolute inset-0 size-full max-w-none rounded object-cover'
                          src={bagImage}
                        />
                      ) : (
                        <div className='size-full bg-gray-200/50' />
                      )}
                    </div>

                    {/* 가방 제목 및 설명 */}
                    <div className='flex flex-col gap-4.5 pb-8'>
                      <div className='flex items-end gap-4'>
                        <div className='flex items-center gap-4'>
                          <div className='h-10 w-1.5 bg-white' />
                          <Typography
                            variant='h3-b'
                            className='text-white uppercase'
                          >
                            {bagTitle}
                          </Typography>
                        </div>
                        <Typography variant='body' className='text-white'>
                          {bagDescription}
                        </Typography>
                      </div>

                      {/* 무게 게이지 */}
                      {hasWeightBar && <WeightGauge weight={weight} />}
                    </div>
                  </div>

                  {/* 아이템 그리드 (4x5) */}
                  <div className='grid w-full flex-1 grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-5 overflow-y-auto pr-4 pb-4'>
                    {mockItems.map(item => (
                      <InventorySlot
                        key={item.id}
                        itemName={item.name}
                        itemImage={item.image}
                        state={item.state as 'default' | 'selected' | 'delete'}
                        onClick={() => handleSlotClick(item.id)}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </BackgroundPortal>
    </>
  );
}
