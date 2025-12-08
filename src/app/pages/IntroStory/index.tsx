import { useEffect, useMemo, useState } from 'react';
import { useAssetStore } from '@shared/preload-assets';
import { useShallow } from 'zustand/react/shallow';
import NoticeBanner from '@shared/ui/NoticeBanner';
import Typography from '@shared/ui/Typography';
import IntroSimpleScreen from '../../ui/IntroSimpleScreen';
import { useSetBackground } from '@shared/background';
import { useIntroEvents, type IntroEvent } from '@features/intro';
import { SkipButton } from '@features/scenario-play';
import {
  Header,
  PauseMenu,
  playingCharacterSetSelector,
  useGameFlowStore,
} from '@processes/game-flow';

interface IntroStoryProps {
  onNext?: () => void;
  introMode: number;
}

export default function IntroStory({ onNext, introMode }: IntroStoryProps) {
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const playingCharacters =
    useGameFlowStore(playingCharacterSetSelector)?.playingCharacters || [];
  const { data, isPending, isError, error } = useIntroEvents({ introMode });

  const events: IntroEvent[] = data?.events ?? [];

  useEffect(() => {
    setCurrentIndex(0);
    setIsSkipped(false);
  }, [events.length, introMode]);

  const currentEvent = events[currentIndex];

  const backgroundImage = useMemo(() => {
    if (!currentEvent?.BGImage) return null;
    const asset = getObjectUrl(currentEvent.BGImage);
    return asset || currentEvent.BGImage || null;
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

  if (isPending) {
    return (
      <div className='flex h-full w-full items-center justify-center text-white'>
        <Typography variant='dialogue-b'>인트로를 불러오는 중…</Typography>
      </div>
    );
  }

  if (isError || !currentEvent) {
    const errorMessage =
      isError && error instanceof Error
        ? error.message
        : isError
          ? '인트로 데이터를 불러오지 못했습니다.'
          : '표시할 이벤트가 없습니다.';
    return (
      <div className='flex h-full w-full items-center justify-center text-white'>
        <Typography variant='dialogue-b'>{errorMessage}</Typography>
      </div>
    );
  }

  return (
    <div className='relative flex h-full w-full flex-col'>
      <Header
        hasCharacterProfiles
        playingCharacters={playingCharacters}
        menuSlot={<PauseMenu buttonClassName='static' />}
        skipSlot={
          !isSkipped ? (
            <SkipButton
              onClick={e => {
                e.stopPropagation();
                handleSkip();
              }}
            />
          ) : null
        }
      />
      <div className='flex-1'>
        <IntroEventRenderer event={currentEvent} onNext={handleNext} />
      </div>
    </div>
  );
}

function IntroEventRenderer({
  event,
  onNext,
}: {
  event: IntroEvent;
  onNext?: () => void;
}) {
  switch (event.Event) {
    case 'Simple':
      return <IntroSimpleScreen event={event} onComplete={onNext} />;
    case 'System':
      return <SystemMessage event={event} onNext={onNext} />;
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

function SystemMessage({
  event,
  onNext,
}: {
  event: IntroEvent;
  onNext?: () => void;
}) {
  const message =
    event.SystemScript || event.Script || '시스템 메시지가 도착했습니다.';

  return (
    <div
      className='flex h-full items-center justify-center px-6'
      role='button'
      tabIndex={0}
      onClick={() => onNext?.()}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onNext?.();
        }
      }}
    >
      <NoticeBanner withCaution={false} className='max-w-[1020px]'>
        <Typography variant='dialogue-2' className='text-white'>
          {message}
        </Typography>
      </NoticeBanner>
    </div>
  );
}
