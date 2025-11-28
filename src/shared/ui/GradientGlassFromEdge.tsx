import { cn } from '../lib/utils';

interface Props {
  rtl?: boolean;
  className?: string;
}

export function GradientGlassFromEdge({ rtl, className }: Props) {
  return (
    <div
      className={cn(
        'h-full w-[calc(100%+50dvw-50dvh*16/9)] rounded-r-full',
        rtl
          ? 'gradient-border-rtl background-glass-rtl'
          : 'gradient-border background-glass',
        className
      )}
    />
  );
}
