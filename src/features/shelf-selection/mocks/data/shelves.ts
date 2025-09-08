import type { Shelf } from '@/features/shelf-selection/types/shelf';

/**
 * 음식코너 더미 데이터
 */
export const foodCornerShelf: Shelf = {
  id: 'food-corner',
  name: '음식코너',
  backgroundImage: '/shelf-food.png',
  shelfItems: [
    {
      id: '돼지고기',
      name: '돼지고기',
      x: 0.19,
      y: 0.335,
      quantity: 5,
      description: '구워먹고 싶은 돼지고기다.',
    },
    {
      id: '버터',
      name: '버터',
      x: 0.7,
      y: 0.5,
      quantity: 10,
      description: '느끼해보이는 버터다.',
    },
    {
      id: '감자',
      name: '감자',
      x: 0.46,
      y: 0.7,
      quantity: 20,
      description: '동글동글 햇감자다.',
    },
  ],
};

/**
 * 잡화코너 더미 데이터
 */
export const householdCornerShelf: Shelf = {
  id: 'household-corner',
  name: '잡화코너',
  backgroundImage: '/shelf-example.png',
  shelfItems: [
    {
      id: 'claw-hammer',
      name: '장도리',
      x: 0.295,
      y: 0.37,
      quantity: 1,
      description: '어딘가에 쓸모있어 보이는 장도리다.',
    },
    {
      id: 'tissue',
      name: '휴지',
      x: 0.73,
      y: 0.32,
      quantity: 5,
      description: '크리넥x 두루마리 휴지.',
    },
    {
      id: 'blanket',
      name: '담요',
      x: 0.548,
      y: 0.568,
      quantity: 2,
      description: '따뜻한 온기를 유지할 수 있는 포근한 담요.',
    },
  ],
};

/**
 * 의류코너 더미 데이터
 */
export const clothingCornerShelf: Shelf = {
  id: 'clothing-corner',
  name: '의류코너',
  backgroundImage: '/shelf-clothing.png',
  shelfItems: [
    {
      id: 'shirt',
      name: '반팔티',
      x: 0.3,
      y: 0.2,
      quantity: 3,
      description: '검은 무지 반팔티.',
    },
    {
      id: 'pants',
      name: '검정 니트',
      x: 0.6,
      y: 0.5,
      quantity: 3,
      description: '따뜻해보이는 니트.',
    },
    {
      id: 'socks',
      name: '청바지',
      x: 0.2,
      y: 0.7,
      quantity: 3,
      description: '빳빳해보이는 빈티지 청바지.',
    },
    {
      id: 'cap',
      name: '청자켓',
      x: 0.75,
      y: 0.15,
      quantity: 3,
      description: '시끄럽게 피곤해 하는 청자켓.',
    },
  ],
};

/**
 * 전체 선반 목록
 */
export const mockShelves: Shelf[] = [
  householdCornerShelf,
  foodCornerShelf,
  clothingCornerShelf,
];
