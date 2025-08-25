import type { Shelf, ShelfItem } from '@/types/shelf';

/**
 * 선반 아이템 생성 팩토리
 */
export function createShelfItem(
  id: string,
  name: string,
  x: number,
  y: number
): ShelfItem {
  return { id, name, x, y };
}

/**
 * 선반 생성 팩토리
 */
export function createShelf(
  id: string,
  name: string,
  backgroundImage: string,
  shelfItems: ShelfItem[] = []
): Shelf {
  return {
    id,
    name,
    backgroundImage,
    shelfItems,
  };
}
