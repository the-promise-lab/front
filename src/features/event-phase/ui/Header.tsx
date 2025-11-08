import { cn } from '@shared/lib/utils';
import CharacterProfile from './kit/CharacterProfile';
// eslint-disable-next-line boundaries/element-types
import BubblePortrait from './kit/CharacterProfile/BubblePortrait';
import { SideInventory, PauseMenu } from '@widgets/menu';
import type { Character } from '@features/character-selection';

interface HeaderProps {
  characters?: Character[];
  className?: string;
  hasBackpackButton?: boolean;
  hasPauseButton?: boolean;
  hasCharacterProfiles?: boolean;
  bubblePortraitText?: string;
}

export default function Header({
  characters,
  className,
  hasBackpackButton = true,
  hasPauseButton = true,
  hasCharacterProfiles = true,
  bubblePortraitText,
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
          {hasCharacterProfiles && characters && (
            <>
              {characters.map((char, index) => (
                <CharacterProfile
                  key={char.name}
                  name={char.name}
                  image={char.thumbnailImage || ''}
                  mentality={char.currentSp}
                  hp={char.currentHp}
                  characterColors={
                    char.colors || {
                      backgroundColor: '#666',
                      borderColor: '#999',
                    }
                  }
                  active={index === 0}
                />
              ))}
            </>
          )}
        </div>
        {bubblePortraitText &&
          characters &&
          characters.length > 0 &&
          characters[0].colors && (
            <BubblePortrait
              className='mx-9 my-2'
              text={bubblePortraitText}
              characterColors={characters[0].colors}
            />
          )}
      </div>
      <div className='flex h-full items-start gap-6'>
        {hasBackpackButton && <SideInventory hasWeightBar weight={100} />}
        {hasPauseButton && <PauseMenu />}
      </div>
    </div>
  );
}
