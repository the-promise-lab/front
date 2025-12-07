import { cn } from '@shared/lib/utils';
import CharacterProfile from '@features/scenario-play/ui/kit/CharacterProfile';
import BubblePortrait from '@features/scenario-play/ui/kit/CharacterProfile/BubblePortrait';
import type { PlayingCharacter } from '@entities/game-session';
import type { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

interface HeaderProps {
  playingCharacters?: PlayingCharacter[];
  className?: string;
  hasCharacterProfiles?: boolean;
  bubblePortrait?: {
    speaker: string;
    text: string;
  };
  menuSlot?: ReactNode;
  skipSlot?: ReactNode;
}

export default function Header({
  playingCharacters,
  className,
  hasCharacterProfiles = true,
  bubblePortrait,
  menuSlot,
  skipSlot,
}: HeaderProps) {
  return (
    <div
      className={cn(
        'z-70 h-fit pt-11 pr-11',
        'flex items-center justify-between',
        className
      )}
    >
      <div className='flex items-start'>
        <div
          className={cn(
            'flex items-center gap-6',
            hasCharacterProfiles ? 'pl-13' : ''
          )}
        >
          {hasCharacterProfiles && playingCharacters && (
            <>
              {playingCharacters.map((char, index) => (
                <CharacterProfile
                  key={char.id}
                  name={char.name || '-'}
                  image={char.profileImage || ''}
                  mentality={char.currentMental || 0}
                  hp={char.currentHp || 0}
                  characterColors={
                    char.colors || { backgroundColor: null, borderColor: null }
                  }
                  active={index === 0}
                />
              ))}
            </>
          )}
        </div>
        <AnimatePresence>
          {bubblePortrait && (
            <BubblePortrait
              className='mx-9 my-2'
              text={bubblePortrait.text}
              characterColors={
                playingCharacters?.find(
                  char => char.name === bubblePortrait.speaker
                )?.colors || {
                  backgroundColor: null,
                  borderColor: null,
                }
              }
            />
          )}
        </AnimatePresence>
      </div>
      {(menuSlot || skipSlot) && (
        <div className='flex h-full flex-col items-end gap-4.75'>
          {menuSlot && <div className='flex items-start gap-6'>{menuSlot}</div>}
          {skipSlot}
        </div>
      )}
    </div>
  );
}
