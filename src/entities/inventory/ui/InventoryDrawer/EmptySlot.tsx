import { cn } from '@shared/lib/utils';

interface EmptySlotProps {
  className?: string;
}

export default function EmptySlot({ className }: EmptySlotProps) {
  return (
    <div
      className={cn(
        'relative aspect-square w-47.5 shrink-0',
        'cursor-pointer truncate',
        className
      )}
    >
      {/* 기본 슬롯 배경 */}
      <div
        className={cn(
          'absolute inset-0',
          'flex flex-col items-center gap-3',
          'rounded-[6px] px-8 py-3 lg:rounded-[12px]',
          {
            'border-[0.5px] border-[#939393] bg-[rgba(18,15,25,0.7)] lg:border': true,
          }
        )}
      ></div>
    </div>
  );
}
