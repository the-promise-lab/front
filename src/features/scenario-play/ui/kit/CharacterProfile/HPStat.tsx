import Typography from '@shared/ui/Typography';
import { cn } from '@shared/lib/utils';
import { IconHeart } from '@shared/ui/icons';

interface HPStatProps {
  value: number;
  className?: string;
}

export default function HPStat({ value, className }: HPStatProps) {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      <div className='h-5 w-5 shrink-0'>
        <IconHeart className='h-full w-full' />
      </div>
      <Typography variant='subtitle-2-m' className='text-white'>
        {value}
      </Typography>
    </div>
  );
}
