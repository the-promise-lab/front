import TypingText, { type TypingTextRef } from '@shared/ui/TypingText';
import { cn } from '@shared/lib/utils';
import { useRef, type HTMLAttributes, type MouseEvent } from 'react';
import { IconDown } from '@shared/ui/icons';
import Typography from '@shared/ui/Typography';
import { BackgroundPortal } from '@shared/background-portal';

interface PortraitBannerProps extends HTMLAttributes<HTMLDivElement> {
  portrait: string;
  characterName: string;
}

export default function PortraitBanner({
  portrait,
  characterName,
  onClick,
  ...props
}: PortraitBannerProps) {
  const typingTextRef = useRef<TypingTextRef>(null);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (typingTextRef.current?.isTyping) {
      typingTextRef.current.skipToEnd();
      return;
    }
    onClick?.(e);
  };

  return (
    <BackgroundPortal>
      <div
        className={cn(
          'absolute right-0 bottom-0 left-0 z-100 flex h-105 w-full flex-col items-center justify-start gap-4.5 pt-10.5 pb-17',
          '[background-image:linear-gradient(180deg,_rgba(1,0,9,0.00)_0%,_rgba(1,0,9,0.60)_58.65%,_rgba(1,0,9,0.80)_100%)]'
        )}
        onClick={handleClick}
        {...props}
      >
        <Typography variant='dialogue-b' className='text-[#FFE674]'>
          {characterName}
        </Typography>
        <Divider />
        <Typography variant='dialogue-m'>
          <TypingText
            key={portrait}
            ref={typingTextRef}
            texts={portrait.split('\n')}
            smooth
            speed={35}
          />
        </Typography>

        <div className='flex flex-1 items-end'>
          <IconDown className='h-2.5 w-6.5' />
        </div>
      </div>
    </BackgroundPortal>
  );
}

const Divider = () => (
  <div className='py-10'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='400'
      height='2'
      viewBox='0 0 1000 2'
      fill='none'
    >
      <path
        d='M0 1C16.6667 1.06667 33.3333 1.13 50 1.19C200 1.73 350 2 500 2C650 2 800 1.73 950 1.19C966.667 1.13 983.333 1.06667 1000 1C983.333 0.933333 966.667 0.87 950 0.81C800 0.27 650 0 500 0C350 0 200 0.27 50 0.81C33.3333 0.87 16.6667 0.933333 0 1Z'
        fill='white'
        fillOpacity='0.4'
      />
    </svg>
  </div>
);
