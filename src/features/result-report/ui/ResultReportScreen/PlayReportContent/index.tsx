import { ContentTitle } from '../kit/ContentTitle';
import { GlassPanel } from '../kit/GlassPanel';
import PlayReportScrollContent from './PlayReportScrollContent';
import { RESULT_PLAY_REPORT_DATA } from '../../../__mocks__/mockResults';

// TODO: 실제 데이터 연동
const mockData = RESULT_PLAY_REPORT_DATA;

export function PlayReportContent() {
  return (
    // 1차 스크롤: 외부 스크롤 컨테이너
    <div className='overflow-y-auto. h-full w-full'>
      {/* 타이틀 영역 - 1차 스크롤 시 밀려올라감 */}
      <div className='flex h-45 shrink-0 items-center px-16'>
        <ContentTitle title='Play Report' />
      </div>

      {/* GlassPanel 컨테이너 - sticky로 상단 고정, 높이는 화면 전체 */}
      <div className='sticky top-0 h-dvh px-15 py-8'>
        {/* GlassPanel 배경 */}
        <GlassPanel className='fixed top-45 left-120 ml-[calc(50dvw-50dvh*16/9)] h-dvh w-dvw' />

        {/* 2차 스크롤: GlassPanel 내부 스크롤 영역 */}
        <div className='relative z-10 h-full overflow-y-auto'>
          <PlayReportScrollContent
            endingTitle={mockData.endingTitle}
            points={mockData.points}
            characters={mockData.characters}
            survivalBag={mockData.survivalBag}
          />
        </div>
      </div>
    </div>
  );
}
