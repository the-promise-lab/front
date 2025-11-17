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
    <div
      onClick={onClick}
      className={cn(
        'flex flex-col',
        'h-125 w-95',
        'border-[0.4px] lg:border-[1px]',
        'rounded-[9.6px] lg:rounded-[24px]',
        'px-9',
        'transition-all duration-200',
        'text-left',
        'flex-shrink-0',
        isSelected ? 'background-glass-pressed' : 'background-glass'
        // isSelected
        //   ? 'border-white. bg-gradient-to-b from-white/30 via-white/20 to-white/20 shadow-lg shadow-white/50'
        //   : 'border-white/30 bg-gradient-to-b from-white/10 via-white/5 to-transparent hover:border-white/50'
      )}
    >
      {/* 가방 이미지 영역 */}
      <div className='flex h-72.5 w-full items-center justify-center'>
        <div className='h-full w-65'>
          {/* TODO: 가방 이미지 추가 */}
          <img
            src={'item_bag_hambuger.png'}
            alt='hamburger'
            className='h-full w-full object-cover'
          />
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className='flex flex-col gap-3 whitespace-pre-line'>
        <div className='flex items-center justify-start gap-3'>
          <div className='h-10 w-1.5 shrink-0 bg-white'></div>
          <Typography
            variant={'h3-m'}
            className={cn(isSelected ? 'text-white' : 'text-white/80')}
          >
            {bag.name}
          </Typography>
        </div>
        <Typography variant='mini-dialogue' className='text-white'>
          {`${bag.description}
          아이템 적재 가능: ${bag.capacity}개
          `}
        </Typography>
      </div>
    </div>
  );
}
