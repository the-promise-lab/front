import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import SinglePortraitScreen from '@features/event-phase/ui/SinglePortraitScreen';
import type { IntroEvent } from '../pages/IntroStory/types';
import type { PlayingCharacter } from '@entities/game-session';
import { useGameFlowStore } from '@processes/game-flow';

const CHARACTER_NAME_MAP: Record<string, string> = {
  Char_hem: '헴',
  char_hem: '헴',
  Char_ham: '헴',
  char_ham: '헴',
  Char_bang: '병철',
  char_bang: '병철',
};

const CHARACTER_IMAGE_MAP: Record<string, string> = {
  Char_hem: 'char_ham_portrait.png',
  char_hem: 'char_ham_portrait.png',
  Char_ham: 'char_ham_portrait.png',
  char_ham: 'char_ham_portrait.png',
  Char_bang: 'char_bang_portrait.png',
  char_bang: 'char_bang_portrait.png',
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

  const fallbackCharacters = useMemo<PlayingCharacter[]>(() => {
    const makeCharacter = (
      id: string | undefined,
      position: 'left' | 'right'
    ): PlayingCharacter => {
      const imageKey = id ? CHARACTER_IMAGE_MAP[id] : undefined;
      return {
        id: id ?? position,
        name: CHARACTER_NAME_MAP[id ?? ''] ?? id ?? position,
        profileImage: imageKey,
        mentality: 50,
        hp: 50,
        colors:
          position === 'left'
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

    if (event.CharID1 || event.CharID2) {
      return [
        makeCharacter(event.CharID1 ?? 'Char_hem', 'left'),
        makeCharacter(event.CharID2 ?? 'Char_bang', 'right'),
      ];
    }

    return [
      makeCharacter('Char_hem', 'left'),
      makeCharacter('Char_bang', 'right'),
    ];
  }, [event.CharID1, event.CharID2]);

  const charactersToUse =
    playingCharacters.length >= 2 ? playingCharacters : fallbackCharacters;

  const speakerName = useMemo(() => {
    if (event.CharSpeakerOX1) {
      return CHARACTER_NAME_MAP[event.CharID1 ?? ''] ?? event.CharID1 ?? '';
    }
    if (event.CharSpeakerOX2) {
      return CHARACTER_NAME_MAP[event.CharID2 ?? ''] ?? event.CharID2 ?? '';
    }
    return CHARACTER_NAME_MAP[event.CharID1 ?? ''] ?? event.CharID1 ?? '';
  }, [
    event.CharSpeakerOX1,
    event.CharSpeakerOX2,
    event.CharID1,
    event.CharID2,
  ]);

  const script = event.Script ?? '';

  return (
    <SinglePortraitScreen
      portraits={[
        {
          speaker: speakerName,
          text: script,
        },
      ]}
      playingCharacters={charactersToUse}
    />
  );
}
