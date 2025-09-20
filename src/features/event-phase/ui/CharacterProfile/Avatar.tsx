import { cn } from '@shared/lib/utils';

interface AvatarProps {
  className?: string;
}

export default function Avatar({ className }: AvatarProps) {
  return (
    <div
      className={cn(
        'aspect-square rounded-[80px] bg-white/80 shadow-[0px_0px_14px_0px_rgba(0,0,0,0.3)]',
        // 나중에 배경 이미지 추가될 예정
        `h-35 w-35`,
        'bg-cover bg-center bg-no-repeat',
        className
      )}
    />
  );
}
