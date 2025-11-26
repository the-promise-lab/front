import Typography from '@shared/ui/Typography';
import { ContentTitle } from '../kit/ContentTitle';
import { GlassPanel } from '../kit/GlassPanel';

export function PlayReportContent() {
  return (
    // 1차 스크롤: 외부 스크롤 컨테이너
    <div className='h-full w-full overflow-y-auto'>
      {/* 타이틀 영역 - 1차 스크롤 시 밀려올라감 */}
      <div className='flex h-45 shrink-0 items-center px-16'>
        <ContentTitle title='Play Report' />
      </div>

      {/* GlassPanel 컨테이너 - sticky로 상단 고정, 높이는 화면 전체 */}
      <div className='sticky top-0 h-dvh px-15'>
        {/* GlassPanel 배경 */}
        <GlassPanel className='absolute inset-0' />

        {/* 2차 스크롤: GlassPanel 내부 스크롤 영역 */}
        <div className='relative z-10 h-full overflow-y-auto px-10 py-8'>
          <div>
            <Typography variant='h2-b' className='text-white'>
              Happy: 사랑과 득근
            </Typography>
          </div>
          <div className='flex flex-col gap-8'>
            {/* Point 1 섹션 */}
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <div className='h-9 w-9 bg-white' />
                <Typography variant='body-b' className='text-white'>
                  Point 1
                </Typography>
              </div>
              <div className='h-23 bg-green-500' />
              <Typography variant='body-2-b' className='text-white'>
                물과 보온 용품을 준비하고, 심리적 안정을 위한 애착 물건을 챙기는
                것은 극한 상황을 대비하는 훌륭한 전략입니다.
              </Typography>
            </div>

            {/* Point 2 섹션 */}
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <div className='h-9 w-9 bg-white' />
                <Typography variant='body-b' className='text-white'>
                  Point 2
                </Typography>
              </div>
              <div className='h-22.75 bg-red-500' />
              <Typography variant='body-2-b' className='text-white'>
                재난 상황에서는 개인 특성에 맞춘 준비가 생존의 핵심입니다.
                수면이 예민한 경우 귀마개나 수면 안대를, 시력이 나쁜 경우 여분의
                안경 등을 챙겨 생존 확률을 높일 수 있습니다.
              </Typography>
            </div>

            {/* 캐릭터 이미지 영역 - 임시 placeholder */}
            <div className='h-125 w-full bg-gray-500/30' />

            {/* 캐릭터 스탯 영역들 - 임시 placeholder */}
            <div className='flex gap-8'>
              <div className='flex-1 bg-gray-500/30 p-4'>
                <Typography variant='caption' className='text-white'>
                  캐릭터 1 스탯
                </Typography>
              </div>
              <div className='flex-1 bg-gray-500/30 p-4'>
                <Typography variant='caption' className='text-white'>
                  캐릭터 2 스탯
                </Typography>
              </div>
            </div>

            <div className='h-95 bg-gray-500/30'>
              <Typography variant='caption' className='text-white'>
                생존가방 영역
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
