import { cn } from '@shared/lib/utils';
import Avatar from './Avatar';
import MentalityStat from './MentalityStat';
import HPStat from './HPStat';

interface CharacterProfileProps {
  name: string;
  mentality: number;
  hp: number;
  image: string;
  className?: string;
  characterColors?: {
    backgroundColor: string;
    borderColor: string;
  };
  active?: boolean;
}

export default function CharacterProfile({
  name,
  mentality,
  hp,
  image,
  className,
  characterColors,
  active = false,
}: CharacterProfileProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-start gap-3',
        `w-fit`,
        className
      )}
    >
      {/* 아바타 */}
      <Avatar
        name={name}
        image={image}
        characterColors={characterColors}
        active={active}
      />

      {/* 스탯 */}
      <div className='flex items-center justify-start gap-2'>
        <MentalityStat value={mentality} />
        <HPStat value={hp} />
      </div>
    </div>
  );
}
