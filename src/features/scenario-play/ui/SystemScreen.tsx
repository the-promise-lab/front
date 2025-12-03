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
  // script를 줄바꿈으로 분리하여 TypingText에 전달
  const texts = script.split('\n').filter(text => text.trim() !== '');

  const handleClick = () => {
    onComplete?.();
  };

  return (
    <div className='h-full w-full cursor-pointer' onClick={handleClick}>
      <NoticeBanner withCaution>
        <Typography variant='dialogue-2'>
          <TypingText texts={texts.length > 0 ? texts : [script]} smooth />
        </Typography>
      </NoticeBanner>
    </div>
  );
}
