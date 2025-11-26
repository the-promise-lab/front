import { cn } from '@shared/lib/utils';
import Typography from '@shared/ui/Typography';
import {
  IconRankBadgeGold,
  IconRankBadgeSilver,
  IconRankBadgeBronze,
} from '@shared/ui/icons';

interface RankingListItemProps {
  rank: number;
  nickname: string;
  xp: number;
  isCurrentUser?: boolean;
}

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
  if (rank === 1) return <IconRankBadgeGold className='size-8' />;
  if (rank === 2) return <IconRankBadgeSilver className='size-8' />;
  if (rank === 3) return <IconRankBadgeBronze className='size-8' />;
  return null;
}

export default function RankingListItem({
  rank,
  nickname,
  xp,
  isCurrentUser = false,
}: RankingListItemProps) {
  const barColor = getRankColor(rank, isCurrentUser);
  const rankTextColor = getRankTextColor(rank, isCurrentUser);
  const hasBadge = rank >= 1 && rank <= 3;

  return (
    <div
      className='flex h-19 items-center'
      style={{
        background:
          'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
      }}
    >
      {/* 좌측 색상 바 */}
      <div
        className={cn('h-full w-2.5 shrink-0', rank > 3 && 'opacity-70')}
        style={{ backgroundColor: barColor }}
      />

      {/* 순위 번호 영역 */}
      <div className='flex w-30 shrink-0 items-center justify-center'>
        {hasBadge ? (
          <div className='relative flex items-center justify-center'>
            <RankBadge rank={rank} />
            <Typography
              variant='dialogue-b'
              className='absolute'
              style={{ color: rankTextColor }}
            >
              {rank}
            </Typography>
          </div>
        ) : (
          <Typography
            variant='dialogue-b'
            className='text-center'
            style={{ color: rankTextColor }}
          >
            {rank}
          </Typography>
        )}
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
  );
}
