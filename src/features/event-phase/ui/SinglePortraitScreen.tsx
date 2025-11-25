import { useEffect, useState, type MouseEvent } from 'react';
import PortraitBanner from './kit/PortraitBanner';
import { useAssetStore } from '@shared/preload-assets';
import { useShallow } from 'zustand/react/shallow';
import PortraitCharacterImage from './kit/PortraitCharacterImage';
import type { PlayingCharacter } from '@entities/game-session';

const PORTRAIT_START_DELAY = 1000;

interface SinglePortraitScreenProps {
  portraits?: Array<{
    speaker: string;
    text: string;
  }>;
  playingCharacters: PlayingCharacter[];
}

export default function SinglePortraitScreen({
  portraits = [],
  playingCharacters,
}: SinglePortraitScreenProps) {
  const [portraitIndex, setPortraitIndex] = useState(0);
  const [portraitStarted, setPortraitStarted] = useState(false);
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));

  const leftCharacter = playingCharacters[0];
  const rightCharacter = playingCharacters[1];
  const leftCharacterUrl = getObjectUrl(
    leftCharacter?.profileImage || '/byungcheol.png'
  );
  const rightCharacterUrl = getObjectUrl(
    rightCharacter?.profileImage || '/ham.png'
  );

  const handleNextPortrait = (e: MouseEvent<HTMLDivElement>) => {
    const hasMorePortraits =
      portraits.length > 1 && portraitIndex < portraits.length - 1;
    if (!hasMorePortraits) {
      return;
    }
    e.stopPropagation();
    setPortraitIndex(prev => Math.min(prev + 1, portraits.length - 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPortraitStarted(true);
    }, PORTRAIT_START_DELAY);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setPortraitIndex(0);
  }, [portraits]);

  const currentPortrait = portraits[portraitIndex];
  const currentSpeaker = currentPortrait?.speaker;

  return (
    <div className='relative h-full w-full'>
      <PortraitCharacterImage
        src={rightCharacterUrl || '/ham.png'}
        alt={rightCharacter?.name || 'right character'}
        dimmed={
          portraitStarted &&
          !!currentSpeaker &&
          currentSpeaker !== rightCharacter?.name
        }
        position='right'
      />
      <PortraitCharacterImage
        src={leftCharacterUrl || '/byungcheol.png'}
        alt={leftCharacter?.name || 'left character'}
        dimmed={
          portraitStarted &&
          !!currentSpeaker &&
          currentSpeaker !== leftCharacter?.name
        }
        position='left'
      />
      {portraitStarted && currentPortrait && (
        <PortraitBanner
          onClick={handleNextPortrait}
          key={`${portraitIndex}-${currentPortrait.speaker}-${currentPortrait.text}`}
          portrait={currentPortrait.text}
          characterName={currentPortrait.speaker}
        />
      )}
    </div>
  );
}
