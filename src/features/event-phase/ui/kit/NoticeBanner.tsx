import React from 'react';
import { cn } from '@shared/lib/utils';
import CautionNotice from './CautionNotice';

interface NoticeBannerProps {
  children: React.ReactNode;
  withCaution?: boolean;
  className?: string;
}

export default function NoticeBanner({
  children,
  withCaution = false,
  className,
}: NoticeBannerProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50',
        'flex flex-col items-center justify-center gap-6',
        'bg-black/60 backdrop-blur-sm',
        className
      )}
    >
      {withCaution && (
        <div className='w-1/3'>
          <CautionNotice />
        </div>
      )}
      <div
        className={cn(
          'w-full py-12.5 text-white',
          'bg-gradient-to-r from-transparent from-5% via-[#303030] via-50% to-transparent to-95%',
          'animate-in fade-in-0 zoom-in-95 duration-750'
        )}
      >
        <div className='text-center'>{children}</div>
      </div>
    </div>
  );
}
