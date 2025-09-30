// src/processes/game-flow/data/dayFlowData.ts
// DAY_FLOW 이벤트 데이터

import type { DayFlowEvent, DayStep } from '../types';

export const dayFlowEvents: DayFlowEvent[] = [
  // PLACE_SCREEN - 장소 화면
  {
    id: 1,
    dayStep: 'PLACE_SCREEN',
    eventData: {
      id: 1,
      title: '대피소',
      descriptions: [
        '당신은 대피소에 도착했습니다.',
        '이곳에서 하루를 보내게 될 것입니다.',
        '준비가 되면 시작하세요.',
      ],
      image: '/shelter-bg.png',
    },
  },

  // WARNING_BEFORE_START - 시작 전 주의사항
  {
    id: 2,
    dayStep: 'WARNING_BEFORE_START',
    eventData: {
      id: 2,
      title: '주의사항',
      descriptions: [
        '게임을 시작하기 전에 주의사항을 확인해주세요.',
        '선택에 따라 스토리가 달라질 수 있습니다.',
        '신중하게 선택하세요.',
      ],
      image: '/warning-bg.png',
    },
  },

  // DAY_SCREEN - DAY 화면
  {
    id: 3,
    dayStep: 'DAY_SCREEN',
    eventData: {
      id: 3,
      title: 'Day 1',
      descriptions: [
        '첫 번째 날이 시작됩니다.',
        '오늘 하루 어떤 일이 일어날까요?',
        '준비되면 클릭하세요.',
      ],
      image: '/day-bg.png',
    },
  },

  // RANDOM_EVENT_STORY - 스토리형 랜덤 이벤트
  {
    id: 4,
    dayStep: 'RANDOM_EVENT_STORY',
    eventData: {
      id: 4,
      title: '길에서 만난 사람',
      descriptions: [
        '대피소로 가는 길에 한 사람이 도움을 요청하고 있습니다.',
        '그는 부상을 입어 제대로 걷지 못하고 있습니다.',
        '당신은 어떻게 하시겠습니까?',
      ],
      image: '/story-event-bg.png',
      options: [
        {
          text: '지나간다',
          value: 'ignore',
          nextDayStep: 'RANDOM_EVENT_ITEM',
          statChanges: {
            mentality: -2,
            hp: 0,
          },
        },
        {
          text: '도와준다',
          value: 'help',
          nextDayStep: 'RANDOM_EVENT_ITEM',
          statChanges: {
            mentality: 3,
            hp: -5,
          },
        },
      ],
    },
  },

  // RANDOM_EVENT_ITEM - 아이템형 랜덤 이벤트
  {
    id: 5,
    dayStep: 'RANDOM_EVENT_ITEM',
    eventData: {
      id: 5,
      title: '아이템 선택',
      descriptions: [
        '대피소에서 필요한 물건을 선택하세요.',
        '각 아이템은 다른 효과를 가집니다.',
        '신중하게 선택하세요.',
      ],
      image: '/item-event-bg.png',
      candidateItems: ['닭가슴살', '담요', '생수'],
      changeStatsValue: {
        success: {
          mentality: -3,
          hp: 10,
        },
        fail: {
          mentality: -9,
          hp: -10,
        },
      },
    },
  },

  // CHANGE_STATS_SCREEN - 스탯 변화 화면
  {
    id: 6,
    dayStep: 'CHANGE_STATS_SCREEN',
    eventData: {
      id: 6,
      title: '스탯 변화',
      descriptions: [
        '선택한 아이템의 효과가 적용되었습니다.',
        '당신의 상태가 변경되었습니다.',
      ],
      image: '/stats-change-bg.png',
    },
  },

  // EVENT_RESULT_SCREEN - 이벤트 결과 화면
  {
    id: 7,
    dayStep: 'EVENT_RESULT_SCREEN',
    eventData: {
      id: 7,
      title: '이벤트 결과',
      descriptions: ['이벤트가 완료되었습니다.', '다음 이벤트로 진행하세요.'],
      image: '/event-result-bg.png',
    },
  },

  // SINGLE_PORTRAIT_SCREEN - 단일 초상화 화면
  {
    id: 8,
    dayStep: 'SINGLE_PORTRAIT_SCREEN',
    eventData: {
      id: 8,
      title: '단일 초상화',
      descriptions: ['캐릭터 초상화가 표시됩니다.', '다음으로 진행하세요.'],
      image: '/portrait-bg.png',
    },
  },
];

// 특정 DAY_STEP에 해당하는 이벤트 찾기
export const getEventByDayStep = (
  dayStep: DayStep
): DayFlowEvent | undefined => {
  return dayFlowEvents.find(event => event.dayStep === dayStep);
};

// 모든 이벤트 가져오기
export const getAllDayFlowEvents = (): DayFlowEvent[] => {
  return dayFlowEvents;
};
