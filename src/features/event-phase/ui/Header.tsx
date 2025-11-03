import { cn } from '@shared/lib/utils';
import { IconBackpackButton, IconPauseButton } from './kit/icon-button';
import CharacterProfile from './kit/CharacterProfile';
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
  const characterProfiles = [
    {
      name: '캐릭터1',
      mentality: 99,
      hp: 99,
      colors: { backgroundColor: '#5C35A299', borderColor: '#CE96F1' },
    },
    {
      name: '캐릭터2',
      mentality: 99,
      hp: 99,
      colors: { backgroundColor: '#5B707E99', borderColor: '#9FEFD2' },
    },
  ];

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
              {characterProfiles.map(profile => (
                <CharacterProfile
                  key={profile.name}
                  name={profile.name}
                  mentality={profile.mentality}
                  hp={profile.hp}
                  characterColors={profile.colors}
                  active={profile.name === '캐릭터1'}
                />
              ))}
            </>
          )}
        </div>
        {bubblePortraitText && (
          <BubblePortrait
            className='mx-9 my-2'
            text={bubblePortraitText}
            characterColors={characterProfiles[0].colors}
          />
        )}
      </div>
      <div className='flex h-full items-start gap-6'>
        {hasBackpackButton && <IconBackpackButton />}
        {hasPauseButton && <IconPauseButton />}
      </div>
    </div>
  );
}
