import Typography from '@shared/ui/Typography';
import type { ScenarioEvent } from '../model/types';

interface SimpleEventScreenProps {
  event: ScenarioEvent;
  onComplete?: () => void;
}

/**
 * Simple 타입 이벤트 화면
 * 대사/내레이션을 표시하고, 클릭 시 다음으로 진행
 */
export default function SimpleEventScreen({
  event,
  onComplete,
}: SimpleEventScreenProps) {
  const script = event.script ?? '';
  const bgImage = event.bgImage;
  const speaker = event.characters.find(c => c.isSpeaker);

  const handleClick = () => {
    onComplete?.();
  };

  return (
    <div
      className='relative flex h-full w-full cursor-pointer items-end justify-center pb-20'
      onClick={handleClick}
      style={
        bgImage
          ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }
          : undefined
      }
    >
      {/* 대사 영역 */}
      <div className='w-full max-w-4xl rounded-lg bg-black/60 px-8 py-6 backdrop-blur-sm'>
        {speaker && (
          <Typography variant='subtitle-1-b' className='mb-2 text-amber-400'>
            {speaker.characterCode}
          </Typography>
        )}
        <Typography variant='body' className='whitespace-pre-line text-white'>
          {script}
        </Typography>
      </div>

      {/* 클릭 안내 */}
      <div className='absolute bottom-8 text-white/50'>
        <Typography variant='caption'>클릭하여 계속</Typography>
      </div>
    </div>
  );
}
