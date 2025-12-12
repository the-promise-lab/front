import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
} from 'react';
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

  const renderCharacters = useMemo(
    () => portraitCharacters.slice(0, 2),
    [portraitCharacters]
  );
  const fallbackPositions = useMemo(
    () =>
      renderCharacters.length === 1
        ? (['center'] as const)
        : (['left', 'right'] as const),
    [renderCharacters]
  );
  const characterImages = useMemo(
    () =>
      renderCharacters.map(character =>
        getObjectUrl(character?.profileImage || '')
      ),
    [renderCharacters, getObjectUrl]
  );

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onComplete?.();
    },
    [onComplete]
  );

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
      {/* 각 캐릭터마다 개별 AnimatePresence */}
      {renderCharacters.map((character, index) => {
        const position = character.position ?? fallbackPositions[index];
        const characterKey =
          character?.id ?? `${position}-${character?.name ?? index}`;

        return (
          <AnimatePresence key={`presence-${position}`}>
            <PortraitCharacterImage
              key={characterKey}
              src={
                characterImages[index] ||
                (position === 'right' ? '/ham.png' : '/byungcheol.png')
              }
              alt={character?.name || `character-${index}`}
              dimmed={!isSpeaker(character?.name)}
              position={position}
            />
          </AnimatePresence>
        );
      })}

      {/* Banner는 별도 AnimatePresence */}
      <AnimatePresence>
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
