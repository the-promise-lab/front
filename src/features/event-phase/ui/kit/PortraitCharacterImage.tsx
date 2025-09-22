import { cn } from '@shared/lib/utils';
import { type ImgHTMLAttributes } from 'react';

interface PortraitCharacterImageProps
  extends ImgHTMLAttributes<HTMLImageElement> {
  dimmed?: boolean;
  position: 'left-end' | 'left' | 'center' | 'right' | 'right-end';
}

export default function PortraitCharacterImage({
  dimmed,
  position,
  ...props
}: PortraitCharacterImageProps) {
  return (
    <img
      className={cn(
        'absolute bottom-0 h-[80dvh] -translate-x-1/2',
        'transition-all duration-500 ease-out',
        position === 'left-end' && 'left-[25%]',
        position === 'left' && 'left-[37%]',
        position === 'center' && 'left-1/2',
        position === 'right' && 'left-[62%]',
        position === 'right-end' && 'left-[75%]',
        dimmed ? 'scale-110' : 'scale-100',
        !dimmed && 'brightness-50 grayscale'
      )}
      {...props}
    />
  );
}
