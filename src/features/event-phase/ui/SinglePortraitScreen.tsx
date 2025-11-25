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

  const renderCharacters = playingCharacters.slice(0, 2);
  const positions =
    renderCharacters.length === 1
      ? (['center'] as const)
      : (['left', 'right'] as const);
  const characterImages = renderCharacters.map(character =>
    getObjectUrl(character?.profileImage || '')
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
  const currentSpeaker = currentPortrait?.speaker?.trim();
  const isSpeaker = (characterName?: string | null) =>
    !!currentSpeaker && !!characterName && currentSpeaker === characterName;

  return (
    <div className='relative h-full w-full'>
      {renderCharacters.map((character, index) => (
        <PortraitCharacterImage
          key={character?.id ?? index}
          src={
            characterImages[index] ||
            (positions[index] === 'right' ? '/ham.png' : '/byungcheol.png')
          }
          alt={character?.name || `character-${index}`}
          dimmed={!isSpeaker(character?.name)}
          position={positions[index]}
        />
      ))}
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
