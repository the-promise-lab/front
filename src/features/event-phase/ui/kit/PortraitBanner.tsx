import TypingText from '@shared/ui/TypingText';
import { cn } from '@shared/lib/utils';
import type { HTMLAttributes } from 'react';
import { IconDown } from '@shared/ui/icons';
import Typography from '@shared/ui/Typography';

interface PortraitBannerProps extends HTMLAttributes<HTMLDivElement> {
  portrait: string;
  characterName: string;
}
export default function PortraitBanner({
  portrait,
  characterName,
  ...props
}: PortraitBannerProps) {
  return (
    <div
      className={cn(
        'absolute right-0 bottom-20 left-0 flex h-54 w-screen flex-col items-center justify-start gap-4.5 py-9 lg:bottom-30',
        '[background-image:linear-gradient(90deg,_rgba(25,25,32,0.00)_5%,_rgba(25,25,32,0.60)_25%,_rgba(0,0,0,0.80)_50%,_#191920_75.48%,_rgba(25,25,32,0.00)_95%)]'
      )}
      {...props}
    >
      <Typography variant='dialogue-b' className='text-[#FFE674]'>
        {characterName}
      </Typography>
      <Typography variant='dialogue-m'>
        <TypingText texts={portrait.split('\n')} smooth />
      </Typography>

      <div className='flex flex-1 items-end'>
        <IconDown className='h-2.5 w-6.5' />
      </div>
    </div>
  );
}
