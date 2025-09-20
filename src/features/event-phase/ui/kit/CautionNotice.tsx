import { cn } from '@shared/lib/utils';
import { IconCaution } from '@shared/ui/icons';

interface CautionNoticeProps {
  className?: string;
}

export default function CautionNotice({ className }: CautionNoticeProps) {
  return (
    <div
      className={cn(
        // 중앙 그라디언트 배경 (어두운 빨강 → 투명)
        'bg-gradient-to-r from-transparent via-red-900/60 to-transparent',
        // 레이아웃과 패딩
        'flex items-center justify-center gap-2.5 px-0 py-2.25',
        // 전체 크기 조정
        'h-17 w-full',
        className
      )}
    >
      {/* 경고 아이콘 */}
      <div className='relative shrink-0'>
        <IconCaution size={20} />
      </div>

      {/* CAUTION 텍스트 */}
      <div className='flex flex-col justify-center'>
        <p className='font-[NexonLv2Gothic] text-xl leading-none font-bold whitespace-nowrap text-[#fed046] uppercase'>
          caution
        </p>
      </div>
    </div>
  );
}
