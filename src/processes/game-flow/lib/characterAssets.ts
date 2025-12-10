import type { PlayingCharacter } from '@entities/game-session';
import {
  CHARACTER_PAIR_DETAILS,
  getCharacterPairDetailByGroupId,
} from '@entities/character-data';

export function resolveCharacterGroupName(
  groupId?: number | null,
  fallbackName?: string | null
): string | undefined {
  if (fallbackName) return fallbackName;
  const detail = getCharacterPairDetailByGroupId(groupId);
  return detail?.title;
}

export function getFallbackPlayingCharacters(): PlayingCharacter[] {
  const defaultPair = CHARACTER_PAIR_DETAILS[0];
  return defaultPair.characters.map((detail, index) => ({
    id: index + 1,
    characterId: index + 1,
    characterCode: detail.code,
    currentHp: null,
    currentMental: null,
    name: detail.name,
    fullImage: detail.image ?? detail.thumbnail ?? null,
    profileImage: detail.thumbnail ?? detail.image ?? null,
    colors: {
      backgroundColor: null,
      borderColor: null,
    },
  }));
}
