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
  char_boksoon: '복순',
  char_dog: '진실',
  char_yewon: '예원',
  char_zewook: '재욱',
  char_miri: '미리',
  char_jeaho: '재호',
};

const CHARACTER_IMAGE_MAP: Record<string, string> = {
  Char_hem: 'char_hb_intro.png',
  char_hem: 'char_hb_intro.png',
  Char_ham: 'char_hb_intro.png',
  char_ham: 'char_hb_intro.png',
  Char_bang: 'char_bc_intro.png',
  char_bang: 'char_bc_intro.png',
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
      const resolvedName = CHARACTER_NAME_MAP[id ?? ''] ?? id ?? position;
      return {
        id: position === 'left' ? 1 : 2,
        characterId: position === 'left' ? 1 : 2,
        name: resolvedName,
        fullImage: null,
        profileImage: imageKey ?? null,
        currentHp: null,
        currentSp: null,
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
