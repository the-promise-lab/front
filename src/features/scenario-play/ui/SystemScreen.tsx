import type React from 'react';
import TypingText from '@shared/ui/TypingText';
import NoticeBanner from '@shared/ui/NoticeBanner';
import Typography from '@shared/ui/Typography';
import type { ScenarioEvent } from '../model/types';

interface SystemScreenProps {
  event: ScenarioEvent;
  onComplete?: () => void;
}

export default function SystemScreen({ event, onComplete }: SystemScreenProps) {
  const script = event.script ?? '';
  const texts = script.split('\n').filter(text => text.trim() !== '');

  const handleNext = () => {
    onComplete?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onComplete?.();
    }
  };

  return (
    <div
      className='flex h-full w-full items-center justify-center px-6'
      role='button'
      tabIndex={0}
      onClick={handleNext}
      onKeyDown={handleKeyDown}
    >
      <NoticeBanner withCaution={false} className='max-w-[1020px]'>
        <Typography variant='dialogue-2' className='text-white'>
          <TypingText texts={texts.length > 0 ? texts : [script]} smooth />
        </Typography>
      </NoticeBanner>
    </div>
  );
}
