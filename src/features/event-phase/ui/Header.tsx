import { cn } from '@shared/lib/utils';
import { IconBackpackButton, IconPauseButton } from './kit/icon-button';
import CharacterProfile from './kit/CharacterProfile';
// eslint-disable-next-line boundaries/element-types
import { useGameFlowStore } from '@processes/game-flow';

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
  const { characters } = useGameFlowStore();
  return (
    <div
      className={cn(
        'z-70 h-fit pt-11 pr-11',
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
            {characters.map(profile => (
              <CharacterProfile
                key={profile.name}
                name={profile.name}
                image={profile.image}
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
