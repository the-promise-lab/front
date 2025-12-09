import { ContentTitle } from '../kit/ContentTitle';
import { GlassPanel } from '../kit/GlassPanel';
import PlayReportScrollContent from './PlayReportScrollContent';
import useResultReport from '../../../model/useResultReport';
import { RESULT_PLAY_REPORT_DATA } from '../../../__mocks__/mockResults';

export function PlayReportContent({ sessionId }: { sessionId: string }) {
  const { data: resultReport, isPending, isError } = useResultReport(sessionId);

  if (isPending)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        결과 보고서를 조회중입니다..
      </div>
    );
  const resultReportData = resultReport || RESULT_PLAY_REPORT_DATA;
  return (
    <>
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
              ending={resultReportData.ending}
              points={resultReportData.points}
              characters={resultReportData.characters}
              survivalBag={resultReportData.survivalBag}
            />
          </div>
        </div>
      </div>
      {isError && (
        <div className='fixed right-0 bottom-0'>
          결과 보고서 조회 오류로 인해 임시 데이터를 표시중입니다.
        </div>
      )}
    </>
  );
}
