import { useEffect, useState, type MouseEvent } from 'react';
import PortraitBanner from './PortraitBanner';
import { useAssetStore } from '@shared/preload-assets';
import { useShallow } from 'zustand/react/shallow';
import PortraitCharacterImage from './PortraitCharacterImage';
import type { PortraitCharacter, PortraitData } from '../../model/types';

const PORTRAIT_START_DELAY_MS = 1000;

interface PortraitScreenProps {
  portrait: PortraitData;
  portraitCharacters: PortraitCharacter[];
  onComplete?: () => void;
}

export default function PortraitScreen({
  portrait,
  portraitCharacters,
  onComplete,
}: PortraitScreenProps) {
  const [portraitStarted, setPortraitStarted] = useState(false);
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));

  const renderCharacters = portraitCharacters.slice(0, 2);
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
    }, PORTRAIT_START_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const currentSpeaker = portrait.speaker?.trim();
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
      {portraitStarted && portrait.text && (
        <PortraitBanner
          onClick={handleClick}
          key={`${portrait.speaker}-${portrait.text}`}
          portrait={portrait.text}
          characterName={portrait.speaker}
        />
      )}
    </div>
  );
}

export { PortraitBanner, PortraitCharacterImage };
