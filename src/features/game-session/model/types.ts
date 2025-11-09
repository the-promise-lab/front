/**
 * 게임 세션 도메인 모델
 * API 응답과 독립적인 비즈니스 로직용 타입
 */
export interface GameSession {
  id: number;
  userId: number;
  currentActId: number | null;
  playingCharacterSet: {
    id: number;
    characterGroupId: number;
    playingCharacters: Array<{
      id: number;
      characterId: number;
      currentHp: number;
      currentSp: number;
    }>;
  } | null;
  inventories: Array<{
    id: number;
    bagId: number;
    slots: Array<{
      id: number;
      itemId: number;
      quantity: number;
    }>;
  }>;
}
