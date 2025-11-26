import { cn } from '@shared/lib/utils';
import { IconHeart, IconLightning, IconPotential } from '@shared/ui/icons';
import Typography from '@shared/ui/Typography';

interface CharacterStatsSectionProps {
  characters: {
    name: string;
    health: number;
    mental: number;
    potential: number;
  }[];
}

function StateCardBackground() {
  return (
    <svg
      className='absolute inset-0'
      viewBox='0 0 372 133'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M8 0V8H0' stroke='#F5091E' strokeOpacity='0.5' />
      <path d='M9 1V9H1' stroke='white' />
      <path d='M10 2V10H2' stroke='#00C9D7' strokeOpacity='0.5' />
      <path
        d='M-3.49691e-07 125L8 125L8 133'
        stroke='#F5091E'
        strokeOpacity='0.5'
      />
      <path d='M1 124L9 124L9 132' stroke='white' />
      <path d='M2 123L10 123L10 131' stroke='#00C9D7' strokeOpacity='0.5' />
      <path d='M364 0V8H372' stroke='#F5091E' strokeOpacity='0.5' />
      <path d='M363 1V9H371' stroke='white' />
      <path d='M362 2V10H370' stroke='#00C9D7' strokeOpacity='0.5' />
      <path d='M372 125L364 125L364 133' stroke='#F5091E' strokeOpacity='0.5' />
      <path d='M371 124L363 124L363 132' stroke='white' />
      <path d='M370 123L362 123L362 131' stroke='#00C9D7' strokeOpacity='0.5' />
      <rect
        x='12.5176'
        y='10.9883'
        width='351.483'
        height='113.026'
        stroke='#00C9D7'
        strokeOpacity='0.5'
        strokeWidth='2'
      />
      <rect
        x='8'
        y='8'
        width='351.483'
        height='113.026'
        stroke='#F5091E'
        strokeOpacity='0.5'
        strokeWidth='2'
      />
      <g filter='url(#filter0_d_2155_9788)'>
        <path
          d='M10.3877 123.521C10.3877 123.521 10.3877 53.871 10.3877 9.2422L361.047 9.2422'
          stroke='white'
          strokeWidth='2'
        />
      </g>
      <g filter='url(#filter1_d_2155_9788)'>
        <rect
          x='9.25879'
          y='8'
          width='353.483'
          height='115.026'
          fill='white'
          fillOpacity='0.2'
          shapeRendering='crispEdges'
        />
        <rect
          x='10.2588'
          y='9'
          width='351.483'
          height='113.026'
          stroke='white'
          strokeWidth='2'
          shapeRendering='crispEdges'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_2155_9788'
          x='9.3877'
          y='8.24219'
          width='353.659'
          height='117.279'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dx='1' dy='1' />
          <feGaussianBlur stdDeviation='0.5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_2155_9788'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_2155_9788'
            result='shape'
          />
        </filter>
        <filter
          id='filter1_d_2155_9788'
          x='9.25879'
          y='8'
          width='355.482'
          height='117.026'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dx='1' dy='1' />
          <feGaussianBlur stdDeviation='0.5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_2155_9788'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_2155_9788'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
}

// 캐릭터 스탯 카드 컴포넌트
function CharacterStatCard({
  health,
  mental,
  potential,
  className,
}: {
  health: number;
  mental: number;
  potential: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative flex h-fit w-87 flex-col items-center gap-2 px-7.5 py-4.5',
        className
      )}
    >
      <StateCardBackground />
      {/* 라벨 행 */}
      <div className='flex w-full items-center justify-between px-2'>
        <div className='flex items-center gap-1'>
          <IconHeart className='size-7' />
          <Typography variant='caption' className='text-white'>
            체력
          </Typography>
        </div>
        <div className='flex items-center gap-1'>
          <IconLightning className='size-7' />
          <Typography variant='caption' className='text-white'>
            정신력
          </Typography>
        </div>
        <div className='flex items-center gap-1'>
          <IconPotential className='size-7' />
          <Typography variant='caption' className='text-white'>
            잠재력
          </Typography>
        </div>
      </div>

      {/* 구분선 */}
      <div className='h-px w-full bg-white/40' />

      {/* 수치 행 */}
      <div className='flex w-full items-center justify-between px-6'>
        <Typography variant='body-b' className='text-white'>
          {health}
        </Typography>
        <Typography variant='body-b' className='text-white'>
          {mental}
        </Typography>
        <Typography variant='body-b' className='text-white'>
          {potential}
        </Typography>
      </div>
    </div>
  );
}

export default function CharacterStatsSection({
  characters,
}: CharacterStatsSectionProps) {
  return (
    <div className='relative h-125 w-full'>
      {/* 캐릭터 이미지 placeholder */}
      <div className='absolute inset-0 bg-gray-500/30' />

      {/* 좌측 상단 스탯카드 (첫번째 캐릭터) */}
      {characters[0] && (
        <CharacterStatCard
          health={characters[0].health}
          mental={characters[0].mental}
          potential={characters[0].potential}
          className='absolute top-25 left-4'
        />
      )}

      {/* 우측 하단 스탯카드 (두번째 캐릭터) */}
      {characters[1] && (
        <CharacterStatCard
          health={characters[1].health}
          mental={characters[1].mental}
          potential={characters[1].potential}
          className='absolute top-1/2 right-4 -translate-y-1/2'
        />
      )}

      {/* 잠재력 설명 텍스트 (우측 하단 그라데이션) */}
      <div
        className='absolute right-0 bottom-0 flex h-19 w-162.5 items-center justify-end pr-4'
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 0) 11.46%, rgba(0, 0, 0, 0.8) 102.38%)',
        }}
      >
        <Typography
          variant='caption-2'
          className='text-right leading-[1.3] text-white'
        >
          잠재력은 이들의 숨겨진 능력치입니다.
          <br />
          잠재력을 관리해 다양한 엔딩을 확인할 수 있습니다.
        </Typography>
      </div>
    </div>
  );
}
