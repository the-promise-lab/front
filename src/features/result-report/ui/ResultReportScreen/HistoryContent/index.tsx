import { ContentTitle } from '../kit/ContentTitle';
import { HistoryListItem } from './HistoryListItem';
import { RESULT_HISTORY_ITEMS } from '../../../__mocks__/mockResults';

export default function HistoryContent() {
  // TODO: 실제 히스토리 데이터를 API나 store에서 가져오기
  const historyItems = RESULT_HISTORY_ITEMS;

  return (
    <div className='relative flex h-full w-full flex-col px-16'>
      {/* 타이틀 영역 - 기존 h-45 유지 */}
      <div className='flex h-45 shrink-0 items-center'>
        <ContentTitle title='History' />
      </div>

      {/* 컨텐츠 영역 - 리스트만 스크롤 */}
      <div className='relative min-h-0 flex-1 pr-10'>
        <div className='flex h-full flex-col gap-4.5 overflow-y-auto pr-8.5'>
          {historyItems.map(item => (
            <HistoryListItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
