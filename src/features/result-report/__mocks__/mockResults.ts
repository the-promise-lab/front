import type {
  CollectionCharacterSet,
  HistoryItem,
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
        endingTitle: 'HAPPY: 사랑과 득근',
        endingThumbnailUrl: null,
      },
      {
        endingTitle: 'HAPPY: 땀은 물보다 진하다',
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
  ending: {
    id: 1,
    title: '사랑과 득근',
    grade: 'HAPPY',
    image: '/image/reportPage/ending_happy.png',
  },
  sessionMetadata: {
    id: 1,
    userName: '형빈',
    characterGroupCode: 'hb',
    characterGroupName: '형빈',
    status: 'PLAYING',
    createdAt: '2025-01-01',
    lifePoint: 100,
  },
  experiencePointsTotal: 1000,
  points: [
    {
      type: 'GOOD',
      label: 'Point 1',
      description:
        '물과 보온 용품을 준비하고, 심리적 안정을 위한 애착 물건을 챙기는 것은 극한 상황을 대비하는 훌륭한 전략입니다.',
    },
    {
      type: 'BAD',
      label: 'Point 2',
      description:
        '재난 상황에서는 개인 특성에 맞춘 준비가 생존의 핵심입니다. 수면이 예민한 경우 귀마개나 수면 안대를, 시력이 나쁜 경우 여분의 안경 등을 챙겨 생존 확률을 높일 수 있습니다.',
    },
  ],
  characters: [
    {
      name: '형빈',
      finalHealth: 62,
      finalMental: 45,
      potential: 45,
      characterCode: 'hb',
      maxHealth: 100,
      maxMental: 100,
      survivalStatus: 'ALIVE',
    },
    {
      name: '병철',
      finalHealth: 62,
      finalMental: 45,
      potential: 45,
      characterCode: 'bc',
      maxHealth: 100,
      maxMental: 100,
      survivalStatus: 'ALIVE',
    },
  ],
  survivalBag: {
    ownerNames: '형빈, 병철',
    bagName: '여행용 백팩',
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
    { characterNames: '형빈과 병철', result: 'GOOD' },
    { characterNames: '복순과 진실', result: 'GOOD' },
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

// ============================================
// History Mock 데이터
// ============================================

export const RESULT_HISTORY_ITEMS: HistoryItem[] = [
  {
    id: '1',
    characterName: '형빈과 병철',
    resultType: 'Hidden',
    xp: 210000,
    date: '25.09.22',
    time: '23:12',
    playReport: RESULT_PLAY_REPORT_DATA,
  },
  {
    id: '2',
    characterName: '복순과 진실',
    resultType: 'GOOD',
    xp: 185000,
    date: '25.09.21',
    time: '14:35',
    playReport: {
      ending: {
        id: 2,
        title: '땀은 물보다 진하다',
        grade: 'HAPPY',
        image: '/image/reportPage/ending_good.png',
      },
      sessionMetadata: {
        id: 2,
        userName: '복순',
        characterGroupCode: 'bs',
        characterGroupName: '복순',
        status: 'PLAYING',
        createdAt: '2025-01-01',
        lifePoint: 100,
      },
      experiencePointsTotal: 1000,
      points: [
        {
          type: 'GOOD',
          label: 'Point 1',
          description:
            '물과 보온 용품을 준비하고, 심리적 안정을 위한 애착 물건을 챙기는 것은 극한 상황을 대비하는 훌륭한 전략입니다.',
        },
        {
          type: 'GOOD',
          label: 'Point 2',
          description:
            '팀원들과의 협력을 통해 위기 상황을 효과적으로 극복했습니다.',
        },
      ],
      characters: [
        {
          name: '복순',
          finalHealth: 78,
          finalMental: 65,
          potential: 55,
          characterCode: 'bs',
          maxHealth: 100,
          maxMental: 100,
          survivalStatus: 'ALIVE',
        },
        {
          name: '진실',
          finalHealth: 72,
          finalMental: 58,
          potential: 48,
          characterCode: 'js',
          maxHealth: 100,
          maxMental: 100,
          survivalStatus: 'ALIVE',
        },
      ],
      survivalBag: {
        ownerNames: '복순, 진실',
        bagName: '등산용 배낭',
        usability: '높음',
        itemUsageRate: '92%',
        bagImage: '/bag.png',
        items: [],
      },
    },
  },
  {
    id: '3',
    characterName: '재욱과 예원',
    resultType: 'Normal',
    xp: 120000,
    date: '25.09.20',
    time: '09:22',
    playReport: {
      ending: {
        id: 3,
        title: '각자의 길',
        grade: 'NORMAL',
        image: '/image/reportPage/ending_normal.png',
      },
      sessionMetadata: {
        id: 3,
        userName: '재욱',
        characterGroupCode: 'jw',
        characterGroupName: '재욱',
        status: 'PLAYING',
        createdAt: '2025-01-01',
        lifePoint: 100,
      },
      experiencePointsTotal: 1000,
      points: [
        {
          type: 'GOOD',
          label: 'Point 1',
          description: '기본적인 생존 물자를 잘 준비했습니다.',
        },
        {
          type: 'BAD',
          label: 'Point 2',
          description:
            '일부 중요한 의료 용품을 챙기지 못해 어려움을 겪었습니다.',
        },
      ],
      characters: [
        {
          name: '재욱',
          finalHealth: 55,
          finalMental: 42,
          potential: 38,
          characterCode: 'jw',
          maxHealth: 100,
          maxMental: 100,
          survivalStatus: 'ALIVE',
        },
        {
          name: '예원',
          finalHealth: 48,
          finalMental: 52,
          potential: 42,
          characterCode: 'yw',
          maxHealth: 100,
          maxMental: 100,
          survivalStatus: 'ALIVE',
        },
      ],
      survivalBag: {
        ownerNames: '재욱, 예원',
        bagName: '캐리어',
        usability: '낮음',
        itemUsageRate: '65%',
        bagImage: '/bag.png',
        items: [],
      },
    },
  },
  {
    id: '4',
    characterName: '미리와 재호',
    resultType: 'Bad',
    xp: 45000,
    date: '25.09.19',
    time: '18:45',
    playReport: {
      ending: {
        id: 4,
        title: '공포의 근손실',
        grade: 'BAD',
        image: '/image/reportPage/ending_bad.png',
      },
      sessionMetadata: {
        id: 4,
        userName: '미리',
        characterGroupCode: 'mr',
        characterGroupName: '미리',
        status: 'PLAYING',
        createdAt: '2025-01-01',
        lifePoint: 100,
      },
      experiencePointsTotal: 1000,
      points: [
        {
          type: 'BAD',
          label: 'Point 1',
          description:
            '충분한 식량을 준비하지 못해 체력이 급격히 저하되었습니다.',
        },
        {
          type: 'BAD',
          label: 'Point 2',
          description:
            '정신적 압박을 이겨내지 못하고 포기하는 선택을 했습니다.',
        },
      ],
      characters: [
        {
          name: '미리',
          finalHealth: 25,
          finalMental: 18,
          potential: 22,
          characterCode: 'mr',
          maxHealth: 100,
          maxMental: 100,
          survivalStatus: 'ALIVE',
        },
        {
          name: '재호',
          finalHealth: 32,
          finalMental: 28,
          potential: 25,
          characterCode: 'jh',
          maxHealth: 100,
          maxMental: 100,
          survivalStatus: 'ALIVE',
        },
      ],
      survivalBag: {
        ownerNames: '미리, 재호',
        bagName: '손가방',
        usability: '매우 낮음',
        itemUsageRate: '35%',
        bagImage: '/bag.png',
        items: [],
      },
    },
  },
  {
    id: '5',
    characterName: '형빈과 병철',
    resultType: 'GOOD',
    xp: 198000,
    date: '25.09.18',
    time: '21:10',
    playReport: RESULT_PLAY_REPORT_DATA,
  },
  {
    id: '6',
    characterName: '복순과 진실',
    resultType: 'Normal',
    xp: 95000,
    date: '25.09.17',
    time: '16:30',
    playReport: {
      ending: {
        id: 5,
        title: '새로운 시작',
        grade: 'NORMAL',
        image: '/image/reportPage/ending_normal.png',
      },
      sessionMetadata: {
        id: 5,
        userName: '복순',
        characterGroupCode: 'bs',
        characterGroupName: '복순',
        status: 'PLAYING',
        createdAt: '2025-01-01',
        lifePoint: 100,
      },
      experiencePointsTotal: 1000,
      points: [
        {
          type: 'GOOD',
          label: 'Point 1',
          description: '침착하게 상황을 분석하고 대응했습니다.',
        },
        {
          type: 'BAD',
          label: 'Point 2',
          description: '일부 선택에서 최적의 판단을 내리지 못했습니다.',
        },
      ],
      characters: [
        {
          name: '복순',
          finalHealth: 58,
          finalMental: 52,
          potential: 48,
          characterCode: 'bs',
          maxHealth: 100,
          maxMental: 100,
          survivalStatus: 'ALIVE',
        },
        {
          name: '진실',
          finalHealth: 62,
          finalMental: 48,
          potential: 45,
          characterCode: 'js',
          maxHealth: 100,
          maxMental: 100,
          survivalStatus: 'ALIVE',
        },
      ],
      survivalBag: {
        ownerNames: '복순, 진실',
        bagName: '스포츠 백',
        usability: '중간',
        itemUsageRate: '72%',
        bagImage: '/bag.png',
        items: [],
      },
    },
  },
  {
    id: '7',
    characterName: '재욱과 예원',
    resultType: 'Hidden',
    xp: 250000,
    date: '25.09.16',
    time: '11:55',
    playReport: {
      ending: {
        id: 6,
        title: '신기의 계승자',
        grade: 'HIDDEN',
        image: '/image/reportPage/ending_hidden.png',
      },
      sessionMetadata: {
        id: 6,
        userName: '재욱',
        characterGroupCode: 'jw',
        characterGroupName: '재욱',
        status: 'PLAYING',
        createdAt: '2025-01-01',
        lifePoint: 100,
      },
      experiencePointsTotal: 1000,
      points: [
        {
          type: 'GOOD',
          label: 'Point 1',
          description: '숨겨진 비밀을 발견하고 특별한 엔딩에 도달했습니다.',
        },
        {
          type: 'GOOD',
          label: 'Point 2',
          description: '모든 선택지에서 최적의 판단을 내렸습니다.',
        },
      ],
      characters: [
        {
          name: '재욱',
          finalHealth: 85,
          finalMental: 78,
          potential: 92,
          characterCode: 'jw',
          maxHealth: 100,
          maxMental: 100,
          survivalStatus: 'ALIVE',
        },
        {
          name: '예원',
          finalHealth: 82,
          finalMental: 85,
          potential: 88,
          characterCode: 'yw',
          maxHealth: 100,
          maxMental: 100,
          survivalStatus: 'ALIVE',
        },
      ],
      survivalBag: {
        ownerNames: '재욱, 예원',
        bagName: '전술 배낭',
        usability: '매우 높음',
        itemUsageRate: '98%',
        bagImage: '/bag.png',
        items: [],
      },
    },
  },
  {
    id: '8',
    characterName: '미리와 재호',
    resultType: 'Normal',
    xp: 88000,
    date: '25.09.15',
    time: '08:20',
    playReport: {
      ending: {
        id: 7,
        title: '끝나지 않는 여정',
        grade: 'NORMAL',
        image: '/image/reportPage/ending_normal.png',
      },
      sessionMetadata: {
        id: 7,
        userName: '미리',
        characterGroupCode: 'mr',
        characterGroupName: '미리',
        status: 'PLAYING',
        createdAt: '2025-01-01',
        lifePoint: 100,
      },
      experiencePointsTotal: 1000,
      points: [
        {
          type: 'GOOD',
          label: 'Point 1',
          description: '포기하지 않고 끝까지 도전했습니다.',
        },
        {
          type: 'BAD',
          label: 'Point 2',
          description: '초반 실수로 인해 자원 관리에 어려움을 겪었습니다.',
        },
      ],
      characters: [
        {
          name: '미리',
          finalHealth: 52,
          finalMental: 48,
          potential: 42,
          characterCode: 'mr',
          maxHealth: 100,
          maxMental: 100,
          survivalStatus: 'ALIVE',
        },
        {
          name: '재호',
          finalHealth: 55,
          finalMental: 52,
          potential: 45,
          characterCode: 'jh',
          maxHealth: 100,
          maxMental: 100,
          survivalStatus: 'ALIVE',
        },
      ],
      survivalBag: {
        ownerNames: '미리, 재호',
        bagName: '일반 백팩',
        usability: '중간',
        itemUsageRate: '68%',
        bagImage: '/bag.png',
        items: [],
      },
    },
  },
  {
    id: '9',
    characterName: '형빈과 병철',
    resultType: 'Bad',
    xp: 32000,
    date: '25.09.14',
    time: '19:40',
    playReport: {
      ending: {
        id: 8,
        title: '병원 속 그림자',
        grade: 'BAD',
        image: '/image/reportPage/ending_bad.png',
      },
      sessionMetadata: {
        id: 8,
        userName: '형빈',
        characterGroupCode: 'hb',
        characterGroupName: '형빈',
        status: 'PLAYING',
        createdAt: '2025-01-01',
        lifePoint: 100,
      },
      experiencePointsTotal: 1000,
      points: [
        {
          type: 'BAD',
          label: 'Point 1',
          description: '위험한 장소에서 탈출하지 못했습니다.',
        },
        {
          type: 'BAD',
          label: 'Point 2',
          description: '공포에 질려 잘못된 선택을 했습니다.',
        },
      ],
      characters: [
        {
          name: '형빈',
          finalHealth: 18,
          finalMental: 12,
          potential: 15,
          characterCode: 'hb',
          maxHealth: 100,
          maxMental: 100,
          survivalStatus: 'ALIVE',
        },
        {
          name: '병철',
          finalHealth: 22,
          finalMental: 18,
          potential: 20,
          characterCode: 'bc',
          maxHealth: 100,
          maxMental: 100,
          survivalStatus: 'ALIVE',
        },
      ],
      survivalBag: {
        ownerNames: '형빈, 병철',
        bagName: '비닐봉투',
        usability: '매우 낮음',
        itemUsageRate: '25%',
        bagImage: '/bag.png',
        items: [],
      },
    },
  },
  {
    id: '10',
    characterName: '복순과 진실',
    resultType: 'GOOD',
    xp: 175000,
    date: '25.09.13',
    time: '13:25',
    playReport: {
      ending: {
        id: 9,
        title: '새벽의 희망',
        grade: 'HAPPY',
        image: '/image/reportPage/ending_good.png',
      },
      sessionMetadata: {
        id: 9,
        userName: '형빈',
        characterGroupCode: 'hb',
        characterGroupName: '형빈',
        status: 'PLAYING',
        createdAt: '2025-01-01',
        lifePoint: 100,
      },
      experiencePointsTotal: 1000,
      points: [
        {
          type: 'GOOD',
          label: 'Point 1',
          description: '어려운 상황에서도 희망을 잃지 않았습니다.',
        },
        {
          type: 'GOOD',
          label: 'Point 2',
          description: '서로를 돕고 협력하여 위기를 극복했습니다.',
        },
      ],
      characters: [
        {
          name: '복순',
          finalHealth: 75,
          finalMental: 72,
          potential: 68,
          characterCode: 'bs',
          maxHealth: 100,
          maxMental: 100,
          survivalStatus: 'ALIVE',
        },
        {
          name: '진실',
          finalHealth: 78,
          finalMental: 68,
          potential: 65,
          characterCode: 'js',
          maxHealth: 100,
          maxMental: 100,
          survivalStatus: 'ALIVE',
        },
      ],
      survivalBag: {
        ownerNames: '복순, 진실',
        bagName: '캠핑 백팩',
        usability: '높음',
        itemUsageRate: '88%',
        bagImage: '/bag.png',
        items: [],
      },
    },
  },
];
