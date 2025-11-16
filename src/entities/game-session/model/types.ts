/**
 * 게임 세션 도메인 모델
 * API 응답과 독립적인 비즈니스 로직용 타입
 */

export interface Character {
  id: number;
  name: string;
  fullImage: string;
  thumbnailImage: string;
  colors: {
    backgroundColor: string;
    borderColor: string;
  };
}

export interface CharacterSet {
  id: number;
  name: string;
  image: string;
  description: string;
  isLocked?: boolean;
}

export interface PlayingCharacter {
  id: number;
  characterId: number;
  currentHp: number | null;
  currentSp: number | null;
  name: string | null;
  fullImage: string | null;
  profileImage: string | null;
  colors: {
    backgroundColor: string | null;
    borderColor: string | null;
  } | null;
}

export interface PlayingCharacterSet {
  id: number;
  characterGroupId: number;
  playingCharacters: Array<PlayingCharacter>;
}

export interface InventorySlot {
  id: number;
  itemId: number;
  quantity: number;
}

export interface Inventory {
  id: number;
  bagId: number;
  slots: Array<InventorySlot>;
}

export interface Bag {
  id: number;
  name: string;
  description: string;
  image: string;
  capacity: number;
}

export interface GameSession {
  id: number;
  userId: number;
  currentActId: number | null;
  playingCharacterSet: PlayingCharacterSet | null;
  inventories: Array<Inventory>;
  selectedBag?: Bag;
}
