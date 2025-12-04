import type { ReactNode } from 'react';
import NoticeBanner from '@shared/ui/NoticeBanner';
import { IconHeart, IconLightning } from '@shared/ui/icons';
import { cn } from '@shared/lib/utils';
import Counter from '@shared/ui/Counter';
import Typography from '@shared/ui/Typography';
import type { ScenarioEvent, ScenarioEffect } from '../model/types';

interface StatusScreenProps {
  event: ScenarioEvent;
  onComplete?: () => void;
}

/**
 * Status 타입 이벤트 화면
 * 캐릭터 스탯 변화를 표시
 */
export default function StatusScreen({ event, onComplete }: StatusScreenProps) {
  const effects = event.effects ?? [];

  // 캐릭터별로 그룹화
  const effectsByCharacter = effects.reduce(
    (acc, effect) => {
      const code = effect.characterCode ?? 'unknown';
      if (!acc[code]) {
        acc[code] = [];
      }
      acc[code].push(effect);
      return acc;
    },
    {} as Record<string, ScenarioEffect[]>
  );

  const handleClick = () => {
    onComplete?.();
  };

  return (
    <div className='h-full w-full cursor-pointer' onClick={handleClick}>
      <NoticeBanner>
        <div className='flex flex-col items-center gap-9'>
          {Object.entries(effectsByCharacter).map(
            ([characterCode, charEffects]) => (
              <CharacterEffectRow
                key={characterCode}
                characterCode={characterCode}
                effects={charEffects}
              />
            )
          )}
        </div>
      </NoticeBanner>
    </div>
  );
}

interface CharacterEffectRowProps {
  characterCode: string;
  effects: ScenarioEffect[];
}

function CharacterEffectRow({
  characterCode,
  effects,
}: CharacterEffectRowProps) {
  const hpEffect = effects.find(e => e.effectType === 'hp');
  const mentalEffect = effects.find(e => e.effectType === 'mental');

  return (
    <div className='flex items-center gap-14'>
      <div className='flex h-35 w-35 items-center justify-center bg-white/10 text-white'>
        <span className='text-sm font-semibold'>{characterCode}</span>
      </div>
      <div className='flex items-center gap-14'>
        {hpEffect && (
          <StatBlock
            icon={<IconLightning className='h-7.25 w-7.25' />}
            label='체력'
            value={hpEffect.change ?? 0}
            positiveClass='text-[#4cf69c]'
            negativeClass='text-[#f3383a]'
          />
        )}
        {mentalEffect && (
          <StatBlock
            icon={<IconHeart className='h-7.25 w-7.25' />}
            label='정신력'
            value={mentalEffect.change ?? 0}
            positiveClass='text-[#4cf69c]'
            negativeClass='text-[#f3383a]'
          />
        )}
      </div>
    </div>
  );
}

interface StatBlockProps {
  icon: ReactNode;
  label: string;
  value: number;
  positiveClass: string;
  negativeClass: string;
}

function StatBlock({
  icon,
  label,
  value,
  positiveClass,
  negativeClass,
}: StatBlockProps) {
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
