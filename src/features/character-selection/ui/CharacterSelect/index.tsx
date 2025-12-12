import { useSelectCharacterSet } from '../../model/useSelectCharacterSet';
import type { SelectCharacterSetResultDto } from '@api/models/SelectCharacterSetResultDto';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@shared/lib/utils';
import type { CharacterSet } from '@entities/game-session';
import type { PlayingCharacter } from '@entities/game-session';
import { useSetBackground } from '@shared/background';
import GlassButton from '@shared/ui/GlassButton';
import Typography from '@shared/ui/Typography';
import { usePreloadAssets } from '@shared/preload-assets';
import {
  type CharacterPairDetail,
  createCharacterSetsFromDetails,
  getCharacterPairDetailByName,
} from '../../model/characterPairDetails';
import { BackgroundPortal } from '@shared/background-portal';
import { useButtonClickSfx } from '@shared/audio';

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
    defaultSrc: '/image/charSelect/char_select_hb_bc.png',
    selectedSrc: '/image/charSelect/char_selected_hb_bc.png',
    alt: '김형빈과 이병철 선택 탭',
  },
  '정복순&진실이': {
    defaultSrc: '/image/charSelect/char_select_bs_js.png',
    selectedSrc: '/image/charSelect/char_selected_bs_js.png',
    alt: '정복순과 진실이 선택 탭',
  },
  '소재욱&문예원': {
    defaultSrc: '/image/charSelect/char_select_jw_yw.png',
    selectedSrc: '/image/charSelect/char_selected_jw_yw.png',
    alt: '소재욱과 문예원 선택 탭',
  },
  '방미리&류재호': {
    defaultSrc: '/image/charSelect/char_select_mr_jh.png',
    selectedSrc: '/image/charSelect/char_selected_mr_jh.png',
    alt: '방미리와 류재호 선택 탭',
  },
};

const LOCAL_CHARACTER_SETS: CharacterSet[] = createCharacterSetsFromDetails();

const CHARACTER_SELECT_ASSETS: string[] = [
  '/image/charSelect/char_select_hb_bc.png',
  '/image/charSelect/char_selected_hb_bc.png',
  '/image/charSelect/char_select_bs_js.png',
  '/image/charSelect/char_selected_bs_js.png',
  '/image/charSelect/char_select_jw_yw.png',
  '/image/charSelect/char_selected_jw_yw.png',
  '/image/charSelect/char_select_mr_jh.png',
  '/image/charSelect/char_selected_mr_jh.png',
  '/image/charSelect/pair_default_hb.png',
  '/image/charSelect/pair_active_hb.png',
  '/image/charSelect/pair_default_bc.png',
  '/image/charSelect/pair_active_bc.png',
  '/image/charSelect/pair_default_bs.png',
  '/image/charSelect/pair_active_bs.png',
  '/image/charSelect/pair_default_js.png',
  '/image/charSelect/pair_active_js.png',
  '/image/charSelect/pair_default_jw.png',
  '/image/charSelect/pair_active_jw.png',
  '/image/charSelect/pair_default_yw.png',
  '/image/charSelect/pair_active_yw.png',
  '/image/charSelect/pair_default_mr.png',
  '/image/charSelect/pair_active_mr.png',
  '/image/charSelect/pair_default_jh.png',
  '/image/charSelect/pair_active_jh.png',
  '/image/charSelect/char_hb_stat.svg',
  '/image/charSelect/char_bc_stat.svg',
  '/image/charSelect/char_bs_stat.svg',
  '/image/charSelect/char_js_stat.svg',
  '/image/charSelect/char_jw_stat.svg',
  '/image/charSelect/char_yw_stat.svg',
  '/image/charSelect/char_mr_stat.svg',
  '/image/charSelect/char_jh_stat.svg',
];

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
    sojaewook: 'jw',
    munyewon: 'yw',
    bangmiri: 'mr',
    ryujaeho: 'jh',
  };

  const initial = idToInitial[characterId.toLowerCase()];
  if (!initial) return null;

  return `/image/charSelect/char_${initial}_stat.svg`;
}

/**
 * 캐릭터 ID를 페어 이미지 경로로 변환
 */
function getCharacterPairImagePath(
  characterId: string | undefined,
  isActive: boolean
): string | null {
  if (!characterId) return null;

  // 캐릭터 ID를 이미지 이니셜로 매핑
  const idToInitial: Record<string, string> = {
    hem: 'hb',
    bang: 'bc',
    boksun: 'bs',
    jinsil: 'js',
    sojaewook: 'jw',
    munyewon: 'yw',
    bangmiri: 'mr',
    ryujaeho: 'jh',
  };

  const initial = idToInitial[characterId.toLowerCase()];
  if (!initial) return null;

  const type = isActive ? 'active' : 'default';
  return `/image/charSelect/pair_${type}_${initial}.png`;
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
        code: set.name,
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
  usePreloadAssets(CHARACTER_SELECT_ASSETS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(
    null
  );
  const playCharacterSetButtonClick = useButtonClickSfx({
    variant: 'waterDrop',
  });

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
    <div className='pointer-events-auto flex h-dvh w-dvw translate-0 text-white'>
      <BackgroundPortal>
        <div className='absolute top-8 right-0 z-201 h-19 w-277'>
          <img
            src='/image/charSelect/char_select_page_header.svg'
            alt='캐릭터 선택'
            className='h-full w-full object-fill'
          />
        </div>
      </BackgroundPortal>
      {/* 좌측: 캐릭터 셋 선택 */}
      <aside className='flex h-full w-160 flex-col'>
        <div className='mt-8 flex w-full flex-col justify-items-start gap-1'>
          {characterSets.map((set, index) => {
            const isActive = index === currentIndex;
            const tabAssets = CHARACTER_TAB_IMAGES[set.name];
            const fallbackSrc = isActive
              ? (tabAssets?.selectedSrc ?? tabAssets?.defaultSrc)
              : tabAssets?.defaultSrc;
            return (
              <button
                key={set.id}
                onClick={() => {
                  playCharacterSetButtonClick();
                  setCurrentIndex(index);
                }}
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
      <main className='relative flex flex-1 items-center justify-center'>
        {activeCharacter?.image ? (
          <img
            src={activeCharacter.image}
            alt={activeCharacter.name}
            className='fixed bottom-0 h-[80dvh] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]'
          />
        ) : (
          <div className='flex h-237 w-140 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white/40'>
            이미지 준비 중
          </div>
        )}
        <div className='pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-20'>
          <GlassButton
            onClick={handleSelectComplete}
            disabled={currentSet?.isLocked || isSelecting}
            className={cn(
              'pointer-events-auto h-30 w-145 text-white transition-all',
              currentSet?.isLocked ? 'opacity-70' : ''
            )}
          >
            <Typography variant='h4-b' className='text-sm'>
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
      <aside className='scrollbar-hide mr-[calc(50dvw-50dvh*16/9)] flex h-full w-160 flex-col justify-center gap-4 overflow-y-auto pr-5 pl-20'>
        <div className='flex flex-col gap-3'>
          {activeCharacter ? (
            <>
              <div className='flex items-baseline gap-3'>
                <Typography variant='h4-eb'>
                  | {activeCharacter.name}
                </Typography>
                {activeCharacter.age && (
                  <Typography variant='body'>{activeCharacter.age}</Typography>
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
          <p className='text-sm leading-relaxed whitespace-pre-line'>
            {pairDetail.overview}
          </p>
        )}

        <Typography variant='body-3-r' className='h-40'>
          {activeCharacter?.description}
        </Typography>

        <Typography variant='body-3-r' className='h-20'>
          {activeCharacter?.traits}
        </Typography>

        <div className='flex w-full items-start justify-between'>
          <div>
            <Typography variant='caption'>플레이어 페어</Typography>
            <div className='mt-3 flex gap-3'>
              {pairDetail.characters.map(character => {
                const isActive = character.id === activeCharacter?.id;
                const pairImage = getCharacterPairImagePath(
                  character.id,
                  isActive
                );

                return (
                  <button
                    key={character.id}
                    onClick={() => {
                      playCharacterSetButtonClick();
                      setActiveCharacterId(character.id);
                    }}
                    className={cn(
                      'relative h-37 w-37 overflow-hidden transition-all',
                      isActive ? 'shadow-[0_0_22px_rgba(255,255,255,0.35)]' : ''
                    )}
                  >
                    {pairImage ? (
                      <img
                        src={pairImage}
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
