import type {
  GameSessionResponseDto,
  CreateGameSessionResponseDto,
  CharacterGroupResponseDto,
  PlayingCharacterSetResponseDto,
  PlayingCharacterDto,
} from '@api';
import type {
  CharacterSet,
  GameSession,
  PlayingCharacter,
  PlayingCharacterSet,
} from './types';

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
      ? adaptPlayingCharacterSetFromApi(apiResponse.playingCharacterSet)
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

/**
 * 서버 PlayingCharacterSetResponseDto를 클라이언트 PlayingCharacterSet 타입으로 변환
 *
 * @param apiResponse - 서버 응답 (PlayingCharacterSetResponseDto)
 * @returns 클라이언트 PlayingCharacterSet 타입
 */
export function adaptPlayingCharacterSetFromApi(
  apiResponse: PlayingCharacterSetResponseDto
): PlayingCharacterSet {
  return {
    id: apiResponse.id,
    characterGroupId: apiResponse.characterGroupId,
    playingCharacters: apiResponse.playingCharacter.map(char =>
      // FIXME: 백엔드에서 GET /api/game/session 에 대한 응답값 수정 후 타입 단언을 제거
      adaptPlayingCharacterFromApi(char as unknown as PlayingCharacterDto)
    ),
  };
}

/**
 * 서버 캐릭터 그룹 응답을 클라이언트 CharacterSet 타입으로 변환
 *
 * @param group - 서버 응답 (CharacterGroupResponseDto)
 * @returns 클라이언트 CharacterSet 타입
 */
export function adaptCharacterSetFromApi(
  group: CharacterGroupResponseDto
): CharacterSet {
  return {
    id: group.id,
    name: group.name,
    image: group.image,
    description: group.description,
    isLocked: group.id !== 1,
  };
}

/**
 * 서버 PlayingCharacterDto를 클라이언트 Character 타입으로 변환
 * FIXME: 백엔드에서 메타데이터 포함하면 이 로직 단순화 가능
 *
 * @param playingCharacter - 서버 응답 (PlayingCharacterDto)
 * @returns 클라이언트 Character 타입 또는 null (메타데이터 없는 경우)
 */
export function adaptPlayingCharacterFromApi(
  playingCharacter: PlayingCharacterDto
): PlayingCharacter {
  return {
    id: playingCharacter.id,
    characterId: playingCharacter.character.id,
    name: playingCharacter.character.name || null,
    fullImage: playingCharacter.character.selectImage || null,
    profileImage: playingCharacter.character.potraitImage || null,
    currentHp: playingCharacter.currentHp || null,
    currentSp: playingCharacter.currentSp || null,
    colors: {
      backgroundColor: playingCharacter.character.bgColor || null,
      borderColor: playingCharacter.character.borderColor || null,
    },
  };
}
