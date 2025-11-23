import { AnimatePresence, motion } from 'framer-motion';
import { BackgroundPortal } from '@shared/background-portal';
import { cn } from '@shared/lib/utils';
import Typography from '@shared/ui/Typography';
import InventorySlot from './InventorySlot';
import WeightGauge from './WeightGauge';
import type { MouseEvent } from 'react';
import type { SlotItem } from '../../model/types';

interface Props {
  isOpen: boolean;
  handleClickClose: (e: MouseEvent<HTMLDivElement>) => void;
  bagImage: string;
  bagTitle: string;
  bagDescription: string;
  hasWeightBar: boolean;
  weight: number;
  items: Array<SlotItem>;
  handleSlotClick: (item: SlotItem) => void;
}

export default function InventoryDrawer({
  isOpen,
  handleClickClose,
  bagImage,
  bagTitle,
  bagDescription,
  hasWeightBar,
  weight,
  items,
  handleSlotClick,
}: Props) {
  return (
    <BackgroundPortal>
      <AnimatePresence>
        {isOpen && (
          <div className='fixed inset-0 z-[90]' onClick={handleClickClose}>
            {/* Drawer 패널 */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={cn(
                'fixed top-0 right-0 z-[91]',
                'h-full w-240 pl-16',

                'border-[0.75px] border-l border-white/10',
                'bg-black/20 shadow-[0_0_42.5px_2px_rgba(0,0,0,0.50)] backdrop-blur-[30px]'
              )}
              onClick={e => e.stopPropagation()}
            >
              {/* 인벤토리 컨텐츠 */}
              <div className='flex max-h-screen w-full flex-col gap-14 pt-15'>
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
                    <div className='flex items-end gap-4.5'>
                      <div className='flex items-center gap-3'>
                        <div className='h-10 w-1.5 bg-white' />
                        <Typography
                          variant='h4-b'
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
                <div className='flex w-full flex-1 flex-wrap gap-5 overflow-y-auto pr-4 pb-4'>
                  {items.map((item, index) => (
                    <InventorySlot
                      key={`${item.id}-${index}`}
                      itemName={item.name}
                      itemImage={item.image}
                      state={item.state as 'default' | 'selected' | 'delete'}
                      onClick={() => handleSlotClick(item)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </BackgroundPortal>
  );
}
