import { cn } from '@shared/lib/utils';

interface AvatarProps {
  className?: string;
  name: string;
}

export default function Avatar({ className, name }: AvatarProps) {
  return (
    <div
      className={cn(
        'aspect-square rounded-[80px] bg-white/80 shadow-[0px_0px_14px_0px_rgba(0,0,0,0.3)]',
        // 나중에 배경 이미지 추가될 예정
        `relative h-25 w-25`,
        'bg-cover bg-center bg-no-repeat',
        className
      )}
    >
      <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-nowrap text-white'>
        {name}
      </span>
    </div>
  );
}
