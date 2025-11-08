// DEPRECATED: 서버 연동 후 사용하지 않음. 백업용으로만 유지

import type { CharacterSet } from '../../model/types';

/**
 * DEPRECATED: useCharacterGroups 훅 사용으로 대체됨
 * 이전 CharacterSet 타입 구조를 위한 mock 데이터
 */
export const mockCharacterSets: CharacterSet[] = [
  {
    id: 'hem-byeongcheol',
    name: '헴과 병철',
    image: '/group-hem-byeongcheol.png', // 그룹 대표 이미지
    description:
      '헴과 병철은 함께하는 친구입니다. 두 명이 함께 행동하며 서로를 도와갑니다.',
    isLocked: false,
  },
  {
    id: 'locked-character',
    name: '미공개 캐릭터',
    image: '/locked.png', // 잠금 이미지
    description: '곧 공개 예정입니다.',
    isLocked: true,
  },
];
