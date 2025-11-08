// src/features/character-selection/__mocks__/data/characters.ts
// 캐릭터 목 데이터

import type { CharacterSet } from '../../model/types';

export const mockCharacterSets: CharacterSet[] = [
  {
    id: 'hem-byeongcheol',
    name: '헴과 병철',
    characters: [
      {
        id: 'hem',
        name: '헴',
        image: '/헴.svg',
        description: '헴과 병철은 함께하는 친구입니다.',
        characteristics: {
          strength: 5,
          intelligence: 6,
          agility: 5,
          luck: 5,
        },
        specialAbility: '병철과 함께하면 더 강해집니다',
        colors: {
          backgroundColor: '#593B8F',
          borderColor: '#CC92FB',
        },
      },
      {
        id: 'byeongcheol',
        name: '병철',
        image: '/뱅철.svg',
        description: '헴과 병철은 함께하는 친구입니다.',
        characteristics: {
          strength: 5,
          intelligence: 6,
          agility: 5,
          luck: 5,
        },
        specialAbility: '헴과 함께하면 더 강해집니다',
        colors: {
          backgroundColor: '#5B707E',
          borderColor: '#5B707E',
        },
      },
    ],
    description:
      '헴과 병철은 함께하는 친구입니다. 두 명이 함께 행동하며 서로를 도와갑니다.',
    specialAbility: '함께하면 더 강해집니다',
    isLocked: false,
  },
  {
    id: 'locked-character',
    name: '미공개 캐릭터',
    characters: [],
    description: '곧 공개 예정입니다.',
    specialAbility: '???',
    isLocked: true,
  },
];
