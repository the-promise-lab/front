import NoticeBanner from '@shared/ui/NoticeBanner';
import Typography from '@shared/ui/Typography';
import type { ScenarioEvent } from '../model/types';

interface SystemScreenProps {
  event: ScenarioEvent;
  onComplete?: () => void;
}

/**
 * System 타입 이벤트 화면
 * 시스템 메시지 (Day 시작, 장소 이동 등)
 */
export default function SystemScreen({ event, onComplete }: SystemScreenProps) {
  const script = event.script ?? '';

  const handleClick = () => {
    onComplete?.();
  };

  return (
    <div className='h-full w-full cursor-pointer' onClick={handleClick}>
      <NoticeBanner>
        <Typography variant='h1-b' className='text-center whitespace-pre-line'>
          {script}
        </Typography>
      </NoticeBanner>
    </div>
  );
}
