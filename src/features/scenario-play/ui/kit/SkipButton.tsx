import Typography from '@shared/ui/Typography';
import { cn } from '@shared/lib/utils';
import type { HTMLAttributes } from 'react';

interface SkipButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export default function SkipButton({
  className,
  disabled = false,
  ...props
}: SkipButtonProps) {
  return (
    <button
      type='button'
      disabled={disabled}
      className={cn(
        'flex items-center gap-1 transition-opacity',
        'hover:opacity-80 active:opacity-60',
        disabled && 'pointer-events-none opacity-40',
        className
      )}
      {...props}
    >
      <Typography variant='dialogue-b' className='text-yellow-1'>
        Skip
      </Typography>
      <ChevronsRightIcon className='h-10 w-10' />
    </button>
  );
}

function ChevronsRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 40 40'
      fill='none'
      className={className}
    >
      <path
        d='M10 28L18 20L10 12'
        stroke='#FFE674'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M22 28L30 20L22 12'
        stroke='#FFE674'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
