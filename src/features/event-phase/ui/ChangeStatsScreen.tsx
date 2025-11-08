import NoticeBanner from './kit/NoticeBanner';
import { IconHeart, IconLightning } from '@shared/ui/icons';
import { cn } from '@shared/lib/utils';
import type { ReactNode } from 'react';
import Counter from '@shared/ui/Counter';
import Typography from '@shared/ui/Typography';
import { useEffect, useState } from 'react';
import type { Character } from '@features/character-selection';

interface CharacterResult {
  name: string;
  deltaHp: number; // 체력 변화
  deltaMentality: number; // 정신력 변화
}

interface ChangeStatsScreenProps {
  characters: Character[];
}

export default function ChangeStatsScreen({
  characters,
}: ChangeStatsScreenProps) {
  const [previousStats, setPreviousStats] = useState<
    Record<string, { hp: number; mentality: number }>
  >({});
  const [results, setResults] = useState<CharacterResult[]>([]);

  // 서버에서 내려온 전역 상태의 스탯 변화량 계산
  useEffect(() => {
    // characters가 없으면 빈 결과 반환
    if (!characters || characters.length === 0) {
      setResults([]);
      return;
    }

    if (Object.keys(previousStats).length === 0) {
      // 첫 렌더링 시 이전 스탯 저장 (서버에서 받은 스탯값 기준)
      const initialStats: Record<string, { hp: number; mentality: number }> =
        {};
      characters.forEach(character => {
        const name = character.name;
        initialStats[name] = {
          hp: character.currentHp,
          mentality: character.currentSp,
        };
      });
      setPreviousStats(initialStats);

      // 첫 렌더링 시 변화량 0으로 초기화
      const initialResults: CharacterResult[] = characters.map(character => ({
        name: character.name,
        deltaHp: 0,
        deltaMentality: 0,
      }));
      setResults(initialResults);
      return;
    }

    // 서버에서 업데이트된 스탯과 이전 스탯 비교하여 변화량 계산
    const currentResults: CharacterResult[] = characters.map(character => {
      const name = character.name;
      const previous = previousStats[name];
      if (!previous) {
        return {
          name,
          deltaHp: 0,
          deltaMentality: 0,
        };
      }

      // 서버에서 내려온 현재 스탯 - 이전 스탯 = 변화량
      const deltaHp = character.currentHp - previous.hp;
      const deltaMentality = character.currentSp - previous.mentality;

      return {
        name,
        deltaHp,
        deltaMentality,
      };
    });

    setResults(currentResults);

    // 현재 스탯을 이전 스탯으로 저장 (다음 변화량 계산을 위해)
    const newPreviousStats: Record<string, { hp: number; mentality: number }> =
      {};
    characters.forEach(character => {
      const name = character.name;
      newPreviousStats[name] = {
        hp: character.currentHp,
        mentality: character.currentSp,
      };
    });
    setPreviousStats(newPreviousStats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characters]);

  // TODO: API 준비되면 서버에서 받은 스탯값으로 전역 상태 업데이트
  // 현재는 전역 상태의 스탯 변화량을 표시 (서버에서 업데이트되면 자동 반영)

  // 전역 상태에 데이터가 없거나 변화량이 모두 0일 때 더미 데이터 표시 (API 없을 때)
  const displayResults =
    results.length > 0 &&
    results.some(r => r.deltaHp !== 0 || r.deltaMentality !== 0)
      ? results
      : [
          { name: '헴', deltaHp: +9, deltaMentality: -9 },
          { name: '병철', deltaHp: +9, deltaMentality: -9 },
        ];

  return (
    <NoticeBanner>
      <div className='flex flex-col items-center gap-9'>
        {displayResults.map(r => (
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
  const colorClass = value >= 0 ? positiveClass : negativeClass;

  return (
    <div className='flex flex-col items-center gap-3 font-[NexonLv2Gothic]'>
      <div className='flex items-center gap-2'>
        <div className='text-white'>{icon}</div>
        <Typography variant='subtitle-1-m' className='text-white'>
          {label}
        </Typography>
      </div>
      <Typography variant='h2-b' className={cn(colorClass)}>
        {value >= 0 ? '+' : '-'}
        <Counter
          value={Math.abs(value)}
          springOptions={{ damping: 100, stiffness: 200 }}
        />
      </Typography>
    </div>
  );
}
