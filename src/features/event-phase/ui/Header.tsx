import { cn } from '@shared/lib/utils';
import { IconBackpackButton, IconPauseButton } from './kit/icon-button';
import CharacterProfile from './kit/CharacterProfile';
// eslint-disable-next-line boundaries/element-types
import { useGameFlowStore } from '@processes/game-flow';
import BubblePortrait from './kit/CharacterProfile/BubblePortrait';

interface HeaderProps {
  className?: string;
  hasBackpackButton?: boolean;
  hasPauseButton?: boolean;
  hasCharacterProfiles?: boolean;
  bubblePortraitText?: string;
}

export default function Header({
  className,
  hasBackpackButton = true,
  hasPauseButton = true,
  hasCharacterProfiles = true,
  bubblePortraitText,
}: HeaderProps) {
  const { characters, openPauseMenu } = useGameFlowStore();

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
          {hasCharacterProfiles && (
            <>
              {characters.map((profile, index) => (
                <CharacterProfile
                  key={profile.name}
                  name={profile.name}
                  image={profile.image}
                  mentality={profile.mentality}
                  hp={profile.hp}
                  characterColors={profile.colors}
                  active={index === 0}
                />
              ))}
            </>
          )}
        </div>
        {bubblePortraitText &&
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
        {hasBackpackButton && <IconBackpackButton />}
        {hasPauseButton && <IconPauseButton onClick={() => openPauseMenu()} />}
      </div>
    </div>
  );
}
