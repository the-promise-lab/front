import type {
  GameSessionResponseDto,
  CreateGameSessionResponseDto,
  CharacterGroupResponseDto,
  PlayingCharacterDto,
} from '@api';
import type { CharacterSet, GameSession, PlayingCharacter } from './types';
import { getCharacterMetadata } from './characterMappings';

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
            apiResponse.playingCharacterSet.playingCharacter.map(char => {
              const metadata = getCharacterMetadata(char.characterId);
              return {
                id: char.id,
                characterId: char.characterId,
                currentHp: char.currentHp,
                currentSp: char.currentSp,
                name: metadata?.name || '',
                fullImage: metadata?.fullImage || '',
                thumbnailImage: metadata?.thumbnailImage || '',
                colors: metadata?.colors || {
                  backgroundColor: '#666',
                  borderColor: '#999',
                },
              };
            }),
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
): PlayingCharacter | null {
  const metadata = getCharacterMetadata(playingCharacter.characterId);

  if (!metadata) {
    console.error(
      `[adapters] characterId ${playingCharacter.characterId}에 대한 메타데이터가 없습니다. CHARACTER_METADATA에 추가하세요.`
    );
    return null;
  }

  return {
    id: playingCharacter.id,
    characterId: playingCharacter.characterId,
    name: metadata.name,
    fullImage: metadata.fullImage,
    thumbnailImage: metadata.thumbnailImage,
    currentHp: playingCharacter.currentHp,
    currentSp: playingCharacter.currentSp,
    colors: metadata.colors,
  };
}
