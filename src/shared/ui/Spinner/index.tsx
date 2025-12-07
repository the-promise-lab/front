import type React from 'react';
import { LoaderIcon } from 'lucide-react';
import { cn } from '@shared/lib/utils';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <LoaderIcon
      role='status'
      aria-label='Loading'
      className={cn('size-16', className)}
      style={{
        color: '#FFB332',
        animation: 'spinner-slow 3.5s linear infinite',
      }}
      {...props}
    />
  );
}

export function SpinnerCustom() {
  return (
    <>
      <div className='flex flex-col items-center gap-2'>
        <Spinner />
        <p className='text-[10px]'>Loading</p>
      </div>
      <style>{`
        @keyframes spinner-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
