import { useEffect, useMemo, useState } from 'react';
import { useAssetStore } from '@shared/model/assetStore';
import { useShallow } from 'zustand/react/shallow';
import NoticeBanner from '@features/event-phase/ui/kit/NoticeBanner';
import Typography from '@shared/ui/Typography';
import IntroSimpleScreen from '../../ui/IntroSimpleScreen';
import type { IntroEvent } from './types';

interface IntroStoryProps {
  onNext?: () => void;
}

export default function IntroStory({ onNext }: IntroStoryProps) {
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));
  const [events, setEvents] = useState<IntroEvent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadEvents = async () => {
      try {
        const response = await fetch('/introAct.json');
        if (!response.ok) {
          throw new Error(`introAct.json fetch failed (${response.status})`);
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
  }, []);

  const currentEvent = events[currentIndex];

  const backgroundImage = useMemo(() => {
    if (!currentEvent?.BGImage) return null;
    const asset = getObjectUrl(currentEvent.BGImage);
    return asset || null;
  }, [currentEvent?.BGImage, getObjectUrl]);

  const handleNext = () => {
    if (!events.length) return;

    if (currentIndex < events.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (onNext) {
      onNext();
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-screen w-screen items-center justify-center bg-black text-white'>
        <Typography variant='dialogue-b'>인트로를 불러오는 중…</Typography>
      </div>
    );
  }

  if (error || !currentEvent) {
    return (
      <div className='flex h-screen w-screen items-center justify-center bg-black text-white'>
        <Typography variant='dialogue-b'>
          {error || '표시할 이벤트가 없습니다.'}
        </Typography>
      </div>
    );
  }

  return (
    <div
      className='relative flex h-screen w-screen flex-col bg-cover bg-center'
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundColor: '#1e293b',
      }}
      onClick={handleNext}
    >
      <div className='flex-1 bg-black/40'>
        <IntroEventRenderer event={currentEvent} />
      </div>
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
      <NoticeBanner withCaution className='max-w-[720px]'>
        <Typography variant='dialogue-2' className='text-white'>
          {message}
        </Typography>
      </NoticeBanner>
    </div>
  );
}
