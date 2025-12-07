import { useEffect, useMemo, useState } from 'react';
import { useAssetStore } from '@shared/preload-assets';
import { useShallow } from 'zustand/react/shallow';
import NoticeBanner from '@shared/ui/NoticeBanner';
import Typography from '@shared/ui/Typography';
import IntroSimpleScreen from '../../ui/IntroSimpleScreen';
import type { IntroEvent } from './types';
import { useSetBackground } from '@shared/background';

interface IntroStoryProps {
  onNext?: () => void;
  jsonPath?: string; // JSON 파일 경로 (기본값: '/JSON/intro_first.json')
}

export default function IntroStory({
  onNext,
  jsonPath = '/JSON/intro_first.json',
}: IntroStoryProps) {
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));
  const [events, setEvents] = useState<IntroEvent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadEvents = async () => {
      try {
        const response = await fetch(jsonPath);
        if (!response.ok) {
          throw new Error(`${jsonPath} fetch failed (${response.status})`);
        }
        const data: IntroEvent[] = await response.json();
        if (isMounted) {
          setEvents(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError('인트로 데이터를 불러오지 못했습니다.');
          setIsLoading(false);
        }
      }
    };

    loadEvents();
    return () => {
      isMounted = false;
    };
  }, [jsonPath]);

  const currentEvent = events[currentIndex];

  const backgroundImage = useMemo(() => {
    if (!currentEvent?.BGImage) return null;
    const asset = getObjectUrl(currentEvent.BGImage);
    return asset || null;
  }, [currentEvent?.BGImage, getObjectUrl]);
  useSetBackground({
    image: backgroundImage || '/shelter-bg.png',
  });

  const handleNext = () => {
    if (isSkipped) return;

    if (currentIndex < events.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (onNext) {
      onNext();
    }
  };

  const handleSkip = () => {
    if (isSkipped) return;
    setIsSkipped(true);
    onNext?.();
  };

  if (isLoading) {
    return (
      <div className='flex h-full w-full items-center justify-center text-white'>
        <Typography variant='dialogue-b'>인트로를 불러오는 중…</Typography>
      </div>
    );
  }

  if (error || !currentEvent) {
    return (
      <div className='flex h-full w-full items-center justify-center text-white'>
        <Typography variant='dialogue-b'>
          {error || '표시할 이벤트가 없습니다.'}
        </Typography>
      </div>
    );
  }

  return (
    <div className='relative flex h-full w-full flex-col' onClick={handleNext}>
      <div className='flex-1'>
        <IntroEventRenderer event={currentEvent} />
      </div>
      {!isSkipped && (
        <button
          onClick={e => {
            e.stopPropagation();
            handleSkip();
          }}
          className='absolute top-6 right-6 rounded-full border border-white/30 bg-black/40 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-white/60 hover:text-white'
        >
          Skip
        </button>
      )}
    </div>
  );
}

function IntroEventRenderer({ event }: { event: IntroEvent }) {
  switch (event.Event) {
    case 'Simple':
      return <IntroSimpleScreen event={event} />;
    case 'System':
      return <SystemMessage event={event} />;
    default:
      return (
        <div className='flex h-full items-center justify-center px-14 text-center'>
          <Typography variant='dialogue-b' className='text-white'>
            지원하지 않는 이벤트 유형입니다: {event.Event}
          </Typography>
        </div>
      );
  }
}

function SystemMessage({ event }: { event: IntroEvent }) {
  const message =
    event.SystemScript || event.Script || '시스템 메시지가 도착했습니다.';

  return (
    <div className='flex h-full items-center justify-center px-6'>
      <NoticeBanner withCaution={false} className='max-w-[1020px]'>
        <Typography variant='dialogue-2' className='text-white'>
          {message}
        </Typography>
      </NoticeBanner>
    </div>
  );
}
