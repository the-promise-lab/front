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
      // 클라이언트 메타데이터 (FIXME: 백엔드에서 제공하면 제거)
      // API에서 로드 시 없을 수 있음 (app 레이어에서 추가 필요)
      name: string;
      fullImage: string;
      thumbnailImage: string;
      colors: {
        backgroundColor: string;
        borderColor: string;
      };
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
