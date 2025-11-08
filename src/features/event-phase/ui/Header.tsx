import { cn } from '@shared/lib/utils';
import CharacterProfile from './kit/CharacterProfile';
// eslint-disable-next-line boundaries/element-types
import BubblePortrait from './kit/CharacterProfile/BubblePortrait';
import { SideInventory, PauseMenu } from '@widgets/menu';
import { mockCharacterSets } from '@features/character-selection/__mocks__';

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
  const characters = mockCharacterSets[0].characters;

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
                  mentality={10}
                  hp={100}
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
        {hasBackpackButton && <SideInventory hasWeightBar weight={100} />}
        {hasPauseButton && <PauseMenu />}
      </div>
    </div>
  );
}
