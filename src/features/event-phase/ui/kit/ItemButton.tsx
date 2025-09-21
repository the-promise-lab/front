import { cn } from '@shared/lib/utils';

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
        'relative h-50 w-50',
        'flex flex-col items-center justify-center',
        !disabled && !pressed && 'background-glass',
        pressed && 'background-glass-pressed',
        disabled && 'background-glass-disabled',
        'rounded-[13px] backdrop-blur-[2px] lg:rounded-[26px]',
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
          'absolute top-8.5 left-6',
          "font-['NEXON_Lv2_Gothic:Medium',_sans-serif]",
          'text-xs leading-[0] whitespace-nowrap not-italic',
          disabled ? 'text-[#aeaeae]' : 'text-white'
        )}
      >
        {name}
      </div>
    </button>
  );
}
