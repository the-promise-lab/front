import { cn } from '@shared/lib/utils';
import { IconLightning } from '@shared/ui/icons';

interface MentalityStatProps {
  value: number;
  className?: string;
}

export default function MentalityStat({
  value,
  className,
}: MentalityStatProps) {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      <div className='shrink-0'>
        <IconLightning size={12} />
      </div>
      <p className='font-[NexonLv2Gothic] text-sm leading-none font-medium whitespace-nowrap text-white'>
        {value}
      </p>
    </div>
  );
}
