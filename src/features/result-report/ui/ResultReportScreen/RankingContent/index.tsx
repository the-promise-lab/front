import { ContentTitle } from '../kit/ContentTitle';
import { GlassPanel } from '../kit/GlassPanel';
import TotalScoreSection from './TotalScoreSection';
import FinalResultSection from './FinalResultSection';
import RankingListSection from './RankingListSection';

// TODO: 실제 API에서 데이터 가져오기
const mockData = {
  myScore: {
    rank: 241,
    totalUsers: 3890,
    xp: 384,
  },
  characters: [
    { characterNames: '형빈과 병철', result: 'Happy' },
    { characterNames: '복순과 진실', result: 'Happy' },
    { characterNames: '재욱과 예원', result: 'Normal' },
    { characterNames: '미리와 재호', result: 'Bad' },
  ],
  rankings: [
    { rank: 1, nickname: '사용자 닉네임123', xp: 225710000 },
    { rank: 2, nickname: '사용자 닉네임123', xp: 25710000 },
    { rank: 3, nickname: '사용자 닉네임123', xp: 5710000 },
    { rank: 4, nickname: '사용자 닉네임123', xp: 710000 },
    { rank: 5, nickname: '사용자 닉네임123', xp: 10000 },
    { rank: 6, nickname: '사용자 닉네임123', xp: 9800 },
    { rank: 7, nickname: '사용자 닉네임123', xp: 9300 },
    { rank: 241, nickname: '사용자 닉네임123', xp: 384, isCurrentUser: true },
  ],
};

export default function RankingContent() {
  return (
    <div className='relative flex h-full w-full flex-col'>
      {/* 타이틀 영역 */}
      <div className='flex h-45 shrink-0 items-center'>
        <ContentTitle title='Ranking' />
      </div>

      {/* GlassPanel 컨테이너 */}
      <div className='relative flex-1 px-15 py-16'>
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
