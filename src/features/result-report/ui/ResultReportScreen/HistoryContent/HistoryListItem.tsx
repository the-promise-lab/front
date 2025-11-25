import { cn } from '@shared/lib/utils';
import Typography from '@shared/ui/Typography';
import { IconDiamond } from '@shared/ui/icons';

interface HistoryListItemProps {
  className?: string;
}

export function HistoryListItem({ className }: HistoryListItemProps) {
  // TODO: props로 받아올 데이터들 - 현재는 하드코딩
  const characterName = '형빈과 병철';
  const resultType = 'Hidden';
  const xp = '210,000';
  const date = '25.09.22';
  const time = '23:12';

  return (
    <div
      className={cn(
        'relative flex h-39.5 w-full shrink-0 items-center gap-2.25',
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
          {/* TODO: 실제 캐릭터 이미지로 교체 */}
          <div className='absolute inset-0 bg-gray-600' />
        </div>

        {/* 중앙 컨텐츠 영역 */}
        <div className='ml-16 flex flex-1 flex-col gap-2'>
          {/* 캐릭터 이름 */}
          <Typography variant='dialogue-m' className='text-white'>
            {characterName}
          </Typography>

          {/* 결과 정보 */}
          <div className='flex items-center gap-2.5'>
            <IconDiamond className='size-7' />
            <Typography variant='body-2-b' className='text-white'>
              최종 결과: {resultType}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{xp}{' '}
              xp
            </Typography>
          </div>
        </div>

        {/* 우측 날짜/시간 영역 */}
        <div className='mr-9 shrink-0 text-right'>
          <Typography variant='body-3-r' className='text-white'>
            {date}
          </Typography>
          <Typography variant='body-3-r' className='text-white'>
            {time}
          </Typography>
        </div>
      </div>
    </div>
  );
}
