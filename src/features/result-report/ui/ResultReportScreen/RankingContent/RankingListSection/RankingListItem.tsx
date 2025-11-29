import { cn } from '@shared/lib/utils';
import Typography from '@shared/ui/Typography';
import type { RankingUser } from '../../../../model/types';
import {
  IconRankBadgeFirst,
  IconRankBadgeSecond,
  IconRankBadgeThird,
} from './icons';

type RankingListItemProps = RankingUser;

// 순위별 색상 정의 (main-1: #fe8a01)
function getRankColor(rank: number, isCurrentUser: boolean) {
  if (isCurrentUser) return 'var(--color-main-1)'; // 주황색 (본인)
  if (rank === 1) return '#c6881c'; // 금색
  if (rank === 2) return '#30a2aa'; // 청록색
  if (rank === 3) return '#a37344'; // 브론즈
  return '#d9d9d9'; // 회색
}

// 순위 텍스트 색상 정의
function getRankTextColor(rank: number, isCurrentUser: boolean) {
  if (isCurrentUser) return 'rgba(255,255,255,0.7)';
  if (rank === 1) return '#8c621a';
  if (rank === 2) return '#397478';
  if (rank === 3) return '#6f4f30';
  return 'rgba(255,255,255,0.7)';
}

// 순위별 배지 컴포넌트
function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <IconRankBadgeFirst className='absolute inset-0' />;
  if (rank === 2) return <IconRankBadgeSecond className='absolute inset-0' />;
  if (rank === 3) return <IconRankBadgeThird className='absolute inset-0' />;
  return null;
}

function getGradientColor(isCurrentUser: boolean) {
  if (isCurrentUser)
    return 'linear-gradient(76deg, rgba(254, 138, 1, 0.80) 7.32%, rgba(254, 138, 1, 0.30) 91.5%)';
  return 'linear-gradient(77deg, rgba(192, 192, 192, 0.56) 9.55%, rgba(84, 84, 84, 0.00) 90.45%)';
}

export default function RankingListItem({
  rank,
  nickname,
  xp,
  isCurrentUser = false,
}: RankingListItemProps) {
  const barColor = getRankColor(rank, isCurrentUser);
  const rankTextColor = getRankTextColor(rank, isCurrentUser);

  return (
    <div
      className={cn('flex h-19 w-full items-center gap-2', {
        'mt-auto': isCurrentUser,
      })}
    >
      {/* 좌측 색상 바 */}
      <div
        className={cn('h-full w-2.5 shrink-0', rank > 3 && 'opacity-70')}
        style={{ backgroundColor: barColor }}
      />

      <div
        className='flex h-full w-full items-center justify-between'
        style={{
          background: getGradientColor(isCurrentUser),
        }}
      >
        {/* 순위 번호 영역 */}
        <div className='relative flex h-full w-30 shrink-0 items-center px-5.5'>
          <RankBadge rank={rank} />
          <Typography
            variant='dialogue-b'
            className='relative z-10'
            style={{ color: rankTextColor }}
          >
            {rank}
          </Typography>
        </div>

        {/* 컨텐츠 영역 */}
        <div className='flex flex-1 items-center justify-between px-16.5 py-5.5'>
          <Typography variant='body-2-b' className='text-white'>
            {nickname}
          </Typography>
          <Typography variant='caption-2' className='text-right text-white'>
            {xp.toLocaleString()} xp
          </Typography>
        </div>
      </div>
    </div>
  );
}
