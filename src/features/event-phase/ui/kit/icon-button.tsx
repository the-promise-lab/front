import { IconBackpack, IconClose, IconPause } from '@shared/ui/icons';
import { cn } from '@shared/lib/utils';
import type { HTMLAttributes } from 'react';

interface IconButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

function IconButtonBase({
  className,
  onClick,
  disabled = false,
  children,
  ...props
}: IconButtonProps & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'p-2.125 h-22 w-22',
        'flex items-center justify-center',
        'transition-transform duration-200 ease-in-out',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function IconBackpackButton({
  className,
  onClick,
  disabled = false,
}: IconButtonProps) {
  return (
    <IconButtonBase
      onClick={onClick}
      disabled={disabled}
      className={cn(className)}
      aria-label='Backpack'
    >
      <IconBackpack className='h-full w-full' />
    </IconButtonBase>
  );
}

export function IconPauseButton({
  className,
  onClick,
  disabled = false,
}: IconButtonProps) {
  return (
    <IconButtonBase
      onClick={onClick}
      disabled={disabled}
      className={cn(className)}
      aria-label='Pause'
    >
      <IconPause className='h-full w-full' />
    </IconButtonBase>
  );
}

export function IconCloseButton({
  className,
  onClick,
  disabled = false,
}: IconButtonProps) {
  return (
    <IconButtonBase
      onClick={onClick}
      disabled={disabled}
      className={cn(className)}
      aria-label='Close'
    >
      <IconClose className='h-full w-full' />
    </IconButtonBase>
  );
}
