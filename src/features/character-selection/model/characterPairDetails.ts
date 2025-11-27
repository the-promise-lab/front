import type { CharacterSet } from '@entities/game-session';
import { CHARACTER_PAIR_DETAILS } from '@shared/character-data';

// Re-export for backward compatibility
export {
  CHARACTER_PAIR_DETAILS,
  type CharacterPairDetail,
  type CharacterDetail,
  type CharacterStat,
  getCharacterPairDetailByGroupId,
  getCharacterDetailByName,
  getCharacterPairDetailByName,
} from '@shared/character-data';

// Feature-specific function that uses CharacterSet from entities
export function createCharacterSetsFromDetails(): CharacterSet[] {
  return CHARACTER_PAIR_DETAILS.map((detail, index) => ({
    id: detail.groupId,
    name: detail.title,
    image: detail.characters[0]?.image || '',
    description: detail.overview ?? '',
    isLocked: index > 0,
  }));
}
