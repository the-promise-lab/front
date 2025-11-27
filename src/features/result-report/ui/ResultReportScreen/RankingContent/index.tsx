import { ContentTitle } from '../kit/ContentTitle';
import { GlassPanel } from '../kit/GlassPanel';
import TotalScoreSection from './TotalScoreSection';
import FinalResultSection from './FinalResultSection';
import RankingListSection from './RankingListSection';
import { RESULT_RANKING_DATA } from '../../../__mocks__/mockResults';

// TODO: 실제 API에서 데이터 가져오기
const mockData = RESULT_RANKING_DATA;

export default function RankingContent() {
  return (
    <div className='relative flex h-full w-full flex-col'>
      {/* 타이틀 영역 */}
      <div className='flex h-45 shrink-0 items-center'>
        <ContentTitle title='Ranking' />
      </div>

      {/* GlassPanel 컨테이너 */}
      <div className='relative flex-1 py-16 pl-15'>
        <GlassPanel className='absolute inset-0' />

        {/* GlassPanel 내부 컨텐츠 */}
        <div className='relative z-10 flex h-full gap-16'>
          {/* 좌측: Total Score + Final Result */}
          <div className='flex w-1/2 flex-col gap-8'>
            <TotalScoreSection
              rank={mockData.myScore.rank}
              totalUsers={mockData.myScore.totalUsers}
              xp={mockData.myScore.xp}
            />
            <FinalResultSection characters={mockData.characters} />
          </div>

          {/* 우측: Ranking 리스트 */}
          <div className='flex-1'>
            <RankingListSection rankings={mockData.rankings} />
          </div>
        </div>
      </div>
    </div>
  );
}
