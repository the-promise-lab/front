import Typography from '@shared/ui/Typography';
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
      <div className='h-5 w-4 shrink-0'>
        <IconLightning className='h-full w-full' />
      </div>
      <Typography variant='subtitle-2-m' className='text-white'>
        {value}
      </Typography>
    </div>
  );
}
