import { cn } from '@shared/lib/utils';

export function GlassPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn('', className)}
      style={{
        backgroundImage: `url('/report-glass-panel.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'left top',
        backgroundRepeat: 'no-repeat',
      }}
    ></div>
  );
}
