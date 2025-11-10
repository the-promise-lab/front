import { cn } from '@shared/lib/utils';
import CharacterProfile from './kit/CharacterProfile';
// eslint-disable-next-line boundaries/element-types
import BubblePortrait from './kit/CharacterProfile/BubblePortrait';
import type { PlayingCharacter } from '@entities/game-session';
import type { ReactNode } from 'react';

interface HeaderProps {
  playingCharacters?: PlayingCharacter[];
  className?: string;
  hasCharacterProfiles?: boolean;
  bubblePortraitText?: string;
  menuSlot?: ReactNode;
}

export default function Header({
  playingCharacters,
  className,
  hasCharacterProfiles = true,
  bubblePortraitText,
  menuSlot,
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
                  mentality={char.currentSp || 0}
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
        {bubblePortraitText &&
          playingCharacters &&
          playingCharacters.length > 0 &&
          playingCharacters[0].colors && (
            <BubblePortrait
              className='mx-9 my-2'
              text={bubblePortraitText}
              characterColors={playingCharacters[0].colors}
            />
          )}
      </div>
      {menuSlot && (
        <div className='flex h-full items-start gap-6'>{menuSlot}</div>
      )}
    </div>
  );
}
