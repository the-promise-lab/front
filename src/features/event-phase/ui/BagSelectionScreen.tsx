import { useState } from 'react';
import { cn } from '@shared/lib/utils';
import Typography from '@shared/ui/Typography';

interface BagOption {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
}

const BAG_OPTIONS: BagOption[] = [
  {
    id: 'travel-backpack',
    title: '| 여행용 백팩',
    subtitle: '가방 설명 블라블라',
  },
  {
    id: 'shopping-bag',
    title: '| 장바구니',
    subtitle: '가방 설명 블라블라',
  },
  {
    id: 'travel-carrier',
    title: '| 여행용 캐리어',
    subtitle: '가방 설명 블라블라',
  },
  {
    id: 'hamburger-bag',
    title: '| 햄버거 가방',
    subtitle: '가방 설명 블라블라',
  },
];

interface BagSelectionScreenProps {
  onComplete?: (selectedBagId: string) => void;
}

export default function BagSelectionScreen({
  onComplete,
}: BagSelectionScreenProps) {
  const [selectedBagId, setSelectedBagId] = useState<string | null>(
    BAG_OPTIONS[0]?.id || null
  );

  const handleBagSelect = (bagId: string) => {
    setSelectedBagId(bagId);
  };

  const handleComplete = () => {
    if (selectedBagId && onComplete) {
      onComplete(selectedBagId);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex flex-col bg-black/80'>
      <div className='flex justify-center'>
        <Typography variant='dialogue-b' className='text-white'>
          물건을 넣을 가방을 골라보자
        </Typography>
      </div>

      {/* 가방 카드 컨테이너 - 가로 스크롤 */}
      <div className='mt-10 flex items-center overflow-x-auto'>
        <div className='flex min-w-full items-center justify-center gap-10'>
          {BAG_OPTIONS.map(bag => (
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
        <button
          onClick={handleComplete}
          disabled={!selectedBagId}
          className={cn(
            'rounded-6 px-10 py-1',
            'text-center text-white',
            'transition-all duration-200',
            'h-20 w-120',
            'rounded-3xl',
            !selectedBagId
              ? 'cursor-not-allowed border-2 border-white bg-gray-800'
              : 'border-bt_glass_stroke border-1 bg-gradient-to-b from-white/80 to-white/40'
          )}
        >
          <Typography variant='dialogue-2'>선택 완료</Typography>
        </button>
      </div>
    </div>
  );
}

function BagCard({
  bag,
  isSelected,
  onClick,
}: {
  bag: BagOption;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col justify-between',
        'h-[200px] w-[150px]',
        'rounded-6',
        'border-[2px]',
        'rounded-md',
        'pt-5 pr-5 pb-5 pl-5',
        'transition-all duration-200',
        'text-left',
        'flex-shrink-0',
        isSelected
          ? 'border-white bg-gradient-to-b from-white/30 via-white/20 to-white/20 shadow-lg shadow-white/50'
          : 'border-white/30 bg-gradient-to-b from-white/10 via-white/5 to-transparent hover:border-white/50'
      )}
    >
      {/* 가방 이미지 영역 */}
      <div className='flex h-60 w-full items-center justify-center'>
        <div className='h-54 w-50 rounded-lg bg-gray-800/50'>
          {/* TODO: 가방 이미지 추가 */}
          <div className='flex h-full w-full items-center justify-center text-white/30'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-16 w-16'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className='flex flex-col gap-2'>
        <Typography
          variant={bag.title.length > 9 ? 'subtitle-2-b' : 'dialogue-b'}
          className={cn(isSelected ? 'text-white' : 'text-white/80')}
        >
          {bag.title}
        </Typography>
        <Typography
          variant='body'
          className={cn(isSelected ? 'text-white/90' : 'text-white/60')}
        >
          {bag.subtitle}
        </Typography>
      </div>
    </button>
  );
}
