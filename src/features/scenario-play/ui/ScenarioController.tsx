import { useEffect, useCallback } from 'react';
import {
  useScenarioStore,
  selectCurrentEvent,
  selectStatus,
} from '../model/useScenarioStore';
import {
  useLoadCurrentAct,
  useSubmitChoiceAndLoadNextAct,
} from '../model/useScenarioApi';
import type { ScenarioChoiceOption, SubmitChoiceParams } from '../model/types';
import type { PlayingCharacter } from '@entities/game-session';
import SimpleEventScreen from './SimpleEventScreen';
import StoryChoiceScreen from './StoryChoiceScreen';
import ItemChoiceScreen from './ItemChoiceScreen';
import StatusScreen from './StatusScreen';
import SystemScreen from './SystemScreen';

interface ScenarioControllerProps {
  playingCharacters?: PlayingCharacter[];
  onGameEnd?: () => void;
  onGameOver?: () => void;
}

/**
 * 시나리오 진행 컨트롤러
 * 이벤트 타입에 따라 적절한 화면을 렌더링하고, 진행 흐름을 관리
 */
export function ScenarioController({
  playingCharacters = [],
  onGameEnd,
  onGameOver,
}: ScenarioControllerProps) {
  const {
    currentActBundle,
    isLoading,
    loadActBundle,
    nextEvent,
    selectChoice,
    clearChoice,
    setLoading,
    setError,
  } = useScenarioStore();

  const currentEvent = useScenarioStore(selectCurrentEvent);
  const status = useScenarioStore(selectStatus);

  const { mutate: loadCurrentAct } = useLoadCurrentAct({
    onSuccess: bundle => {
      loadActBundle(bundle);
      setLoading(false);
    },
    onError: error => {
      setError(error);
      setLoading(false);
    },
  });

  const { mutate: submitChoice } = useSubmitChoiceAndLoadNextAct({
    onSuccess: bundle => {
      loadActBundle(bundle);
      clearChoice();
      setLoading(false);
    },
    onError: error => {
      setError(error);
      setLoading(false);
    },
  });

  // 초기 로드
  useEffect(() => {
    if (!currentActBundle && !isLoading) {
      setLoading(true);
      loadCurrentAct();
    }
  }, [currentActBundle, isLoading, loadCurrentAct, setLoading]);

  // status에 따른 분기 처리
  useEffect(() => {
    if (!status) return;

    switch (status) {
      case 'GAME_END':
        onGameEnd?.();
        break;
      case 'GAME_OVER':
      case 'SUDDEN_DEATH':
        onGameOver?.();
        break;
      case 'DAY_END':
        // DAY_END 후 다음 Day의 첫 번째 Act를 불러오기
        // 현재 Act의 모든 이벤트가 처리된 후에 자동으로 호출됨
        break;
    }
  }, [status, onGameEnd, onGameOver]);

  // 이벤트 완료 핸들러 (Simple, Status, System 타입용)
  const handleEventComplete = useCallback(() => {
    const hasMore = nextEvent();

    if (!hasMore) {
      // 마지막 이벤트 완료
      if (status === 'DAY_END') {
        // 다음 Day 시작
        setLoading(true);
        loadCurrentAct();
      }
      // IN_PROGRESS 상태에서 마지막 이벤트가 Choice 타입이 아닌 경우는
      // 서버에서 항상 Choice 이벤트로 끝나도록 설계되어야 함
    }
  }, [nextEvent, status, setLoading, loadCurrentAct]);

  // 선택지 선택 핸들러 (StoryChoice, ItemChoice 타입용)
  const handleChoiceSelect = useCallback(
    (option: ScenarioChoiceOption, itemId?: number) => {
      selectChoice(option.choiceOptionId, itemId);

      // 선택 후 바로 다음 Act 요청
      if (currentActBundle?.act) {
        const params: SubmitChoiceParams = {
          lastActId: currentActBundle.act.id,
          choice: {
            optionId: option.choiceOptionId,
            itemId,
          },
        };
        setLoading(true);
        submitChoice(params);
      }
    },
    [selectChoice, currentActBundle, setLoading, submitChoice]
  );

  // 첫 로드 시 (아직 데이터가 없을 때)만 null 반환
  // 로딩 중이어도 currentEvent가 있으면 현재 화면 유지
  if (!currentEvent) {
    return null;
  }

  // 이벤트 타입별 화면 렌더링
  switch (currentEvent.type) {
    case 'Simple':
      return (
        <SimpleEventScreen
          event={currentEvent}
          playingCharacters={playingCharacters}
          onComplete={handleEventComplete}
        />
      );

    case 'StoryChoice':
      return (
        <StoryChoiceScreen event={currentEvent} onSelect={handleChoiceSelect} />
      );

    case 'ItemChoice':
      return (
        <ItemChoiceScreen event={currentEvent} onSelect={handleChoiceSelect} />
      );

    case 'Status':
      return (
        <StatusScreen event={currentEvent} onComplete={handleEventComplete} />
      );

    case 'System':
      return (
        <SystemScreen event={currentEvent} onComplete={handleEventComplete} />
      );

    default:
      return (
        <div className='flex h-full w-full items-center justify-center'>
          <div className='text-white'>
            알 수 없는 이벤트 타입: {currentEvent.type}
          </div>
        </div>
      );
  }
}

export default ScenarioController;
