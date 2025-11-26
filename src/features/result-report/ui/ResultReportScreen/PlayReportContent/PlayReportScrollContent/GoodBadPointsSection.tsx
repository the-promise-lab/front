import { cn } from '@shared/lib/utils';
import { IconDiamond } from '@shared/ui/icons';
import Typography from '@shared/ui/Typography';

interface GoodBadPointsSectionProps {
  points: {
    type: 'positive' | 'negative';
    label: string;
    description: string;
  }[];
}

// Point 섹션 컴포넌트
function PointSection({
  type,
  label,
  description,
}: {
  type: 'positive' | 'negative';
  label: string;
  description: string;
}) {
  const isPositive = type === 'positive';

  return (
    <div className='flex h-22.5 w-full items-center gap-2'>
      {/* 좌측 색상 바 */}
      <div
        className={cn(
          'h-full w-2.25 shrink-0',
          isPositive ? 'bg-green-1' : 'bg-red-1'
        )}
      />
      {/* 그라데이션 배경 영역 */}
      <div
        className='flex h-full flex-1 items-center gap-10 pr-4 pl-8'
        style={{
          background: isPositive
            ? 'linear-gradient(90deg, #48DB8D 0%, rgba(77, 218, 143, 0.45) 34.95%, rgba(76, 246, 156, 0.28) 96.92%)'
            : 'linear-gradient(90deg, #ED545D 0%, rgba(255, 78, 89, 0.45) 34.95%, rgba(255, 78, 89, 0.28) 96.92%)',
        }}
      >
        {/* Point 라벨 */}
        <div className='flex shrink-0 items-center gap-3.5'>
          <IconDiamond className='size-8' />
          <Typography variant='body-b' className='text-white'>
            {label}
          </Typography>
        </div>
        {/* 설명 텍스트 */}
        <Typography variant='body-2-b' className='flex-1 text-white'>
          {description}
        </Typography>
      </div>
    </div>
  );
}

export default function GoodBadPointsSection({
  points,
}: GoodBadPointsSectionProps) {
  return (
    <div className='flex flex-col gap-3'>
      {points.map((point, index) => (
        <PointSection
          key={index}
          type={point.type}
          label={point.label}
          description={point.description}
        />
      ))}
    </div>
  );
}
