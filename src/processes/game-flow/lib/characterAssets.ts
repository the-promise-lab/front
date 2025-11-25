import type {
  PlayingCharacter,
  PlayingCharacterSet,
} from '@entities/game-session';
import {
  CHARACTER_PAIR_DETAILS,
  getCharacterDetailByName,
  getCharacterPairDetailByGroupId,
  getCharacterPairDetailByName,
} from '@features/character-selection/model/characterPairDetails';

export function resolveCharacterGroupName(
  groupId?: number | null,
  fallbackName?: string | null
): string | undefined {
  if (fallbackName) return fallbackName;
  const detail = getCharacterPairDetailByGroupId(groupId);
  return detail?.title;
}

export function enrichPlayingCharacterSet(
  params: PlayingCharacterSet | null | undefined,
  options?: { groupName?: string | null }
): PlayingCharacterSet | null | undefined {
  if (!params) return params;
  return {
    ...params,
    playingCharacters: enrichPlayingCharacters(params.playingCharacters, {
      groupId: params.characterGroupId,
      groupName: options?.groupName,
    }),
  };
}

export function enrichPlayingCharacters(
  playingCharacters: PlayingCharacter[] | undefined,
  options?: { groupId?: number | null; groupName?: string | null }
): PlayingCharacter[] {
  if (!playingCharacters) return [];
  const pairDetail =
    getCharacterPairDetailByGroupId(options?.groupId) ||
    getCharacterPairDetailByName(options?.groupName);

  return playingCharacters.map(character => {
    const detail =
      pairDetail?.characters.find(char => {
        const aliases = [char.name, ...(char.aliases ?? [])];
        return aliases.includes(character.name || '');
      }) || getCharacterDetailByName(character.name);

    if (!detail) {
      return {
        ...character,
        fullImage: character.fullImage ?? null,
        profileImage: character.profileImage ?? null,
      };
    }

    const resolvedFullImage = detail.image ?? detail.thumbnail ?? null;
    const resolvedProfileImage = detail.thumbnail ?? detail.image ?? null;

    return {
      ...character,
      name: detail.name,
      fullImage: resolvedFullImage ?? character.fullImage ?? null,
      profileImage: resolvedProfileImage ?? character.profileImage ?? null,
    };
  });
}

export function getFallbackPlayingCharacters(): PlayingCharacter[] {
  const defaultPair = CHARACTER_PAIR_DETAILS[0];
  return defaultPair.characters.map((detail, index) => ({
    id: index + 1,
    characterId: index + 1,
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
