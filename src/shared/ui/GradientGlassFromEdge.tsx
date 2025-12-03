import { cn } from '../lib/utils';

interface Props {
  rtl?: boolean;
  className?: string;
  isPressed?: boolean;
}

export function GradientGlassFromEdge({ rtl, className, isPressed }: Props) {
  return (
    <div
      className={cn(
        'h-full w-[calc(100%+50dvw-50dvh*16/9)] rounded-r-full transition-all duration-200 ease-in-out',
        rtl
          ? 'gradient-border-rtl background-glass-rtl'
          : 'gradient-border background-glass',
        isPressed && 'active background-glass-pressed scale-[1.05]',
        className
      )}
    />
  );
}
