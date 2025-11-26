import { IconDiamond } from '@shared/ui/icons';
import Typography from '@shared/ui/Typography';

interface TotalScoreSectionProps {
  rank: number;
  totalUsers: number;
  xp: number;
}

export default function TotalScoreSection({
  rank,
  totalUsers,
  xp,
}: TotalScoreSectionProps) {
  return (
    <div className='flex flex-col gap-2'>
      {/* Total Score 라벨 */}
      <div className='flex items-center gap-3'>
        <IconDiamond className='size-8' />
        <Typography variant='body-b' className='text-white'>
          Total Score
        </Typography>
      </div>

      <div className='flex flex-col gap-2 pl-10'>
        {/* 순위 표시 */}
        <div className='flex items-baseline'>
          <Typography variant='h1-80' className='text-secondary-1'>
            {rank}
          </Typography>
          <Typography variant='h2-b' className='text-white'>
            /{totalUsers.toLocaleString()}
          </Typography>
        </div>

        {/* XP */}
        <Typography variant='button-eb' className='text-white uppercase'>
          {xp.toLocaleString()} xp
        </Typography>
      </div>
    </div>
  );
}
