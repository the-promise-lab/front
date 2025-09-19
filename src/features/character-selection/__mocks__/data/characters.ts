// src/features/character-selection/__mocks__/data/characters.ts
// 캐릭터 목 데이터

import type { Character } from '../../model/types';

export const mockCharacters: Character[] = [
  {
    id: 'character-1',
    name: '용감한 탐험가',
    image: '/api/placeholder/300/400',
    description: '모험을 두려워하지 않는 용감한 탐험가입니다.',
    characteristics: {
      strength: 8,
      intelligence: 6,
      agility: 7,
      luck: 5,
    },
    specialAbility: '위험 상황에서 체력 +20%',
  },
  {
    id: 'character-2',
    name: '현명한 전략가',
    image: '/api/placeholder/300/400',
    description: '신중하고 전략적인 사고를 하는 현명한 전략가입니다.',
    characteristics: {
      strength: 5,
      intelligence: 9,
      agility: 6,
      luck: 7,
    },
    specialAbility: '아이템 효율 +30%',
  },
  {
    id: 'character-3',
    name: '빠른 구원자',
    image: '/api/placeholder/300/400',
    description: '민첩하고 빠른 반응을 보이는 구원자입니다.',
    characteristics: {
      strength: 6,
      intelligence: 7,
      agility: 9,
      luck: 6,
    },
    specialAbility: '이동 속도 +25%',
  },
  {
    id: 'character-4',
    name: '운이 좋은 생존자',
    image: '/api/placeholder/300/400',
    description: '운이 좋아 위기를 모면하는 생존자입니다.',
    characteristics: {
      strength: 4,
      intelligence: 5,
      agility: 5,
      luck: 10,
    },
    specialAbility: '위험 회피 확률 +40%',
  },
  {
    id: 'character-5',
    name: '강인한 수호자',
    image: '/api/placeholder/300/400',
    description: '강인한 체력으로 팀을 수호하는 수호자입니다.',
    characteristics: {
      strength: 10,
      intelligence: 4,
      agility: 4,
      luck: 4,
    },
    specialAbility: '피해 감소 +35%',
  },
];
