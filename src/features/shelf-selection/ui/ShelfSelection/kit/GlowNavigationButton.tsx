import Typography from '@shared/ui/Typography';
import { IconGlowChevronLeft, IconGlowChevronRight } from './icons';
import { cn } from '@shared/lib/utils';

interface GlowNavigationButtonProps {
  className?: string;
  hidden: boolean;
  onClick: () => void;
  direction: 'left' | 'right';
  displayName: string;
}

export default function GlowNavigationButton({
  className,
  hidden,
  onClick,
  direction,
  displayName,
}: GlowNavigationButtonProps) {
  return (
    <div
      className={cn(
        'absolute top-1/2 z-10 -translate-y-1/2',
        direction === 'right' ? 'right-0' : 'left-0',
        className
      )}
    >
      <button
        className={cn(
          'flex flex-col items-end gap-2.5 bg-black/30 shadow-[0_0_47.8px_31px_rgba(0,0,0,0.3)]',
          {
            hidden: hidden,
            'items-end': direction === 'right',
            'items-start': direction === 'left',
          }
        )}
        onClick={onClick}
      >
        {direction === 'right' ? (
          <IconGlowChevronRight className='h-12 w-12' />
        ) : (
          <IconGlowChevronLeft className='h-12 w-12' />
        )}
        <Typography
          variant='body-b'
          style={{
            textShadow: '0 0 4px var(--color-sky-1, #01ead6)',
          }}
        >
          {displayName}
        </Typography>
      </button>
    </div>
  );
}
