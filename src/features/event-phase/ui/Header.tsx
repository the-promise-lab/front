import { cn } from '@shared/lib/utils';
import { IconBackpackButton, IconPauseButton } from './kit/icon-button';
import CharacterProfile from './kit/CharacterProfile';

interface HeaderProps {
  className?: string;
  hasBackpackButton?: boolean;
  hasPauseButton?: boolean;
  hasCharacterProfiles?: boolean;
}

export default function Header({
  className,
  hasBackpackButton = true,
  hasPauseButton = true,
  hasCharacterProfiles = true,
}: HeaderProps) {
  const characterProfiles = [
    { name: '캐릭터1', mentality: 99, hp: 99 },
    { name: '캐릭터2', mentality: 99, hp: 99 },
  ];
  return (
    <div
      className={cn(
        'absolute inset-0 z-70 h-fit pt-11 pr-11',
        'flex items-center justify-between',
        className
      )}
    >
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
              />
            ))}
          </>
        )}
      </div>
      <div className='flex h-full items-start gap-6'>
        {hasBackpackButton && <IconBackpackButton />}
        {hasPauseButton && <IconPauseButton />}
      </div>
    </div>
  );
}
