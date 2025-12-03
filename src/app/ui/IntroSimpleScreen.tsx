import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import PortraitScreen from '@entities/portrait-screen';
import type { IntroEvent } from '../pages/IntroStory/types';
import type { PlayingCharacter } from '@entities/game-session';
import { useGameFlowStore } from '@processes/game-flow';
import { CHARACTER_PAIR_DETAILS } from '@entities/character-data';

const CHARACTER_ASSETS = CHARACTER_PAIR_DETAILS.flatMap(detail =>
  detail.characters.map(character => ({
    name: character.name,
    image: character.image ?? character.thumbnail ?? '',
    aliases: [character.name, ...(character.aliases ?? [])],
  }))
).filter(asset => asset.image) as Array<{
  name: string;
  image: string;
  aliases: string[];
}>;

const CHARACTER_NAME_MAP: Record<string, string> = CHARACTER_ASSETS.reduce(
  (acc, config) => {
    config.aliases.forEach(alias => {
      acc[alias] = config.name;
    });
    return acc;
  },
  {} as Record<string, string>
);

const CHARACTER_IMAGE_MAP: Record<string, string> = CHARACTER_ASSETS.reduce(
  (acc, config) => {
    config.aliases.forEach(alias => {
      acc[alias] = config.image;
    });
    return acc;
  },
  {} as Record<string, string>
);

const DEFAULT_LEFT = 'Char_hem';
const DEFAULT_RIGHT = 'Char_bang';

const makeCharacterFromId = (
  id: string | undefined,
  fallbackPosition: 'left' | 'right'
): PlayingCharacter | null => {
  const fallbackKey =
    fallbackPosition === 'left' ? DEFAULT_LEFT : DEFAULT_RIGHT;
  const resolvedId = id ?? fallbackKey;
  const normalizedName =
    CHARACTER_NAME_MAP[resolvedId] ??
    CHARACTER_NAME_MAP[fallbackKey] ??
    resolvedId;
  const image =
    CHARACTER_IMAGE_MAP[resolvedId] ??
    CHARACTER_IMAGE_MAP[fallbackKey] ??
    CHARACTER_IMAGE_MAP[DEFAULT_LEFT];

  return {
    id: fallbackPosition === 'left' ? 1 : 2,
    characterId: fallbackPosition === 'left' ? 1 : 2,
    name: normalizedName,
    fullImage: image ?? null,
    profileImage: image ?? null,
    currentHp: null,
    currentMental: null,
    colors:
      fallbackPosition === 'left'
        ? {
            backgroundColor: '#5C35A299',
            borderColor: '#CE96F1',
          }
        : {
            backgroundColor: '#5B707E99',
            borderColor: '#9FEFD2',
          },
  };
};

interface IntroSimpleScreenProps {
  event: IntroEvent;
}

export default function IntroSimpleScreen({ event }: IntroSimpleScreenProps) {
  const playingCharacters =
    useGameFlowStore(
      useShallow(
        state => state.gameSession?.playingCharacterSet?.playingCharacters
      )
    ) ?? [];

  const hasExplicitCharacters = Boolean(event.CharID1 || event.CharID2);

  const jsonCharacters = useMemo<PlayingCharacter[]>(() => {
    if (!hasExplicitCharacters) {
      return [];
    }
    const left = makeCharacterFromId(event.CharID1 ?? DEFAULT_LEFT, 'left');
    const right = makeCharacterFromId(event.CharID2 ?? DEFAULT_RIGHT, 'right');
    return [left, right].filter((character): character is PlayingCharacter =>
      Boolean(character)
    );
  }, [event.CharID1, event.CharID2, hasExplicitCharacters]);

  const charactersToUse: PlayingCharacter[] = (() => {
    if (jsonCharacters.length === 2) {
      return jsonCharacters;
    }
    if (playingCharacters.length >= 2) {
      return playingCharacters;
    }
    const defaultLeft = makeCharacterFromId(DEFAULT_LEFT, 'left');
    const defaultRight = makeCharacterFromId(DEFAULT_RIGHT, 'right');
    return [defaultLeft, defaultRight].filter(
      (character): character is PlayingCharacter => Boolean(character)
    );
  })();

  const speakerName = useMemo(() => {
    // boolean 또는 number를 boolean으로 변환
    const isSpeaker1 = Boolean(event.CharSpeakerOX1);
    const isSpeaker2 = Boolean(event.CharSpeakerOX2);
    const isSpeaker3 = Boolean(event.CharSpeakerOX3);

    if (isSpeaker1) {
      return CHARACTER_NAME_MAP[event.CharID1 ?? ''] ?? event.CharID1 ?? '';
    }
    if (isSpeaker2) {
      return CHARACTER_NAME_MAP[event.CharID2 ?? ''] ?? event.CharID2 ?? '';
    }
    if (isSpeaker3) {
      return CHARACTER_NAME_MAP[event.CharID3 ?? ''] ?? event.CharID3 ?? '';
    }
    return CHARACTER_NAME_MAP[event.CharID1 ?? ''] ?? event.CharID1 ?? '';
  }, [
    event.CharSpeakerOX1,
    event.CharSpeakerOX2,
    event.CharSpeakerOX3,
    event.CharID1,
    event.CharID2,
    event.CharID3,
  ]);

  const script = event.Script ?? '';

  return (
    <PortraitScreen
      portrait={{
        speaker: speakerName,
        text: script,
      }}
      playingCharacters={charactersToUse}
    />
  );
}
