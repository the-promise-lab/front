export interface StoreSection {
  id: number;
  name: string;
  backgroundImage: string;
}

export interface Item {
  id: number;
  name: string;
  image: string;
  capacityCost: number;
  isConsumable: boolean;
  storeSection: string;
  isVisable: boolean;
  itemCategoryId: number;
  necessity: number;
  position: {
    x: number;
    y: number;
  };
}

export interface ShelfItem {
  id: string;
  name: string;
  x: number;
  y: number;
  quantity: number;
  description: string;
}

export interface Shelf {
  id: string;
  name: string;
  backgroundImage: string;
  shelfItems: ShelfItem[];
}
