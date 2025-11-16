import { useState } from 'react';
import { cn } from '@shared/lib/utils';
import Typography from '@shared/ui/Typography';
import {
  useBagItemInfo,
  adaptBagFromApi,
  type Bag,
} from '@entities/game-session';
import { useSetBackground } from '@shared/background';
import BagCard from './BagCard';
import GlassButton from '@shared/ui/GlassButton';

interface BagSelectionProps {
  onComplete?: (selectedBag: Bag) => void;
}

export function BagSelection({ onComplete }: BagSelectionProps) {
  const { data, isLoading, isError } = useBagItemInfo();
  const [selectedBagId, setSelectedBagId] = useState<number | null>(null);

  const bags = data?.bags.map(adaptBagFromApi) || [];
  useSetBackground({
    image: 'shelter-bg.png',
  });

  const handleBagSelect = (bagId: number) => {
    setSelectedBagId(bagId);
  };

  const handleComplete = () => {
    const selectedBag = bags.find(bag => bag.id === selectedBagId);
    if (selectedBag && onComplete) {
      onComplete(selectedBag);
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-full w-full items-center justify-center bg-black/80'>
        <Typography variant='dialogue-b' className='text-white'>
          가방 정보를 불러오는 중...
        </Typography>
      </div>
    );
  }

  if (isError || bags.length === 0) {
    return (
      <div className='flex h-full w-full items-center justify-center bg-black/80'>
        <Typography variant='dialogue-b' className='text-white'>
          가방 정보를 불러올 수 없습니다
        </Typography>
      </div>
    );
  }

  return (
    <div className='flex h-full w-full flex-col justify-center'>
      <div className='flex justify-center'>
        <Typography variant='dialogue-b' className='text-white'>
          물건을 넣을 가방을 골라보자
        </Typography>
      </div>

      {/* 가방 카드 컨테이너 - 가로 스크롤 */}
      <div className='mt-10 flex items-center overflow-x-auto'>
        <div className='flex min-w-full items-center justify-center gap-9'>
          {bags.map(bag => (
            <BagCard
              key={bag.id}
              bag={bag}
              isSelected={selectedBagId === bag.id}
              onClick={() => handleBagSelect(bag.id)}
            />
          ))}
        </div>
      </div>

      {/* 선택 완료 버튼 */}
      <div className='mt-10 flex items-center justify-center'>
        <GlassButton
          onClick={handleComplete}
          disabled={!selectedBagId}
          className={cn('')}
        >
          {/* FIXME: h4-b임  */}
          <Typography variant='h3-b'>선택 완료</Typography>
        </GlassButton>
      </div>
    </div>
  );
}
