import { useState, type MouseEvent } from 'react';
import { IconDiamond } from '@shared/ui/icons';
import Typography from '@shared/ui/Typography';
import { InventoryDrawer, type SlotItem } from '@entities/inventory';

interface SurvivalBagSectionProps {
  ownerNames: string;
  bagType: string;
  usability: string;
  itemUsageRate: string;
  // TODO: 실제 API에서 받아올 인벤토리 데이터
  bagImage?: string;
  items?: SlotItem[];
}

export default function SurvivalBagSection({
  ownerNames,
  bagType,
  usability,
  itemUsageRate,
  bagImage = '/bag.png',
  items = [],
}: SurvivalBagSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  // 결과 보고서용이므로 읽기 전용 - 클릭 시 로그만 출력
  const handleSlotClick = (item: SlotItem) => {
    console.log('Slot viewed:', item);
  };

  return (
    <div className='flex justify-center gap-8'>
      {/* 가방 이미지 placeholder */}
      <div className='h-95 w-85 shrink-0 bg-gray-500/30' />

      {/* 우측 정보 영역 */}
      <div className='flex flex-col justify-center gap-8'>
        {/* 타이틀 */}
        <div className='flex items-center gap-4.75'>
          <div className='flex items-center gap-3.5'>
            <div className='h-9.5 w-0 border-l-[3px] border-white' />
            <Typography variant='dialogue-m' className='text-white'>
              {ownerNames}의 생존 가방
            </Typography>
          </div>
          <Typography variant='dialogue-m' className='text-[#FFB332]'>
            {bagType}
          </Typography>
        </div>

        {/* 활용도 & 아이템 사용률 */}
        <div className='flex items-center gap-7'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-3'>
              <IconDiamond className='size-8' />
              <Typography variant='body-b' className='text-white'>
                활용도
              </Typography>
            </div>
            <Typography variant='body-b' className='text-[#FFB332]'>
              {usability}
            </Typography>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-3'>
              <IconDiamond className='size-8' />
              <Typography variant='body-b' className='text-white'>
                아이템 사용률
              </Typography>
            </div>
            <Typography variant='body-b' className='text-[#FFB332]'>
              {itemUsageRate}
            </Typography>
          </div>
        </div>

        {/* 버튼 */}
        <button
          type='button'
          onClick={handleOpen}
          className='flex items-center justify-center rounded-xs border-[0.8px] border-white/35 p-2.5 lg:border-2'
        >
          <span className='flex h-20 w-130 items-center justify-center rounded-xs border-[0.8px] border-white bg-white/35 lg:border-2'>
            <Typography variant='body-b' className='text-white'>
              생존가방 살펴보기
            </Typography>
          </span>
        </button>
      </div>

      {/* InventoryDrawer */}
      <InventoryDrawer
        isOpen={isOpen}
        handleClickClose={handleClose}
        bagImage={bagImage}
        bagTitle={bagType}
        bagDescription={`${ownerNames}의 생존 가방`}
        hasWeightBar={false}
        weight={0}
        items={items}
        handleSlotClick={handleSlotClick}
      />
    </div>
  );
}
