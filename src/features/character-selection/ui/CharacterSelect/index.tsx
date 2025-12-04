import { useSelectCharacterSet } from '../../model/useSelectCharacterSet';
import type { SelectCharacterSetResultDto } from '@api/models/SelectCharacterSetResultDto';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@shared/lib/utils';
import type { CharacterSet } from '@entities/game-session';
import type { PlayingCharacter } from '@entities/game-session';
import { useSetBackground } from '@shared/background';
import GlassButton from '@shared/ui/GlassButton';
import Typography from '@shared/ui/Typography';
import {
  type CharacterPairDetail,
  createCharacterSetsFromDetails,
  getCharacterPairDetailByName,
} from '../../model/characterPairDetails';
import { BackgroundPortal } from '@shared/background-portal';

interface CharacterSelectProps {
  onNext: () => void;
  onBack: () => void;
  onSelectSuccess?: (result: {
    response: SelectCharacterSetResultDto;
    playingCharacters: PlayingCharacter[];
    groupName: string;
  }) => void;
}

const CHARACTER_TAB_IMAGES: Record<
  string,
  { defaultSrc: string; selectedSrc: string; alt: string }
> = {
  '김형빈과 이병철': {
    defaultSrc: '/image/charSelect/char_select_hb_bc.svg',
    selectedSrc: '/image/charSelect/char_selected_hb_bc.svg',
    alt: '김형빈과 이병철 선택 탭',
  },
  '정복순&진실이': {
    defaultSrc: '/image/charSelect/char_select_bs_js.svg',
    selectedSrc: '/image/charSelect/char_selected_bs_js.svg',
    alt: '정복순과 진실이 선택 탭',
  },
  '소재옥&문예원': {
    defaultSrc: '/image/charSelect/char_select_jo_yw.svg',
    selectedSrc: '/image/charSelect/char_selected_jo_yw.svg',
    alt: '소재옥과 문예원 선택 탭',
  },
  '방미리&류재호': {
    defaultSrc: '/image/charSelect/char_select_mr_jh.svg',
    selectedSrc: '/image/charSelect/char_selected_mr_jh.svg',
    alt: '방미리와 류재호 선택 탭',
  },
};

const LOCAL_CHARACTER_SETS: CharacterSet[] = createCharacterSetsFromDetails();

/**
 * 캐릭터 ID를 스탯 이미지 경로로 변환
 */
function getCharacterStatImagePath(
  characterId: string | undefined
): string | null {
  if (!characterId) return null;

  // 캐릭터 ID를 스탯 이미지 이니셜로 매핑
  const idToInitial: Record<string, string> = {
    hem: 'hb',
    bang: 'bc',
    boksun: 'bs',
    jinsil: 'js',
    sojaeok: 'jo',
    munyewon: 'yw',
    bangmiri: 'mr',
    ryujaeho: 'jh',
  };

  const initial = idToInitial[characterId.toLowerCase()];
  if (!initial) return null;

  return `/image/charSelect/char_${initial}_stat.svg`;
}

function createPairDetail(set?: CharacterSet): CharacterPairDetail {
  if (!set) {
    return {
      groupId: 0,
      title: '캐릭터',
      nameVariants: [],
      overview: '캐릭터 정보를 불러오지 못했습니다.',
      characters: [],
    };
  }

  const detail = getCharacterPairDetailByName(set.name);
  if (detail) {
    return detail;
  }

  return {
    groupId: Number(set.id),
    title: set.name,
    nameVariants: [set.name],
    overview: set.description || '캐릭터 설명이 준비되어 있지 않습니다.',
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
  onBack: _onBack,
  onSelectSuccess,
}: CharacterSelectProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(
    null
  );
  useSetBackground({
    image: '/shelter-bg.png',
    className: 'backdrop-blur-[100px]',
  });

  const characterSets = LOCAL_CHARACTER_SETS;

  const { mutate: selectCharacter, isPending: isSelecting } =
    useSelectCharacterSet({
      onSuccess: result => {
        onSelectSuccess?.(result);
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
    <div className='grid h-full w-full grid-cols-[220px_1fr_410px] text-white'>
      <BackgroundPortal>
        <div className='absolute top-11 right-0 z-201'>
          <img
            src='/image/charSelect/char_select_page_header.svg'
            alt='캐릭터 선택'
            className='h-[19px] w-[277px]'
          />
        </div>
      </BackgroundPortal>
      {/* 좌측: 캐릭터 셋 선택 */}
      <aside className='flex h-full flex-col py-6'>
        <div className='flex w-full flex-col justify-items-start gap-1'>
          {characterSets.map((set, index) => {
            const isActive = index === currentIndex;
            const tabAssets = CHARACTER_TAB_IMAGES[set.name];
            const fallbackSrc = isActive
              ? (tabAssets?.selectedSrc ?? tabAssets?.defaultSrc)
              : tabAssets?.defaultSrc;
            return (
              <button
                key={set.id}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'group relative rounded-3xl border border-transparent py-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
                  isActive ? 'ring-0' : 'hover:border-white/15'
                )}
              >
                {fallbackSrc ? (
                  <div className='flex w-full justify-start'>
                    <img
                      src={fallbackSrc}
                      alt={tabAssets?.alt ?? set.name}
                      className={cn(
                        'h-[80px] object-contain transition-transform duration-200 ease-out',
                        isActive ? 'scale-[1.1]' : 'scale-100'
                      )}
                    />
                  </div>
                ) : (
                  <span className='block px-6 py-3 text-left text-base font-semibold text-white'>
                    {set.name}
                  </span>
                )}
                <span className='sr-only'>{set.name}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* 가운데: 캐릭터 이미지 */}
      <main className='relative flex items-center justify-center'>
        {activeCharacter?.image ? (
          <img
            src={activeCharacter.image}
            alt={activeCharacter.name}
            className='max-h-[540px] min-h-[400px] min-w-[200px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]'
          />
        ) : (
          <div className='flex h-[140px] w-[140px] items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white/40'>
            이미지 준비 중
          </div>
        )}
        <div className='pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-10'>
          <GlassButton
            onClick={handleSelectComplete}
            disabled={currentSet?.isLocked || isSelecting}
            className={cn(
              'pointer-events-auto px-14 py-6 text-white transition-all',
              currentSet?.isLocked ? 'opacity-70' : ''
            )}
          >
            <Typography variant='h4-b'>
              {isSelecting
                ? '선택 중...'
                : currentSet?.isLocked
                  ? '공개 예정'
                  : '선택 완료'}
            </Typography>
          </GlassButton>
        </div>
      </main>

      {/* 우측: 캐릭터 정보 */}
      <aside className='flex h-full flex-col gap-8 overflow-y-auto py-6 pr-16'>
        <div className='flex flex-col gap-3'>
          <span className='text-sm font-semibold text-white/40'>
            {/* {pairDetail.title} */}
          </span>
          {activeCharacter ? (
            <>
              <div className='flex items-baseline gap-3'>
                <span className='text-lg font-extrabold tracking-tight'>
                  {activeCharacter.name}
                </span>
                {activeCharacter.age && (
                  <span className='text-lg text-white/60'>
                    {activeCharacter.age}
                  </span>
                )}
              </div>
              {activeCharacter?.id ? (
                <div className='mt-4'>
                  {(() => {
                    const statImagePath = getCharacterStatImagePath(
                      activeCharacter.id
                    );
                    return statImagePath ? (
                      <img
                        src={statImagePath}
                        alt={`${activeCharacter.name} 스탯`}
                        className='h-33 w-83 object-contain'
                      />
                    ) : null;
                  })()}
                </div>
              ) : null}
            </>
          ) : null}
        </div>

        {pairDetail.overview && (
          <p className='text-sm leading-relaxed whitespace-pre-line text-white/70'>
            {pairDetail.overview}
          </p>
        )}

        {activeCharacter?.description && (
          <p className='text-[10px] leading-relaxed whitespace-pre-line text-white/80'>
            {activeCharacter.description}
          </p>
        )}

        {activeCharacter?.traits && (
          <p className='text-[10px] whitespace-pre-line text-white/50'>
            {activeCharacter.traits}
          </p>
        )}

        <div className='flex w-full items-start justify-between'>
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
        </div>
      </aside>
    </div>
  );
}
