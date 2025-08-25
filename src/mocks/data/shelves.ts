import type { Shelf } from '@/types/shelf';

/**
 * 음식코너 더미 데이터
 */
export const foodCornerShelf: Shelf = {
  id: 'food-corner',
  name: '음식코너',
  backgroundImage: '/shelf-food.png',
  shelfItems: [
    { id: '돼지고기', name: '돼지고기', x: 0.19, y: 0.335 },
    { id: '버터', name: '버터', x: 0.7, y: 0.5 },
    { id: '감자', name: '감자', x: 0.46, y: 0.7 },
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
    { id: 'claw-hammer', name: '장도리', x: 0.295, y: 0.37 },
    { id: 'tissue', name: '휴지', x: 0.73, y: 0.32 },
    { id: 'blanket', name: '담요', x: 0.548, y: 0.568 },
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
    { id: 'shirt', name: '반팔티', x: 0.3, y: 0.2 },
    { id: 'pants', name: '검정 니트', x: 0.6, y: 0.5 },
    { id: 'socks', name: '청바지', x: 0.2, y: 0.7 },
    { id: 'cap', name: '청자켓', x: 0.75, y: 0.15 },
  ],
};

/**
 * 전체 선반 목록
 */
export const mockShelves: Shelf[] = [
  foodCornerShelf,
  householdCornerShelf,
  clothingCornerShelf,
];
