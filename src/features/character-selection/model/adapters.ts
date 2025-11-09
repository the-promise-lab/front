import type { PlayingCharacterDto } from '@api/models/PlayingCharacterDto';
import type { CharacterGroupResponseDto } from '@api/models/CharacterGroupResponseDto';
import type { CharacterSet, PlayingCharacter } from '@entities/game-session';
import { getCharacterMetadata } from '@entities/game-session/model/characterMappings';

/**
 * 서버 캐릭터 그룹 응답을 클라이언트 CharacterSet 타입으로 변환
 *
 * @param group - 서버 응답 (CharacterGroupResponseDto)
 * @returns 클라이언트 CharacterSet 타입
 */
export function adaptCharacterGroupToCharacterSet(
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
export function adaptPlayingCharacter(
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
