import { ContentTitle } from '../kit/ContentTitle';
import { GlassPanel } from '../kit/GlassPanel';
import TotalScoreSection from './TotalScoreSection';
import FinalResultSection from './FinalResultSection';
import RankingListSection from './RankingListSection';
import useRankingSummary from '../../../model/useRankingSummary';

export default function RankingContent() {
  const { data: rankingSummary } = useRankingSummary();
  return (
    <div className='relative flex h-full w-full flex-col'>
      {/* 타이틀 영역 */}
      <div className='flex h-45 shrink-0 items-center'>
        <ContentTitle title='Ranking' />
      </div>

      {/* GlassPanel 컨테이너 */}
      <div className='scrollbar-hide relative flex-1 overflow-y-auto py-16 pl-15'>
        <GlassPanel className='fixed top-45 left-120 ml-[calc(50dvw-50dvh*16/9)] h-dvh w-dvw' />

        {/* GlassPanel 내부 컨텐츠 */}
        <div className='relative z-10 flex h-full flex-wrap gap-16'>
          {/* 좌측: Total Score + Final Result */}
          <div className='flex min-w-160 flex-1 flex-col gap-8'>
            <TotalScoreSection
              rank={rankingSummary?.myScore.rank ?? 0}
              totalUsers={rankingSummary?.myScore.totalUsers ?? 0}
              xp={rankingSummary?.myScore.xp ?? 0}
            />
            <FinalResultSection characters={rankingSummary?.characters ?? []} />
          </div>

          {/* 우측: Ranking 리스트 */}
          <div className='min-w-160 flex-1'>
            <RankingListSection rankings={rankingSummary?.rankings ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
}
