import { useEffect, useState, type MouseEvent } from 'react';
import PortraitBanner from './kit/PortraitBanner';
import { useAssetStore } from '@shared/preload-assets';
import { useShallow } from 'zustand/react/shallow';
import PortraitCharacterImage from './kit/PortraitCharacterImage';
import type { ScenarioEvent } from '../model/types';
import type { PlayingCharacter } from '@entities/game-session';

const PORTRAIT_START_DELAY = 1000;

interface SimpleEventScreenProps {
  event: ScenarioEvent;
  playingCharacters: PlayingCharacter[];
  onComplete?: () => void;
}

export default function SimpleEventScreen({
  event,
  playingCharacters,
  onComplete,
}: SimpleEventScreenProps) {
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

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onComplete?.();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPortraitStarted(true);
    }, PORTRAIT_START_DELAY);
    return () => clearTimeout(timer);
  }, []);
  console.log(event.characters);
  // ScenarioEvent에서 portrait 데이터 추출
  const speaker = event.characters.find(c => c.isSpeaker);
  const currentPortrait = {
    speaker: speaker?.characterCode ?? '',
    text: event.script ?? '',
  };

  const isSpeaker = (characterName?: string | null) =>
    !!currentPortrait.speaker &&
    !!characterName &&
    currentPortrait.speaker === characterName;

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
      {portraitStarted && currentPortrait.text && (
        <PortraitBanner
          onClick={handleClick}
          key={`${currentPortrait.speaker}-${currentPortrait.text}`}
          portrait={currentPortrait.text}
          characterName={currentPortrait.speaker}
        />
      )}
    </div>
  );
}
