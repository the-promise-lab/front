import { useState } from 'react';
import { cn } from '@shared/lib/utils';
import Typography from '@shared/ui/Typography';
import GlowButton from '@shared/ui/GlowButton';

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
      {/* 제목 */}
      <div className='mt-20 flex justify-center'>
        <Typography variant='h3-b' className='text-white'>
          물건을 넣을 가방을 골라보자
        </Typography>
      </div>

      {/* 가방 카드 컨테이너 - 가로 스크롤 */}
      <div className='flex flex-1 items-center overflow-x-auto'>
        <div className='flex min-w-full items-center justify-center gap-5 px-5 py-5'>
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
      <div className='mb-20 flex items-center justify-center'>
        <GlowButton
          onClick={handleComplete}
          disabled={!selectedBagId}
          className='px-11 py-7.5'
        >
          <Typography variant='dialogue-m'>선택 완료</Typography>
        </GlowButton>
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
        'h-[484px] w-[367px]',
        'rounded-6',
        'border-[2px]',
        'pt-5 pr-8 pb-10 pl-8',
        'transition-all duration-200',
        'text-left',
        'flex-shrink-0',
        isSelected
          ? 'border-purple-400 bg-gradient-to-b from-purple-500/30 via-purple-600/20 to-purple-700/20 shadow-lg shadow-purple-500/50'
          : 'border-white/30 bg-gradient-to-b from-white/10 via-white/5 to-transparent hover:border-white/50'
      )}
    >
      {/* 가방 이미지 영역 */}
      <div className='flex h-60 w-full items-center justify-center'>
        <div className='h-48 w-48 rounded-lg bg-gray-800/50'>
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
          variant='h3-b'
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
