import { IconDiamond } from '@shared/ui/icons';
import Typography from '@shared/ui/Typography';
import RankingListItem from './RankingListItem';

interface RankingUser {
  rank: number;
  nickname: string;
  xp: number;
  isCurrentUser?: boolean;
}

interface RankingListSectionProps {
  rankings: RankingUser[];
}

export default function RankingListSection({
  rankings,
}: RankingListSectionProps) {
  return (
    <div className='flex h-full flex-col'>
      {/* Ranking 라벨 */}
      <div className='mb-4 flex items-center gap-3.5'>
        <IconDiamond className='size-8' />
        <Typography variant='body-b' className='text-white'>
          Ranking
        </Typography>
      </div>

      {/* 랭킹 리스트 */}
      <div className='flex flex-1 flex-col gap-3.5'>
        {rankings.map((user, index) => (
          <RankingListItem
            key={index}
            rank={user.rank}
            nickname={user.nickname}
            xp={user.xp}
            isCurrentUser={user.isCurrentUser}
          />
        ))}
      </div>
    </div>
  );
}
