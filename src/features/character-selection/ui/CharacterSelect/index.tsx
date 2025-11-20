import { useSelectCharacterSet } from '../../model/useSelectCharacterSet';
import type { SelectCharacterSetResultDto } from '@api/models/SelectCharacterSetResultDto';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@shared/lib/utils';
import type { CharacterSet } from '@entities/game-session';
import type { PlayingCharacter } from '@entities/game-session';
import { useSetBackground } from '@shared/background';
import GlassButton from '@shared/ui/GlassButton';
import Typography from '@shared/ui/Typography';

interface CharacterSelectProps {
  onNext: () => void;
  onBack: () => void;
  onSelectSuccess?: (result: {
    response: SelectCharacterSetResultDto;
    playingCharacters: PlayingCharacter[];
    groupName: string;
  }) => void;
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
  '김형빈과 이병철': {
    title: '김형빈과 이병철',
    // overview:
    //   '득근과 근손실 사이에서 살아가는 헴과 그를 따르는 병철. 극한 상황에서도 근손실을 막기 위해 고군분투한다.',
    characters: [
      {
        id: 'hem',
        name: '김형빈',
        age: '35세',
        stats: [
          { label: '체력', value: 'High' },
          { label: '정신력', value: 'Low' },
        ],
        description:
          '득근에 살고 근손실에 죽는 헬스 미친 자. 가오를 중시하고 매일 데리고 다니는 병철에게 헬스를 부리며 모든 것을 가르치려고 함.',
        traits:
          '※특징: 보기와 달리 허리디스크 진단을 받아 허리 통증을 달고 다닌다.',
        image: '/public/image/introImage/char_hb_intro.png',
        thumbnail: '/public/image/introImage/char_hb_intro.png',
      },
      {
        id: 'bang',
        name: '이병철',
        age: '29세',
        stats: [
          { label: '체력', value: 'Low' },
          { label: '정신력', value: 'Low' },
        ],
        description:
          '헴을 형님으로 모시고 있는 순박한 청년. 헴이 시키면 뭐든지 할 것 같지만 속으로는 눈물을 머금고 있다.',
        traits: '※특징: 야채를 싫어하고, 매번 헬스를 빼먹을 생각만 한다.',
        image: '/public/image/introImage/char_bc_intro.png',
        thumbnail: '/public/image/introImage/char_bc_intro.png',
      },
    ],
  },
  '정복순&진실이': {
    title: '정복순 & 진실이',
    // overview:
    //   '진실을 밝히기 위해 몸을 사리지 않는 기자 복순과, 냉철한 분석가 진실이의 조합.',
    characters: [
      {
        id: 'boksun',
        name: '정복순',
        age: '77세',
        stats: [
          { label: '체력', value: 'Low' },
          { label: '정신력', value: 'Very High' },
        ],
        description:
          '한 때 엄청나게 이름을 날리던 만신 무당. 지금은 재야에 은둔해 유기견 진실이와 함께 조용히 살고 있다. 인자한 미소 뒤에 엄청나게 날카로운 동자신을 모시고 있다.',
        traits: '※특징: 노환으로 몸이 쇠약하고 악몽을 자주 꾼다.',
        image: '/public/image/introImage/char_bs_intro.png',
        thumbnail: '/public/image/introImage/char_bs_intro.png',
      },
      {
        id: 'jinsil',
        name: '진실이',
        age: '7세, 말티즈(♀︎)',
        stats: [
          { label: '체력', value: 'Normal' },
          { label: '정신력', value: 'Normal' },
        ],
        description:
          '할머니 앞에서는 천사견, 다른 사람 앞에선 까칠 포악 그 자체인 강아지. 하지만 간식 앞에서는 한 마리의 순한 양(?)처럼 변한다.',
        traits: '※특징: 특별히 아픈 곳은 없지만 기분을 잘 맞춰줘야 한다.',
        image: '/public/image/introImage/char_js_intro.png',
        thumbnail: '/public/image/introImage/char_js_intro.png',
      },
    ],
  },
  '소재옥&문예원': {
    title: '소재옥 & 문예원',
    // overview:
    //   '현장 경험 풍부한 기사 소재옥과 드론 엔지니어 문예원이 만드는 즉석 생존 키트.',
    characters: [
      {
        id: 'sojaeok',
        name: '소재옥',
        age: '25세',
        stats: [
          { label: '체력', value: 'Normal' },
          { label: '정신력', value: 'Low' },
        ],
        description:
          '카메라 앞에서는 세상 다정한 스윗함을 보여주지만 실제로는 시청자 수와 반응에 예민하고 강박이 있다. 여자친구와의 일상을 기록하려 유튜브 <소문커플>을 시작했지만 지금은 인플루언서 병에 걸렸다.',
        traits:
          '※특징: 조금 긴장하거나 당황하면 과민성대장증후군으로 화장실이 급해진다.',
        image: '/public/image/introImage/char_jo_intro.png',
        thumbnail: '/public/image/introImage/char_jo_intro.png',
      },
      {
        id: 'munyewon',
        name: '문예원',
        age: '23세',
        stats: [
          { label: '체력', value: 'Low' },
          { label: '정신력', value: 'High' },
        ],
        description:
          '유튜브 브이로그에서는 귀엽고 애교 많은 소녀. 하지만 방송을 끄면 누구보다 대담하고 털털하다. 재욱이 자존심을 상하게 만들면 불같이 화를 낸다.',
        traits:
          '※특징: 발목을 다친 적이 있어 오래 걷거나 무거운 물건을 들면 통증에 시달린다.',
        image: '/public/image/introImage/char_yw_intro.png',
        thumbnail: '/public/image/introImage/char_yw_intro.png',
      },
    ],
  },
  '방미리&류재호': {
    title: '방미리 & 류재호',
    // overview:
    //   '우연히 마주친 두 사람이 재난 속에서 서로를 의지하게 되는 성장 스토리.',
    characters: [
      {
        id: 'bangmiri',
        name: '방미리',
        age: '28세',
        stats: [
          { label: '체력', value: 'Normal' },
          { label: '정신력', value: 'High' },
        ],
        description:
          '대기업 마트 본사에 최연소 팀장으로 승진한 일잘러. MBTI J 끝판왕으로 어디서나 계획하고, 기획하고, 정리하려는 강박을 가지고 있다.',
        traits: '※특징: 자기 관리 강박증으로 방문 횟수가 많은 편이다.',
        image: '/public/image/introImage/char_mr_intro.png',
        thumbnail: '/public/image/introImage/char_mr_intro.png',
      },
      {
        id: 'ryujaeho',
        name: '류재호',
        age: '32세',
        stats: [
          { label: '체력', value: 'High' },
          { label: '정신력', value: 'Normal' },
        ],
        description:
          '대한민국 최고 수재만 간다는 대학교, 아이비리그 대학원 출신이자 재벌 3세. 대학원 졸업 후 귀국하자마자 아버지 회사의 마트 본사 본부장이 되었다. 9살 때 당한 큰 사고로 어릴 적에 대한 기억이 없다.',
        traits:
          '※특징: 만성 비염 환자로 온도차가 심한 환경에서는 재채기를 하거나 코가 꽉 막힌다.',
        image: '/public/image/introImage/char_jh_intro.png',
        thumbnail: '/public/image/introImage/char_jh_intro.png',
      },
    ],
  },
};

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
    <div className='flex h-full w-full text-white'>
      <aside className='w-[220px] py-6'>
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

      <main className='flex flex-1 flex-col'>
        <div className='flex flex-1 gap-16 px-16'>
          <div className='relative flex flex-1 items-center justify-center px-20'>
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
          </div>

          <div className='flex w-[410] flex-col gap-8'>
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
          </div>
        </div>
      </main>
    </div>
  );
}
