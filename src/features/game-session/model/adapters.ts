import type {
  GameSessionResponseDto,
  CreateGameSessionResponseDto,
} from '@api';
import type { GameSession } from './types';

/**
 * GameSessionResponseDto를 도메인 GameSession 타입으로 변환
 *
 * @param apiResponse - API에서 받은 게임 세션 응답
 * @returns 도메인 모델로 변환된 게임 세션
 */
export function adaptGameSessionFromApi(
  apiResponse: GameSessionResponseDto
): GameSession {
  return {
    id: apiResponse.id,
    userId: apiResponse.userId,
    currentActId: apiResponse.currentActId,
    playingCharacterSet: apiResponse.playingCharacterSet
      ? {
          id: apiResponse.playingCharacterSet.id,
          characterGroupId: apiResponse.playingCharacterSet.characterGroupId,
          playingCharacters:
            apiResponse.playingCharacterSet.playingCharacter.map(char => ({
              id: char.id,
              characterId: char.characterId,
              currentHp: char.currentHp,
              currentSp: char.currentSp,
            })),
        }
      : null,
    inventories: apiResponse.inventories.map(inv => ({
      id: inv.id,
      bagId: inv.bagId,
      slots: inv.slots.map(slot => ({
        id: slot.id,
        itemId: slot.itemId,
        quantity: slot.quantity,
      })),
    })),
  };
}

/**
 * CreateGameSessionResponseDto를 도메인 GameSession 타입으로 변환
 * (생성 직후에는 playingCharacterSet과 inventories가 비어있음)
 *
 * @param apiResponse - API에서 받은 게임 세션 생성 응답
 * @returns 도메인 모델로 변환된 게임 세션
 */
export function adaptCreateGameSessionFromApi(
  apiResponse: CreateGameSessionResponseDto
): GameSession {
  return {
    id: apiResponse.id,
    userId: apiResponse.userId,
    currentActId: apiResponse.currentActId,
    playingCharacterSet: null,
    inventories: [],
  };
}
