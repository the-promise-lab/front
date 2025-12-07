import { Header, PauseMenu, useGameFlowStore } from '@processes/game-flow';
import { ShelfSelection } from '@features/shelf-selection';
import { useEffect } from 'react';
import type { GameSessionDto } from '@api';
import { useTimer } from '@features/shelf-selection/model/useTimer';
import {
  useTimedDialogues,
  type TimedDialogue,
} from '@features/shelf-selection/model/useTimedDialogues';
import EdgeGradient from '@shared/ui/layout/EdgeGradient';
import { useShallow } from 'zustand/react/shallow';

const TOTAL_SECONDS = 102;

// 시간에 따른 대사 정의
const DIALOGUES: TimedDialogue[] = [
  {
    triggerTime: 5,
    condition: 'elapsed',
    text: '뱅철아, 정신 똑디 차리라! 필요한 것만 후딱 챙기자!',
    speaker: '형빈',
    duration: 3000,
  },
  {
    triggerTime: 8,
    condition: 'elapsed',
    text: '예! 헴! 말씀만 하십쇼!',
    speaker: '병철',
    duration: 3000,
  },
  {
    triggerTime: 50,
    condition: 'remaining',
    text: '거만 보지 말고 저쪽 코너도 얼른 훑어봐라!',
    speaker: '형빈',
    duration: 3000,
  },
  {
    triggerTime: 47,
    condition: 'remaining',
    text: '예, 헴!! 바로 가겠습니다, 헴!!',
    speaker: '병철',
    duration: 3000,
  },
  {
    triggerTime: 15,
    condition: 'remaining',
    text: '아, 뱅철아! 또 흔들린다! 마지막이다!',
    speaker: '형빈',
    duration: 3000,
  },
  {
    triggerTime: 12,
    condition: 'remaining',
    text: '헉! 알겠습니다, 헴!!',
    speaker: '병철',
    duration: 3000,
  },
];

export default function PackingPhase() {
  const { back, gameSession, saveInventory, goto } = useGameFlowStore(
    useShallow(state => ({
      back: state.back,
      gameSession: state.gameSession,
      saveInventory: state.saveInventory,
      goto: state.goto,
    }))
  );

  const bag = gameSession?.bag;

  // Timer 관리
  const { secondsLeft, showModal } = useTimer(TOTAL_SECONDS);

  // 대사 관리
  const currentDialogue = useTimedDialogues(
    secondsLeft,
    TOTAL_SECONDS,
    DIALOGUES
  );

  const saveAndGetInventory = (result: GameSessionDto) => {
    saveInventory({
      items: result.gameSessionInventory.map(inv => ({
        sessionId: inv.sessionId,
        item: inv.item,
        quantity: inv.quantity,
      })),
    });
  };

  // 완료 시 SCENARIO_FLOW로 직접 이동 (PlaceScreen → Caution → IntroStory3 → ScenarioController)
  const onComplete = (result: GameSessionDto) => {
    saveAndGetInventory(result);
    goto('SCENARIO_FLOW');
  };

  useEffect(() => {
    if (!bag) {
      back();
    }
  }, [bag, back]);

  if (!bag) return null;
  return (
    <>
      <EdgeGradient />
      <ShelfSelection
        onBack={back}
        bag={bag}
        onComplete={onComplete}
        secondsLeft={secondsLeft}
        showTimeoutModal={showModal}
        renderHeader={() => (
          <Header
            className='z-[100]'
            hasCharacterProfiles
            playingCharacters={
              gameSession?.playingCharacterSet?.playingCharacters
            }
            bubblePortrait={
              currentDialogue
                ? {
                    speaker: currentDialogue.speaker,
                    text: currentDialogue.text,
                  }
                : undefined
            }
            menuSlot={<PauseMenu buttonClassName='pointer-events-auto' />}
          />
        )}
      />
    </>
  );
}
