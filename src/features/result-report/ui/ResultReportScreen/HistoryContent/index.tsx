import { ContentTitle } from '../kit/ContentTitle';
import { HistoryListItem } from './HistoryListItem';
import usePlayHistory from '../../../model/usePlayHistory';
import Typography from '@shared/ui/Typography';

export default function HistoryContent() {
  const { data: historyItems } = usePlayHistory();

  return (
    <div className='relative flex h-full w-full flex-col px-16'>
      {/* 타이틀 영역 - 기존 h-45 유지 */}
      <div className='flex h-45 shrink-0 items-center'>
        <ContentTitle title='History' />
      </div>

      {/* 컨텐츠 영역 - 리스트만 스크롤 */}
      <div className='relative min-h-0 flex-1 pr-10'>
        <div className='scrollbar-hide flex h-full flex-col gap-4.5 overflow-y-auto pr-8.5'>
          {historyItems ? (
            historyItems.map(item => (
              <HistoryListItem key={item.id} item={item} />
            ))
          ) : (
            <div className='flex h-full items-center justify-center'>
              <Typography variant='body-2-b' className='text-white'>
                플레이 기록이 아직 없습니다.
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
