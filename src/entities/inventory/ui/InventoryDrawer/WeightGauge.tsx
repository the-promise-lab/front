import { cn } from '@shared/lib/utils';

interface WeightGaugeProps {
  className?: string;
  weight?: number; // 0-100 사이의 값
}

export default function WeightGauge({
  className,
  weight = 0,
}: WeightGaugeProps) {
  // weight를 0-100 사이로 제한
  const normalizedWeight = Math.max(0, Math.min(100, weight));

  return (
    <div className={cn('relative h-8 w-full', className)}>
      {/* 게이지 배경 (테두리) */}
      <svg
        className='absolute top-0 left-0 h-full w-full'
        preserveAspectRatio='none'
        viewBox='0 0 612 34'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect
          x='1'
          y='1'
          width='610'
          height='31.6719'
          rx='15.8359'
          stroke='url(#paint0_radial_1008_1525)'
          strokeWidth='2'
        />
        <defs>
          <radialGradient
            id='paint0_radial_1008_1525'
            cx='0'
            cy='0'
            r='1'
            gradientTransform='matrix(569.16 -19.193 129.73 11.6457 330.48 16.8359)'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='white' />
            <stop offset='1' stopColor='white' stopOpacity='0.4' />
          </radialGradient>
        </defs>
      </svg>

      {/* 게이지 채움 */}
      <div
        className={cn(
          'absolute top-1 left-1 h-6 rounded-[100px]'
          // 'bg-[linear-gradient(258deg,rgba(255,255,255,0.80)_-4.98%,rgba(255,255,255,0.00)_89.03%)]'
        )}
        style={{
          width: `calc(${normalizedWeight}% - 0.5rem)`,
          background:
            'linear-gradient(210deg, rgba(255, 255, 255, 0.70) -4.98%, rgba(255, 255, 255, 0.00) 89.03%)',
        }}
      />
    </div>
  );
}
