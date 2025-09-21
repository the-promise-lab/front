import NoticeBanner from './kit/NoticeBanner';
import { IconHeart, IconLightning } from '@shared/ui/icons';
import { cn } from '@shared/lib/utils';
import type { ReactNode } from 'react';

interface CharacterResult {
  name: string;
  deltaHp: number; // 체력 변화
  deltaMentality: number; // 정신력 변화
}

export default function EventResultScreen() {
  // 실제 데이터 연결 전 임시 값
  const results: CharacterResult[] = [
    { name: '캐릭터1', deltaHp: +9, deltaMentality: -9 },
    { name: '캐릭터2', deltaHp: +9, deltaMentality: -9 },
  ];

  return (
    <NoticeBanner>
      <div className='flex flex-col items-center gap-9'>
        {results.map(r => (
          <ResultRow key={r.name} result={r} />
        ))}
      </div>
    </NoticeBanner>
  );
}

function ResultRow({ result }: { result: CharacterResult }) {
  const { name, deltaHp, deltaMentality } = result;
  return (
    <div className='flex items-center gap-14'>
      {/* 캐릭터 이미지 자리 - 이름으로 채움 (140px) */}
      <div className='flex h-35 w-35 items-center justify-center bg-white/10 text-white'>
        <span className='text-sm font-semibold'>{name}</span>
      </div>

      {/* 수치 묶음 */}
      <div className='flex items-center gap-14'>
        <StatBlock
          icon={<IconLightning className='h-7.25 w-7.25' />}
          label='체력'
          value={deltaHp}
          positiveClass='text-[#4cf69c]'
          negativeClass='text-[#f3383a]'
        />
        <StatBlock
          icon={<IconHeart className='h-7.25 w-7.25' />}
          label='정신력'
          value={deltaMentality}
          positiveClass='text-[#4cf69c]'
          negativeClass='text-[#f3383a]'
        />
      </div>
    </div>
  );
}

function StatBlock({
  icon,
  label,
  value,
  positiveClass,
  negativeClass,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  positiveClass: string;
  negativeClass: string;
}) {
  const formatted = value > 0 ? `+${value}` : `${value}`;
  const colorClass = value >= 0 ? positiveClass : negativeClass;

  return (
    <div className='flex flex-col items-center gap-3 font-[NexonLv2Gothic]'>
      <div className='flex items-center gap-2'>
        <div className='text-white'>{icon}</div>
        <span className='text-sm font-medium text-white'>{label}</span>
      </div>
      <span className={cn('text-3xl font-bold', colorClass)}>{formatted}</span>
    </div>
  );
}
