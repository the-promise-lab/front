import { useCallback, useState } from 'react';
import { cn } from '@shared/lib/utils';
import Typography from '@shared/ui/Typography';
import { IconDiamond } from '@shared/ui/icons';
import type { HistoryItem } from '../../../model/types';
import { ReportModal } from '../kit/ReportModal';
import PlayReportScrollContent from '../PlayReportContent/PlayReportScrollContent';

interface HistoryListItemProps {
  item: HistoryItem;
  className?: string;
}

export function HistoryListItem({ item, className }: HistoryListItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <button
        type='button'
        onClick={open}
        className={cn(
          'relative flex h-39.5 w-full shrink-0 cursor-pointer items-center gap-2.25 text-left',
          className
        )}
      >
        {/* 좌측 인디케이터 바 */}
        <div className='h-full w-2.5 bg-[#d9d9d9]/70' />

        {/* 캐릭터 이미지 영역 */}
        <div
          className='flex h-full w-full flex-1 items-center gap-2.25'
          style={{
            background:
              'linear-gradient(77deg, rgba(192, 192, 192, 0.56) 9.55%, rgba(84, 84, 84, 0.00) 90.45%)',
          }}
        >
          <div className='relative ml-7.25 h-full w-93 shrink-0 overflow-hidden'>
            {item.characterImageUrl ? (
              <img
                src={item.characterImageUrl}
                alt={item.characterName}
                className='absolute inset-0 h-full w-full object-cover'
              />
            ) : (
              <div className='absolute inset-0 bg-gray-600' />
            )}
          </div>

          {/* 중앙 컨텐츠 영역 */}
          <div className='ml-16 flex flex-1 flex-col gap-2'>
            {/* 캐릭터 이름 */}
            <Typography variant='dialogue-m' className='text-white'>
              {item.characterName}
            </Typography>

            {/* 결과 정보 */}
            <div className='flex items-center gap-2.5'>
              <IconDiamond className='size-7' />
              <Typography variant='body-2-b' className='text-white'>
                최종 결과: {item.resultType}
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                {item.xp.toLocaleString()} xp
              </Typography>
            </div>
          </div>

          {/* 우측 날짜/시간 영역 */}
          <div className='mr-9 shrink-0 text-right'>
            <Typography variant='body-3-r' className='text-white'>
              {item.date}
            </Typography>
            <Typography variant='body-3-r' className='text-white'>
              {item.time}
            </Typography>
          </div>
        </div>
      </button>

      {/* 상세 모달 */}
      <ReportModal
        isOpen={isOpen}
        onClose={close}
        title={item.playReport.endingTitle}
      >
        <PlayReportScrollContent
          endingTitle={item.playReport.endingTitle}
          points={item.playReport.points}
          characters={item.playReport.characters}
          survivalBag={item.playReport.survivalBag}
          showTitle={false}
        />
      </ReportModal>
    </>
  );
}
