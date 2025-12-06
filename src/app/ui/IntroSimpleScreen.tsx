import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { PortraitScreen, type PortraitCharacter } from '@entities/portrait';
import type { IntroEvent } from '@features/intro';
import { useGameFlowStore } from '@processes/game-flow';
import type { PortraitPosition } from '@entities/portrait/model/types';
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

function toPortraitPosition(
  position: string | null | undefined,
  fallback: PortraitPosition
): PortraitPosition {
  if (position === 'center' || position === 'left' || position === 'right') {
    return position;
  }
  return fallback;
}

function makePortraitCharacter(
  id: string | undefined,
  fallbackPosition: 'left' | 'right',
  overrideImageUrl?: string | null,
  explicitPosition?: PortraitCharacter['position']
): PortraitCharacter {
  const fallbackKey =
    fallbackPosition === 'left' ? DEFAULT_LEFT : DEFAULT_RIGHT;
  const resolvedId = id ?? fallbackKey;
  const name =
    CHARACTER_NAME_MAP[resolvedId] ??
    CHARACTER_NAME_MAP[fallbackKey] ??
    resolvedId;
  const image =
    CHARACTER_IMAGE_MAP[resolvedId] ??
    CHARACTER_IMAGE_MAP[fallbackKey] ??
    CHARACTER_IMAGE_MAP[DEFAULT_LEFT];

  const base: PortraitCharacter = {
    id: fallbackPosition === 'left' ? 1 : 2,
    name,
    profileImage: overrideImageUrl ?? image ?? null,
    position: explicitPosition ?? fallbackPosition,
  };

  return base;
}

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

  const jsonCharacters = useMemo<PortraitCharacter[]>(() => {
    if (!hasExplicitCharacters) return [];
    const chars: PortraitCharacter[] = [];
    if (event.CharID1 || event.CharImageUrl1) {
      chars.push(
        makePortraitCharacter(
          event.CharID1 ?? DEFAULT_LEFT,
          'left',
          event.CharImageUrl1,
          toPortraitPosition(event.CharPosition1, 'left')
        )
      );
    }
    if (event.CharID2 || event.CharImageUrl2) {
      chars.push(
        makePortraitCharacter(
          event.CharID2 ?? DEFAULT_RIGHT,
          'right',
          event.CharImageUrl2,
          toPortraitPosition(event.CharPosition2, 'right')
        )
      );
    }
    if (event.CharID3 || event.CharImageUrl3) {
      chars.push(
        makePortraitCharacter(
          event.CharID3,
          'right',
          event.CharImageUrl3,
          toPortraitPosition(event.CharPosition3, 'right')
        )
      );
    }
    if (chars.length === 1) {
      return [{ ...chars[0], position: 'center' }];
    }
    return chars.slice(0, 2);
  }, [
    event.CharID1,
    event.CharID2,
    event.CharID3,
    event.CharPosition1,
    event.CharPosition2,
    event.CharPosition3,
    event.CharImageUrl1,
    event.CharImageUrl2,
    event.CharImageUrl3,
    hasExplicitCharacters,
  ]);

  const portraitCharacters: PortraitCharacter[] = (() => {
    if (jsonCharacters.length > 0) return jsonCharacters;
    if (playingCharacters.length >= 2) {
      return playingCharacters.slice(0, 2).map(c => ({
        id: c.id,
        name: c.name,
        profileImage: c.profileImage,
      }));
    }
    if (playingCharacters.length === 1) {
      const only = playingCharacters[0];
      return [
        {
          id: only.id,
          name: only.name,
          profileImage: only.profileImage,
          position: 'center',
        },
      ];
    }
    const defaultLeft = makePortraitCharacter(DEFAULT_LEFT, 'left');
    const defaultRight = makePortraitCharacter(DEFAULT_RIGHT, 'right');
    return [defaultLeft, defaultRight];
  })();

  const speakerName = useMemo(() => {
    const isSpeaker1 = Boolean(event.CharSpeakerOX1);
    const isSpeaker2 = Boolean(event.CharSpeakerOX2);
    const isSpeaker3 = Boolean(event.CharSpeakerOX3);

    if (isSpeaker1)
      return CHARACTER_NAME_MAP[event.CharID1 ?? ''] ?? event.CharID1 ?? '';
    if (isSpeaker2)
      return CHARACTER_NAME_MAP[event.CharID2 ?? ''] ?? event.CharID2 ?? '';
    if (isSpeaker3)
      return CHARACTER_NAME_MAP[event.CharID3 ?? ''] ?? event.CharID3 ?? '';
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
      portraitCharacters={portraitCharacters}
    />
  );
}
