import { useEffect, useState, type MouseEvent } from 'react';
import PortraitBanner from './PortraitBanner';
import { useAssetStore } from '@shared/preload-assets';
import { useShallow } from 'zustand/react/shallow';
import PortraitCharacterImage from './PortraitCharacterImage';
import type { PortraitCharacter, PortraitData } from '../../model/types';
import { AnimatePresence } from 'framer-motion';

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
  const fallbackPositions =
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
      <AnimatePresence>
        {renderCharacters.map((character, index) => {
          const position = character.position ?? fallbackPositions[index];
          return (
            <PortraitCharacterImage
              key={character?.id ?? index}
              src={
                characterImages[index] ||
                (position === 'right' ? '/ham.png' : '/byungcheol.png')
              }
              alt={character?.name || `character-${index}`}
              dimmed={!isSpeaker(character?.name)}
              position={position}
            />
          );
        })}
        {portraitStarted && portrait.text && (
          <PortraitBanner
            onClick={handleClick}
            portrait={portrait.text}
            characterName={portrait.speaker}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export { PortraitBanner, PortraitCharacterImage };
