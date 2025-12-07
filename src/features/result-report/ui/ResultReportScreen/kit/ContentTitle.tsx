import { cn } from '@shared/lib/utils';
import Typography from '@shared/ui/Typography';

interface ContentTitleProps {
  title: string;
  className?: string;
}

export function ContentTitle({ title, className }: ContentTitleProps) {
  return (
    <div className={cn('inline-flex h-13.25 items-center gap-3', className)}>
      <div className='h-11.75 w-2 bg-white' />
      <Typography variant='title' className='leading-normal text-white'>
        {title}
      </Typography>
    </div>
  );
}
