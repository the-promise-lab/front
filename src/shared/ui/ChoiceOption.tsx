import { useState } from 'react';
import { cn } from '@shared/lib/utils';

interface ChoiceOptionProps {
  text: string;
  onPress?: (isPressed: boolean) => void;
}

export default function ChoiceOption({ text, onPress }: ChoiceOptionProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    const newPressedState = !isPressed;
    setIsPressed(newPressedState);
    onPress?.(newPressedState);
  };

  if (isPressed) {
    return (
      <div
        onClick={handlePress}
        className={cn(
          'relative z-0 flex h-24 w-full cursor-pointer items-center gap-4.5 px-7',
          'rounded-tl-[80px] rounded-bl-[80px]',
          'gradient-border active',
          'bg-gradient-to-r from-white/10 to-transparent'
        )}
      >
        {/* 체크박스 아이콘 */}
        <div className='relative size-10 shrink-0'>
          {/* 외곽 다이아 */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='size-7 rotate-45'>
              <div className='relative size-full border-2 border-amber-400 bg-black/20 bg-radial from-amber-300/60 to-transparent to-70% backdrop-blur-sm' />
            </div>
          </div>
          {/* 내부 체크 */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='size-4.5 rotate-[45deg]'>
              <div className='relative size-full border border-amber-500/80 bg-amber-400 bg-radial from-yellow-200/60 to-transparent to-80%' />
            </div>
          </div>
        </div>

        {/* 텍스트 */}
        <div className='text-2xl leading-none font-bold text-white'>
          <p className='leading-none whitespace-pre'>{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handlePress}
      className={cn(
        'relative z-0 flex h-24 w-full cursor-pointer items-center gap-4.5 px-7',
        'bg-gradient-to-r from-white/10 to-transparent',
        'backdrop-blur-[43.5px]',
        'rounded-tl-[80px] rounded-bl-[80px]',
        'gradient-border'
      )}
    >
      {/* 체크박스 아이콘 */}
      <div className='relative size-10 shrink-0'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='size-7 rotate-45'>
            <div className='relative size-full ring-2 ring-white' />
          </div>
        </div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='size-4.5 rotate-[45deg]'>
            <div className='size-full bg-white' />
          </div>
        </div>
      </div>

      {/* 텍스트 */}
      <div className='text-2xl leading-none font-bold text-white'>
        <p className='leading-none whitespace-pre'>{text}</p>
      </div>
    </div>
  );
}
