import { cn } from '@shared/lib/utils';
import Avatar from './Avatar';
import MentalityStat from './MentalityStat';
import HPStat from './HPStat';

interface CharacterProfileProps {
  name: string;
  mentality: number;
  hp: number;
  className?: string;
}

export default function CharacterProfile({
  name,
  mentality,
  hp,
  className,
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
      <Avatar name={name} />

      {/* 스탯 */}
      <div className='flex items-center justify-start gap-2'>
        <MentalityStat value={mentality} />
        <HPStat value={hp} />
      </div>
    </div>
  );
}
