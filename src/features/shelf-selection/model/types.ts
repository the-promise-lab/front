/**
 * 레거시 타입 정의
 * TODO: 백엔드 API 구조가 변경되면 이 타입들도 재검토 필요
 */

export interface ShelfItem {
  id: string;
  name: string;
  x: number;
  y: number;
  quantity: number;
  description: string;
}

export interface Shelf {
  id: number;
  name: string;
  backgroundImage: string;
  shelfItems: ShelfItem[];
}
