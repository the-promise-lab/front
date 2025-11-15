import Typography from '@shared/ui/Typography';
import type { Bag } from '@entities/game-session';
import { cn } from '@shared/lib/utils';

interface BagCardProps {
  bag: Bag;
  isSelected: boolean;
  onClick: () => void;
}

export default function BagCard({ bag, isSelected, onClick }: BagCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col justify-between',
        'h-125 w-95',
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
          variant={bag.name.length > 9 ? 'subtitle-2-b' : 'dialogue-b'}
          className={cn(isSelected ? 'text-white' : 'text-white/80')}
        >
          {bag.name}
        </Typography>
        <Typography
          variant='body'
          className={cn(isSelected ? 'text-white/90' : 'text-white/60')}
        >
          {bag.description}
        </Typography>
      </div>
    </button>
  );
}
