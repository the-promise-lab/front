import type {
  GameSessionDto,
  CharacterGroupDto,
  PlayingCharacterSetDto,
  PlayingCharacterDto,
  BagDto,
} from '@api';
import type {
  CharacterSet,
  GameSession,
  PlayingCharacter,
  PlayingCharacterSet,
  Bag,
} from './types';
import {
  getCharacterDetailByName,
  getCharacterPairDetailByGroupId,
} from '@entities/character-data';

/**
 * GameSessionResponseDto를 도메인 GameSession 타입으로 변환
 *
 * @param apiResponse - API에서 받은 게임 세션 응답
 * @returns 도메인 모델로 변환된 게임 세션
 */
export function adaptGameSessionFromApi(
  apiResponse: GameSessionDto
): GameSession {
  return {
    id: apiResponse.id,
    userId: apiResponse.userId,
    currentActId: apiResponse.currentActId,
    playingCharacterSet: apiResponse.playingCharacterSet
      ? adaptPlayingCharacterSetFromApi(apiResponse.playingCharacterSet)
      : null,
    inventory:
      apiResponse.gameSessionInventory.length > 0
        ? {
            items: apiResponse.gameSessionInventory.map(inv => ({
              sessionId: inv.sessionId,
              item: inv.item,
              quantity: inv.quantity,
            })),
          }
        : null,
    bag: adaptBagFromApi(apiResponse.bag),
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
  apiResponse: GameSessionDto
): GameSession {
  return adaptGameSessionFromApi(apiResponse);
}

/**
 * 서버 PlayingCharacterSetResponseDto를 클라이언트 PlayingCharacterSet 타입으로 변환
 * characterPairDetails 정보를 포함하여 이미지/이름을 보강
 *
 * @param apiResponse - 서버 응답 (PlayingCharacterSetResponseDto)
 * @returns 클라이언트 PlayingCharacterSet 타입 (characterPairDetails 정보 포함)
 */
export function adaptPlayingCharacterSetFromApi(
  apiResponse: PlayingCharacterSetDto
): PlayingCharacterSet {
  const pairDetail = getCharacterPairDetailByGroupId(
    apiResponse.characterGroupId
  );

  return {
    id: apiResponse.id,
    characterGroupId: apiResponse.characterGroupId,
    playingCharacters: apiResponse.playingCharacter.map(char =>
      adaptPlayingCharacterFromApi(char, pairDetail)
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
  group: CharacterGroupDto
): CharacterSet {
  return {
    id: group.id,
    name: group.name,
    image: group.groupSelectImage,
    description: group.description,
    isLocked: group.id !== 1,
  };
}

/**
 * 서버 PlayingCharacterDto를 클라이언트 PlayingCharacter 타입으로 변환
 * characterPairDetails 정보를 사용하여 이미지/이름을 보강
 *
 * @param playingCharacter - 서버 응답 (PlayingCharacterDto)
 * @param pairDetail - 캐릭터 페어 상세 정보 (선택적)
 * @returns 클라이언트 PlayingCharacter 타입
 */
export function adaptPlayingCharacterFromApi(
  playingCharacter: PlayingCharacterDto,
  pairDetail?: {
    characters: Array<{
      name: string;
      aliases?: string[];
      image?: string;
      thumbnail?: string;
      colors?: {
        backgroundColor: string;
        borderColor: string;
      };
    }>;
  } | null
): PlayingCharacter {
  // characterPairDetails에서 매칭되는 캐릭터 찾기
  const characterName = playingCharacter.character.name;
  const detail =
    pairDetail?.characters.find(char => {
      const aliases = [char.name, ...(char.aliases ?? [])];
      return aliases.includes(characterName || '');
    }) || getCharacterDetailByName(characterName);

  // characterPairDetails에서 이미지/이름 정보 가져오기
  const resolvedName = detail?.name || characterName || null;
  const resolvedFullImage =
    detail?.image ??
    detail?.thumbnail ??
    playingCharacter.character.selectImage ??
    null;
  const resolvedProfileImage =
    detail?.thumbnail ??
    detail?.image ??
    playingCharacter.character.portraitImage ??
    null;

  const resolvedColors = detail?.colors || null;

  return {
    id: playingCharacter.id,
    characterId: playingCharacter.character.id,
    characterCode: playingCharacter.character.code,
    name: resolvedName,
    fullImage: resolvedFullImage,
    profileImage: resolvedProfileImage,
    currentHp: playingCharacter.currentHp || null,
    currentMental: playingCharacter.currentMental || null,
    colors: {
      backgroundColor:
        resolvedColors?.backgroundColor ||
        playingCharacter.character.bgColor ||
        null,
      borderColor:
        resolvedColors?.borderColor ||
        playingCharacter.character.borderColor ||
        null,
    },
  };
}

/**
 * BagDto를 클라이언트 Bag 타입으로 변환
 *
 * @param dto - 서버 응답 (BagDto)
 * @returns 클라이언트 Bag 타입
 */
export function adaptBagFromApi(dto: BagDto): Bag {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    image: dto.image,
    capacity: dto.capacity,
  };
}
