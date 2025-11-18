import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { cn } from '@shared/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Typography from '@shared/ui/Typography';
import { IconOptionPressedShadow } from '@shared/ui/icons';

interface ChoiceOptionProps {
  text: string;
  onPress?: (isPressed: boolean) => void;
}

const TIMEOUT_DURATION = 2000;

export default function ChoiceOption({ text, onPress }: ChoiceOptionProps) {
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePress = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const newPressedState = !isPressed;
    setIsPressed(newPressedState);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsPressed(false);
    }, TIMEOUT_DURATION);

    onPress?.(newPressedState);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        onClick={handlePress}
        className={cn(
          'relative z-0 flex h-24 w-full cursor-pointer items-center gap-4.5 px-7',
          'bg-gradient-to-r from-white/10 to-transparent',
          'backdrop-blur-[43.5px]',
          'rounded-tl-[56px] rounded-bl-[56px]',
          'gradient-border transition-all duration-200 ease-in-out',
          isPressed && 'active scale-[1.05]'
        )}
      >
        {isPressed && (
          <IconOptionPressedShadow className='absolute top-1/2 -left-4 h-[105%] w-[105%] -translate-y-1/2' />
        )}
        {/* 체크박스 아이콘 */}
        <div className='relative z-[1] size-10 shrink-0'>
          {/* 외곽 다이아 */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className={cn('rotate-45', isPressed ? 'size-7' : 'size-4.5')}>
              <div
                className={cn(
                  'relative size-full backdrop-blur-sm',
                  isPressed
                    ? 'border-2 border-[#FFDB5AB2] bg-black/20 bg-radial from-amber-300/60 to-transparent to-70%'
                    : 'ring-2 ring-white'
                )}
              />
            </div>
          </div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className={cn('rotate-[45deg]', 'size-3')}>
              <div
                className={cn(
                  'size-full',
                  isPressed
                    ? 'border border-[#E8BA15]/80 bg-[#E8BA15] bg-radial from-yellow-200/60 to-transparent to-80%'
                    : 'bg-white'
                )}
              />
            </div>
          </div>
        </div>

        <div className='z-[1] text-sm leading-none font-bold text-white'>
          <Typography variant='subtitle-2-b'>{text}</Typography>
        </div>
      </div>
      <AnimatePresence>
        {' '}
        {isPressed && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'fixed -top-20 left-1/2 z-10 h-40 w-screen -translate-x-1/2',
                '[background-image:linear-gradient(180deg,_#FFE70F_-27.23%,_rgba(5,0,59,0.00)_100%)]'
              )}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'fixed -bottom-20 left-1/2 z-10 h-40 w-screen -translate-x-1/2',
                '[background-image:linear-gradient(0deg,_#FFE70F_-27.23%,_rgba(5,0,59,0.00)_100%)]'
              )}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
