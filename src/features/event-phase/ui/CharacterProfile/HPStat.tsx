import { cn } from '@shared/lib/utils';
import { IconHeart } from '@shared/ui/icons';

interface HPStatProps {
  value: number;
  className?: string;
}

export default function HPStat({ value, className }: HPStatProps) {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      <div className='shrink-0'>
        <IconHeart size={12} />
      </div>
      <p className='font-[NexonLv2Gothic] text-sm leading-none font-medium whitespace-nowrap text-white'>
        {value}
      </p>
    </div>
  );
}
