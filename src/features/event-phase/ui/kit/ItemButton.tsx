import { cn } from '@shared/lib/utils';
import Typography from '@shared/ui/Typography';

interface ItemButtonProps {
  name: string;
  imageUrl?: string;
  disabled?: boolean;
  pressed?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function ItemButton({
  name,
  imageUrl,
  disabled = false,
  pressed = false,
  onClick,
  className,
}: ItemButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative h-58.5 w-58.5',
        'flex flex-col items-center justify-center',
        !disabled && !pressed && 'background-glass',
        pressed && 'background-glass-pressed',
        disabled && 'background-glass-disabled',
        'rounded-[9.6px] backdrop-blur-[2px] lg:rounded-[24px]',
        'border-1 border-solid',
        'transition-all duration-200 ease-in-out',
        disabled && ['border-[#838383]', 'cursor-not-allowed'],
        !disabled &&
          !pressed && [
            'border-white',
            'hover:scale-[1.02]',
            'active:scale-[0.98]',
          ],
        pressed && ['border-white', 'scale-[0.95]'],
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
