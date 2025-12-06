export interface CharacterStat {
  label: string;
  value: string;
}

export interface CharacterDetail {
  id: string;
  name: string;
  aliases?: string[];
  age?: string;
  stats?: CharacterStat[];
  description?: string;
  traits?: string;
  image?: string;
  thumbnail?: string;
}

export interface CharacterPairDetail {
  groupId: number;
  title: string;
  nameVariants: string[];
  overview?: string;
  characters: CharacterDetail[];
}

export const CHARACTER_DETAILS: CharacterDetail[] = [];

export const CHARACTER_PAIR_DETAILS: CharacterPairDetail[] = [
  {
    groupId: 1,
    title: '김형빈과 이병철',
    nameVariants: ['김형빈과 이병철', '헴과 병철'],
    characters: [
      {
        id: 'hem',
        name: '형빈',
        aliases: [
          '헴',
          'Char_hem',
          'char_hem',
          'Char_ham',
          'char_ham',
          'Char_hb',
          'char_hb',
          'ham',
          'HAM',
          'hem',
          'HEM',
          '형빈',
        ],
        age: '35세',
        stats: [
          { label: '체력', value: 'High' },
          { label: '정신력', value: 'Low' },
        ],
        description:
          '득근에 살고 근손실에 죽는 헬스 미친 자. 가오를 중시하고 매일 데리고 다니는 병철에게 헬스를 부리며 모든 것을 가르치려고 함.',
        traits:
          '※특징: 보기와 달리 허리디스크 진단을 받아 허리 통증을 달고 다닌다.',
        image: '/image/introPage/char_hb_intro.svg',
        thumbnail: '/image/introPage/char_hb_intro.svg',
      },
      {
        id: 'bang',
        name: '병철',
        aliases: [
          '병철',
          'Char_bang',
          'char_bang',
          'Char_bc',
          'char_bc',
          'bang',
          'BANG',
          '이병철',
        ],
        age: '29세',
        stats: [
          { label: '체력', value: 'Low' },
          { label: '정신력', value: 'Low' },
        ],
        description:
          '헴을 형님으로 모시고 있는 순박한 청년. 헴이 시키면 뭐든지 할 것 같지만 속으로는 눈물을 머금고 있다.',
        traits: '※특징: 야채를 싫어하고, 매번 헬스를 빼먹을 생각만 한다.',
        image: '/image/introPage/char_bc_intro.svg',
        thumbnail: '/image/introPage/char_bc_intro.svg',
      },
    ],
  },
  {
    groupId: 2,
    title: '정복순&진실이',
    nameVariants: ['정복순&진실이'],
    characters: [
      {
        id: 'boksun',
        name: '복순',
        aliases: [
          '복순',
          'char_boksoon',
          'Char_boksoon',
          'char_bs',
          'Char_bs',
          'boksoon',
          'BOKSOON',
          '정복순',
        ],
        age: '77세',
        stats: [
          { label: '체력', value: 'Low' },
          { label: '정신력', value: 'Very High' },
        ],
        description:
          '한 때 엄청나게 이름을 날리던 만신 무당. 지금은 재야에 은둔해 유기견 진실이와 함께 조용히 살고 있다. 인자한 미소 뒤에 엄청나게 날카로운 동자신을 모시고 있다.',
        traits: '※특징: 노환으로 몸이 쇠약하고 악몽을 자주 꾼다.',
        image: '/image/introPage/char_bs_intro.svg',
        thumbnail: '/image/introPage/char_bs_intro.svg',
      },
      {
        id: 'jinsil',
        name: '진실이',
        aliases: [
          '진실',
          'char_js',
          'Char_js',
          'char_dog',
          'Char_dog',
          'jinsil',
          'JINSIL',
        ],
        age: '7세, 말티즈(♀︎)',
        stats: [
          { label: '체력', value: 'Normal' },
          { label: '정신력', value: 'Normal' },
        ],
        description:
          '할머니 앞에서는 천사견, 다른 사람 앞에선 까칠 포악 그 자체인 강아지. 하지만 간식 앞에서는 한 마리의 순한 양(?)처럼 변한다.',
        traits: '※특징: 특별히 아픈 곳은 없지만 기분을 잘 맞춰줘야 한다.',
        image: '/image/introPage/char_js_intro.svg',
        thumbnail: '/image/introPage/char_js_intro.svg',
      },
    ],
  },
  {
    groupId: 3,
    title: '소재옥&문예원',
    nameVariants: ['소재옥&문예원'],
    characters: [
      {
        id: 'sojaeok',
        name: '재옥',
        aliases: [
          '재옥',
          'char_zewook',
          'Char_zewook',
          'char_jo',
          'Char_jo',
          'zewook',
          'ZEWOOK',
          'sojaeok',
          'SOJAEOK',
        ],
        age: '25세',
        stats: [
          { label: '체력', value: 'Normal' },
          { label: '정신력', value: 'Low' },
        ],
        description:
          '카메라 앞에서는 세상 다정한 스윗함을 보여주지만 실제로는 시청자 수와 반응에 예민하고 강박이 있다. 여자친구와의 일상을 기록하려 유튜브 <소문커플>을 시작했지만 지금은 인플루언서 병에 걸렸다.',
        traits:
          '※특징: 조금 긴장하거나 당황하면 과민성대장증후군으로 화장실이 급해진다.',
        image: '/image/introPage/char_jo_intro.svg',
        thumbnail: '/image/introPage/char_jo_intro.svg',
      },
      {
        id: 'munyewon',
        name: '예원',
        aliases: [
          '예원',
          'char_yewon',
          'Char_yewon',
          'char_yw',
          'Char_yw',
          'yewon',
          'YEWON',
        ],
        age: '23세',
        stats: [
          { label: '체력', value: 'Low' },
          { label: '정신력', value: 'High' },
        ],
        description:
          '유튜브 브이로그에서는 귀엽고 애교 많은 소녀. 하지만 방송을 끄면 누구보다 대담하고 털털하다. 재욱이 자존심을 상하게 만들면 불같이 화를 낸다.',
        traits:
          '※특징: 발목을 다친 적이 있어 오래 걷거나 무거운 물건을 들면 통증에 시달린다.',
        image: '/image/introPage/char_yw_intro.svg',
        thumbnail: '/image/introPage/char_yw_intro.svg',
      },
    ],
  },
  {
    groupId: 4,
    title: '방미리&류재호',
    nameVariants: ['방미리&류재호'],
    characters: [
      {
        id: 'bangmiri',
        name: '미리',
        aliases: [
          '미리',
          'char_miri',
          'Char_miri',
          'char_mr',
          'Char_mr',
          'miri',
          'MIRI',
        ],
        age: '28세',
        stats: [
          { label: '체력', value: 'Normal' },
          { label: '정신력', value: 'High' },
        ],
        description:
          '대기업 마트 본사에 최연소 팀장으로 승진한 일잘러. MBTI J 끝판왕으로 어디서나 계획하고, 기획하고, 정리하려는 강박을 가지고 있다.',
        traits: '※특징: 자기 관리 강박증으로 방문 횟수가 많은 편이다.',
        image: '/image/introPage/char_mr_intro.svg',
        thumbnail: '/image/introPage/char_mr_intro.svg',
      },
      {
        id: 'ryujaeho',
        name: '재호',
        aliases: [
          '재호',
          'char_jeaho',
          'Char_jeaho',
          'char_jh',
          'Char_jh',
          'jeaho',
          'JEAHO',
        ],
        age: '32세',
        stats: [
          { label: '체력', value: 'High' },
          { label: '정신력', value: 'Normal' },
        ],
        description:
          '대한민국 최고 수재만 간다는 대학교, 아이비리그 대학원 출신이자 재벌 3세. 대학원 졸업 후 귀국하자마자 아버지 회사의 마트 본사 본부장이 되었다. 9살 때 당한 큰 사고로 어릴 적에 대한 기억이 없다.',
        traits:
          '※특징: 만성 비염 환자로 온도차가 심한 환경에서는 재채기를 하거나 코가 꽉 막힌다.',
        image: '/image/introPage/char_jh_intro.svg',
        thumbnail: '/image/introPage/char_jh_intro.svg',
      },
    ],
  },
];

const detailByName = new Map<string, CharacterPairDetail>();
const detailByGroupId = new Map<number, CharacterPairDetail>();
const characterByName = new Map<string, CharacterDetail>();

CHARACTER_PAIR_DETAILS.forEach(detail => {
  detailByGroupId.set(detail.groupId, detail);
  detail.nameVariants.forEach(name => detailByName.set(name, detail));
  detail.characters.forEach(character => {
    const keys = [character.name, ...(character.aliases ?? [])];
    keys.forEach(key => {
      if (key) {
        characterByName.set(key, character);
      }
    });
  });
});

export function getCharacterPairDetailByName(
  name?: string | null
): CharacterPairDetail | null {
  if (!name) return null;
  return detailByName.get(name) ?? null;
}

export function getCharacterPairDetailByGroupId(
  groupId?: number | null
): CharacterPairDetail | null {
  if (!groupId) return null;
  return detailByGroupId.get(groupId) ?? null;
}

export function getCharacterDetailByName(
  name?: string | null
): CharacterDetail | null {
  if (!name) return null;
  return characterByName.get(name) ?? null;
}

export function getCharacterDetailByCode(
  code?: string | null
): CharacterDetail | null {
  return getCharacterDetailByName(code);
}
