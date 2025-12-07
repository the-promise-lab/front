import { useEffect, useRef, type MouseEvent } from 'react';
import { cn } from '@shared/lib/utils';
import Typography from '@shared/ui/Typography';

interface ItemButtonProps {
  name: string;
  imageUrl?: string;
  disabled?: boolean;
  isPressed: boolean;
  onPress: () => void;
  onProceed?: () => void;
  className?: string;
}

const TIMEOUT_DURATION = 2000;

export default function ItemButton({
  name,
  imageUrl,
  disabled = false,
  isPressed,
  onPress,
  onProceed,
  className,
}: ItemButtonProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (disabled) return;

    onPress();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onProceed?.();
    }, TIMEOUT_DURATION);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'relative h-58.5 w-58.5',
        'flex flex-col items-center justify-center',
        !disabled && !isPressed && 'background-glass',
        isPressed && 'background-glass-pressed',
        disabled && 'background-glass-disabled',
        'rounded-[9.6px] backdrop-blur-[2px] lg:rounded-[24px]',
        'border-1 border-solid',
        'transition-all duration-200 ease-in-out',
        disabled && ['border-[#838383]', 'cursor-not-allowed'],
        !disabled &&
          !isPressed && [
            'border-white',
            'hover:scale-[1.02]',
            'active:scale-[0.98]',
          ],
        isPressed && ['border-white', 'scale-[0.95]'],
        className
      )}
    >
      {imageUrl && (
        <div
          className={cn(
            'absolute top-10 right-[7%] left-[7%]',
            'aspect-[180/160]',
            'bg-cover bg-center bg-no-repeat',
            disabled && 'opacity-60 grayscale'
          )}
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
      )}

      {/* 아이템 이름 */}
      <div
        className={cn(
          'absolute top-6 left-7',
          disabled ? 'text-[#aeaeae]' : 'text-white'
        )}
      >
        <Typography variant='caption'>{name}</Typography>
      </div>
    </button>
  );
}
