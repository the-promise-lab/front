import { HistoryListItem } from './HistoryListItem';

export default function HistoryContent() {
  // TODO: 실제 히스토리 데이터를 API나 store에서 가져오기
  const historyItems = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
  ];

  return (
    <div className='relative h-full w-full flex-1 pt-8 pr-10'>
      <div className='flex h-full flex-col gap-4.5 overflow-y-auto pr-8.5'>
        {historyItems.map(item => (
          <HistoryListItem key={item.id} />
        ))}
      </div>
    </div>
  );
}
