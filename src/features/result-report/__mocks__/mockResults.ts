import type {
  CollectionCharacterSet,
  PlayReportData,
  RankingData,
} from '../model/types';

// ============================================
// Collection Mock 데이터
// ============================================

export const RESULT_COLLECTION_CHARACTER_SETS: CollectionCharacterSet[] = [
  {
    id: 1,
    name: '형빈과 병철',
    images: {
      active: '/image/reportPage/collection_hbbc_active.svg',
      disabled: '/image/reportPage/collection_hbbc_disabled.svg',
      default: '/image/reportPage/collection_hbbc_default.svg',
    },
    collectionCards: [
      {
        endingTitle: 'Happy: 사랑과 득근',
        endingThumbnailUrl: null,
      },
      {
        endingTitle: 'Happy: 땀은 물보다 진하다',
        endingThumbnailUrl: null,
      },
      {
        endingTitle: 'Hidden: 신기의 계승자',
        endingThumbnailUrl: null,
      },
      {
        endingTitle: 'Normal: 새로운 득근',
        endingThumbnailUrl: null,
      },
      {
        endingTitle: 'Normal: 끝나지 않는 운동',
        endingThumbnailUrl: null,
      },
    ],
  },
  {
    id: 2,
    name: '복순과 진실',
    images: {
      active: '/image/reportPage/collection_bsjs_active.svg',
      disabled: '/image/reportPage/collection_bsjs_disabled.svg',
      default: '/image/reportPage/collection_bsjs_default.svg',
    },
    collectionCards: [
      {
        endingTitle: 'Hidden: 신기의 계승자',
        endingThumbnailUrl: null,
      },
    ],
  },
  {
    id: 3,
    name: '재욱과 예원',
    images: {
      active: '/image/reportPage/collection_jwyw_active.svg',
      disabled: '/image/reportPage/collection_jwyw_disabled.svg',
      default: '/image/reportPage/collection_jwyw_default.svg',
    },
    collectionCards: [],
  },
  {
    id: 4,
    name: '미리와 재호',
    images: {
      active: '/image/reportPage/collection_mrjh_active.svg',
      disabled: '/image/reportPage/collection_mrjh_disabled.svg',
      default: '/image/reportPage/collection_mrjh_default.svg',
    },
    collectionCards: [],
  },
];

// ============================================
// PlayReport Mock 데이터
// ============================================

export const RESULT_PLAY_REPORT_DATA: PlayReportData = {
  endingTitle: 'Happy: 사랑과 득근',
  points: [
    {
      type: 'positive',
      label: 'Point 1',
      description:
        '물과 보온 용품을 준비하고, 심리적 안정을 위한 애착 물건을 챙기는 것은 극한 상황을 대비하는 훌륭한 전략입니다.',
    },
    {
      type: 'negative',
      label: 'Point 2',
      description:
        '재난 상황에서는 개인 특성에 맞춘 준비가 생존의 핵심입니다. 수면이 예민한 경우 귀마개나 수면 안대를, 시력이 나쁜 경우 여분의 안경 등을 챙겨 생존 확률을 높일 수 있습니다.',
    },
  ],
  characters: [
    { name: '형빈', health: 62, mental: 45, potential: 45 },
    { name: '병철', health: 62, mental: 45, potential: 45 },
  ],
  survivalBag: {
    ownerNames: '형빈, 병철',
    bagType: '여행용 백팩',
    usability: '중간',
    itemUsageRate: '80%',
    bagImage: '/bag.png',
    items: [
      {
        id: 'item-1',
        name: '생수',
        image: '/chicken-breast.png',
        state: 'default',
      },
      {
        id: 'item-2',
        name: '라면',
        image: '/chicken-breast.png',
        state: 'default',
      },
      {
        id: 'item-3',
        name: '손전등',
        image: '/chicken-breast.png',
        state: 'default',
      },
      {
        id: 'item-4',
        name: '담요',
        image: '/chicken-breast.png',
        state: 'default',
      },
      {
        id: 'item-5',
        name: '구급약',
        image: '/chicken-breast.png',
        state: 'default',
      },
    ],
  },
};

// ============================================
// Ranking Mock 데이터
// ============================================

export const RESULT_RANKING_DATA: RankingData = {
  myScore: {
    rank: 241,
    totalUsers: 3890,
    xp: 384,
  },
  characters: [
    { characterNames: '형빈과 병철', result: 'Happy' },
    { characterNames: '복순과 진실', result: 'Happy' },
    { characterNames: '재욱과 예원', result: 'Normal' },
    { characterNames: '미리와 재호', result: 'Bad' },
  ],
  rankings: [
    { rank: 1, nickname: '사용자 닉네임123', xp: 225710000 },
    { rank: 2, nickname: '사용자 닉네임123', xp: 25710000 },
    { rank: 3, nickname: '사용자 닉네임123', xp: 5710000 },
    { rank: 4, nickname: '사용자 닉네임123', xp: 710000 },
    { rank: 5, nickname: '사용자 닉네임123', xp: 10000 },
    { rank: 6, nickname: '사용자 닉네임123', xp: 9800 },
    { rank: 241, nickname: '사용자 닉네임123', xp: 384, isCurrentUser: true },
  ],
};
