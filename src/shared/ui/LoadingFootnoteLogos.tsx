import { cn } from '@shared/lib/utils';

interface LoadingFootnoteLogosProps {
  className?: string;
}

export default function LoadingFootnoteLogos({
  className,
}: LoadingFootnoteLogosProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 bottom-10 flex items-end justify-between px-6',
        className
      )}
    >
      <img
        src='/image/tech-assurance.svg'
        alt='Tech assurance'
        className='h-auto w-170 opacity-80'
      />
      <img
        src='/image/bttf-logo.svg'
        alt='BTTF logo'
        className='h-22 w-auto opacity-90'
      />
    </div>
  );
}
