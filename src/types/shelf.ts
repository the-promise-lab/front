export interface ShelfItem {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface Shelf {
  id: string;
  name: string;
  backgroundImage: string;
  shelfItems: ShelfItem[];
}
