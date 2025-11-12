import { useSelectCharacterSet } from '../../model/useSelectCharacterSet';
import type { SelectCharacterSetResultDto } from '@api/models/SelectCharacterSetResultDto';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@shared/lib/utils';
import type { CharacterSet } from '@entities/game-session';

interface CharacterSelectProps {
  onNext: () => void;
  onBack: () => void;
  onSelectSuccess?: (response: SelectCharacterSetResultDto) => void;
}

type CharacterStat = {
  label: string;
  value: string;
};

interface CharacterDetail {
  id: string;
  name: string;
  age: string;
  stats: CharacterStat[];
  description: string;
  traits?: string;
  image?: string;
  thumbnail?: string;
}

interface CharacterPairDetail {
  title: string;
  overview?: string;
  characters: CharacterDetail[];
}

const CHARACTER_PAIR_DETAILS: Record<string, CharacterPairDetail> = {
  '헴과 병철': {
    title: '헴과 병철',
    overview:
      '득근과 근손실 사이에서 살아가는 헴과 그를 따르는 병철. 극한 상황에서도 근손실을 막기 위해 고군분투한다.',
    characters: [
      {
        id: 'hem',
        name: '헴',
        age: '35세',
        stats: [
          { label: '체력', value: 'High' },
          { label: '정신력', value: 'Low' },
        ],
        description:
          '득근에 살고 근손실에 죽는 헬스 미친 자. 가오를 중시하고 매일 데리고 다니는 병철에게 헬스를 부리며 모든 것을 가르치려고 함.',
        traits:
          '※특징: 보기와 달리 허리디스크 진단을 받아 허리 통증을 달고 다닌다.',
        image: '/public/캐릭터선택창헴.png',
        thumbnail: '/public/캐릭터선택창헴.png',
      },
      {
        id: 'bang',
        name: '병철',
        age: '29세',
        stats: [
          { label: '체력', value: 'Mid' },
          { label: '정신력', value: 'Mid' },
        ],
        description:
          '헴을 형님으로 모시고 있는 순박한 청년. 헴이 시키면 뭐든지 할 것 같지만 속으로는 눈물을 머금고 있다.',
        traits: '※특징: 야채를 싫어하고, 매번 헬스를 빼먹을 생각만 한다.',
        image: '/public/캐릭터선택창뱅철.png',
        thumbnail: '/public/캐릭터선택창뱅철.png',
      },
    ],
  },
  '정복순&진실이': {
    title: '정복순 & 진실이',
    overview:
      '진실을 밝히기 위해 몸을 사리지 않는 기자 복순과, 냉철한 분석가 진실이의 조합.',
    characters: [
      {
        id: 'boksun',
        name: '정복순',
        age: '32세',
        stats: [
          { label: '체력', value: 'Mid' },
          { label: '정신력', value: 'High' },
        ],
        description:
          '집요한 추적과 강단으로 사건을 끝까지 파고드는 베테랑 기자. 재난 속에서도 진실을 밝혀내려 한다.',
        image: '',
        thumbnail: '',
      },
      {
        id: 'jinsil',
        name: '진실이',
        age: '27세',
        stats: [
          { label: '체력', value: 'Low' },
          { label: '정신력', value: 'High' },
        ],
        description:
          '데이터 분석 전문가. 복순이 놓치는 단서를 찾아내 팀의 생존 확률을 높인다.',
        image: '',
        thumbnail: '',
      },
    ],
  },
  '소재옥&문예원': {
    title: '소재옥 & 문예원',
    overview:
      '현장 경험 풍부한 기사 소재옥과 드론 엔지니어 문예원이 만드는 즉석 생존 키트.',
    characters: [
      {
        id: 'sojaeok',
        name: '소재옥',
        age: '41세',
        stats: [
          { label: '체력', value: 'High' },
          { label: '정신력', value: 'Mid' },
        ],
        description:
          '무너지는 구조물 속에서도 침착하게 장비를 수리하는 베테랑 기사.',
        image: '',
        thumbnail: '',
      },
      {
        id: 'munyewon',
        name: '문예원',
        age: '33세',
        stats: [
          { label: '체력', value: 'Mid' },
          { label: '정신력', value: 'High' },
        ],
        description: '드론과 로봇을 활용해 정찰과 구조를 담당하는 엔지니어.',
        image: '',
        thumbnail: '',
      },
    ],
  },
  '방미리&류재호': {
    title: '방미리 & 류재호',
    overview:
      '우연히 마주친 두 사람이 재난 속에서 서로를 의지하게 되는 성장 스토리.',
    characters: [
      {
        id: 'bangmiri',
        name: '방미리',
        age: '28세',
        stats: [
          { label: '체력', value: 'Low' },
          { label: '정신력', value: 'Mid' },
        ],
        description: '분위기 메이커지만 위기 상황에서 쉽게 겁먹는 평범한 시민.',
        image: '',
        thumbnail: '',
      },
      {
        id: 'ryujaeho',
        name: '류재호',
        age: '30세',
        stats: [
          { label: '체력', value: 'Mid' },
          { label: '정신력', value: 'Mid' },
        ],
        description:
          '책임감 강한 회사원. 방미리를 지키기 위해 자신을 단련한다.',
        image: '',
        thumbnail: '',
      },
    ],
  },
};

const LOCAL_CHARACTER_SETS: CharacterSet[] = Object.entries(
  CHARACTER_PAIR_DETAILS
).map(([name, detail], index) => ({
  id: index + 1,
  name,
  image: detail.characters[0]?.image || '',
  description: detail.overview || '',
  isLocked: index > 0,
}));

function createPairDetail(set?: CharacterSet): CharacterPairDetail {
  if (!set) {
    return {
      title: '캐릭터',
      overview: '캐릭터 정보를 불러오지 못했습니다.',
      characters: [],
    };
  }

  const detail = CHARACTER_PAIR_DETAILS[set.name];
  if (detail) {
    return detail;
  }

  return {
    title: set.name,
    overview: set.description,
    characters: [
      {
        id: `${set.id}-primary`,
        name: set.name,
        age: '',
        stats: [],
        description:
          set.description || '캐릭터 세부 정보가 준비되어 있지 않습니다.',
        image: set.image,
        thumbnail: set.image,
      },
    ],
  };
}

export default function CharacterSelect({
  onNext,
  onBack,
  onSelectSuccess,
}: CharacterSelectProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(
    null
  );

  const characterSets = LOCAL_CHARACTER_SETS;

  const { mutate: selectCharacter, isPending: isSelecting } =
    useSelectCharacterSet({
      onSuccess: ({ response }) => {
        onSelectSuccess?.(response);
        onNext();
      },
      onError: (error: Error) => {
        console.error('[CharacterSelect] 캐릭터 선택 실패:', error);
        alert(`캐릭터 선택 실패: ${error.message}`);
      },
    });

  const currentSet = characterSets[currentIndex] ?? null;
  const pairDetail = useMemo(() => createPairDetail(currentSet), [currentSet]);

  useEffect(() => {
    if (pairDetail.characters.length > 0) {
      setActiveCharacterId(pairDetail.characters[0].id);
    } else {
      setActiveCharacterId(null);
    }
  }, [pairDetail]);

  const activeCharacter =
    pairDetail.characters.find(char => char.id === activeCharacterId) ??
    pairDetail.characters[0] ??
    null;

  const handleSelectComplete = () => {
    if (currentSet && !currentSet.isLocked) {
      selectCharacter({
        characterGroupId: Number(currentSet.id),
        groupName: currentSet.name,
      });
    }
  };

  if (characterSets.length === 0) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#0c0f15] text-white/70'>
        사용 가능한 캐릭터가 없습니다.
      </div>
    );
  }

  return (
    <div className='flex h-screen w-screen bg-[#0c0f15] text-white'>
      <aside className='w-[260px] border-r border-white/10 px-10 py-16'>
        <div className='flex flex-col gap-4'>
          <div className='w-full justify-start'>
            <button
              onClick={onBack}
              className='rounded-full px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white'
            >
              ←
            </button>
          </div>
          <div className='flex flex-col gap-8'>
            {characterSets.map((set, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={set.id}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'rounded-full px-6 py-3 text-left text-base font-semibold transition-all',
                    isActive
                      ? 'border border-white/40 bg-white/10 text-white shadow-[0_0_24px_rgba(255,255,255,0.15)]'
                      : 'border border-transparent text-white/55 hover:border-white/20 hover:text-white'
                  )}
                >
                  {set.name}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <main className='flex flex-1 flex-col'>
        <header className='flex items-center justify-between px-12 py-8'>
          <div className='text-sm text-white/40'>
            {pairDetail.characters.length > 0
              ? `${pairDetail.characters.length} PLAYERS`
              : '준비중'}
          </div>
        </header>

        <div className='flex flex-1 items-center gap-16 px-16 pb-12'>
          <div className='flex flex-1 items-center justify-center'>
            {activeCharacter?.image ? (
              <img
                src={activeCharacter.image}
                alt={activeCharacter.name}
                className='max-h-[540px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]'
              />
            ) : (
              <div className='flex h-[200px] w-[200px] items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white/40'>
                이미지 준비 중
              </div>
            )}
          </div>

          <div className='flex w-[420px] flex-col gap-8'>
            <div className='flex flex-col gap-3'>
              <span className='text-sm font-semibold text-white/40'>
                {pairDetail.title}
              </span>
              {activeCharacter ? (
                <>
                  <div className='flex items-baseline gap-3'>
                    <span className='text-xl font-extrabold tracking-tight'>
                      {activeCharacter.name}
                    </span>
                    {activeCharacter.age && (
                      <span className='text-lg text-white/60'>
                        {activeCharacter.age}
                      </span>
                    )}
                  </div>
                  {activeCharacter.stats.length > 0 && (
                    <div className='flex gap-3'>
                      {activeCharacter.stats.map(stat => (
                        <div
                          key={`${activeCharacter.id}-${stat.label}`}
                          className='flex flex-col rounded-2xl border border-white/15 bg-white/5 px-5 py-3'
                        >
                          <span className='text-xs font-semibold tracking-wide text-white/40 uppercase'>
                            {stat.label}
                          </span>
                          <span className='text-lg font-bold text-white'>
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : null}
            </div>

            {pairDetail.overview && (
              <p className='text-sm leading-relaxed whitespace-pre-line text-white/70'>
                {pairDetail.overview}
              </p>
            )}

            {activeCharacter?.description && (
              <p className='text-sm leading-relaxed whitespace-pre-line text-white/80'>
                {activeCharacter.description}
              </p>
            )}

            {activeCharacter?.traits && (
              <p className='text-xs whitespace-pre-line text-white/50'>
                {activeCharacter.traits}
              </p>
            )}

            <div className='flex h-full w-full items-end justify-between'>
              <div>
                <div className='text-xs font-semibold tracking-[0.3em] text-white/40 uppercase'>
                  플레이어 페어
                </div>
                <div className='mt-3 flex gap-3'>
                  {pairDetail.characters.map(character => {
                    const isActive = character.id === activeCharacter?.id;
                    return (
                      <button
                        key={character.id}
                        onClick={() => setActiveCharacterId(character.id)}
                        className={cn(
                          'relative h-20 w-20 overflow-hidden rounded-2xl border transition-all',
                          isActive
                            ? 'border-white shadow-[0_0_22px_rgba(255,255,255,0.35)]'
                            : 'border-white/15 hover:border-white/30'
                        )}
                      >
                        {character.thumbnail ? (
                          <img
                            src={character.thumbnail}
                            alt={character.name}
                            className='h-full w-full object-cover'
                          />
                        ) : (
                          <div className='flex h-full w-full items-center justify-center bg-white/10 text-sm text-white/60'>
                            ?
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className='flex items-center justify-center gap-6 pb-12'>
                <button
                  onClick={handleSelectComplete}
                  disabled={currentSet?.isLocked || isSelecting}
                  className={cn(
                    'rounded-full px-16 py-4 text-base font-semibold transition-all',
                    currentSet?.isLocked
                      ? 'cursor-not-allowed border border-white/10 bg-white/5 text-white/40'
                      : 'bg-gradient-to-r from-[#ff956c] to-[#ff6363] text-white shadow-[0_12px_30px_rgba(255,99,99,0.35)] hover:shadow-[0_20px_50px_rgba(255,99,99,0.45)] active:scale-95'
                  )}
                >
                  {isSelecting
                    ? '선택 중...'
                    : currentSet?.isLocked
                      ? '공개 예정'
                      : '선택 완료'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
