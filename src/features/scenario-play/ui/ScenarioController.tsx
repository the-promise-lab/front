import { useEffect, useCallback } from 'react';
import {
  useScenarioStore,
  selectCurrentEvent,
  selectStatus,
  selectPendingOutcomeResultType,
} from '../model/useScenarioStore';
import {
  useLoadCurrentAct,
  useSubmitChoiceAndLoadNextAct,
} from '../model/useScenarioApi';
import type {
  ScenarioChoiceOption,
  SubmitChoiceParams,
  ScenarioEffect,
} from '../model/types';
import SimpleEventScreen from './SimpleEventScreen';
import StoryChoiceScreen from './StoryChoiceScreen';
import ItemChoiceScreen from './ItemChoiceScreen';
import StatusScreen from './StatusScreen';
import SystemScreen from './SystemScreen';
import DayScreen from './DayScreen';
import { useSetBackground } from '@shared/background/model/useSetBackground';
import { useAssetStore } from '@shared/preload-assets';
import { useShallow } from 'zustand/react/shallow';

interface ScenarioControllerProps {
  onGameEnd?: () => void;
  onGameOver?: () => void;
  onSuddenDeath?: () => void;
  onStatChange?: (effects: ScenarioEffect[]) => void;
}

/**
 * 시나리오 진행 컨트롤러
 * 이벤트 타입에 따라 적절한 화면을 렌더링하고, 진행 흐름을 관리
 */
export function ScenarioController({
  onGameEnd,
  onGameOver,
  onSuddenDeath,
  onStatChange,
}: ScenarioControllerProps) {
  const {
    currentActBundle,
    isLoading,
    loadActBundle,
    nextEvent,
    selectChoice,
    appendOutcomeEvents,
    clearChoice,
    setLoading,
    setError,
    reset,
  } = useScenarioStore();
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));
  const backgroundImage = getObjectUrl('shelter-bg.png');
  const currentEvent = useScenarioStore(selectCurrentEvent);
  const { setBackgroundImage } = useSetBackground({
    image: currentEvent?.bgImage ?? backgroundImage,
  });

  useEffect(() => {
    if (currentEvent?.bgImage) {
      setBackgroundImage(currentEvent.bgImage);
    }
  }, [currentEvent, setBackgroundImage]);

  const status = useScenarioStore(selectStatus);
  const pendingOutcomeResultType = useScenarioStore(
    selectPendingOutcomeResultType
  );
  const pendingChoice = useScenarioStore(state => state.pendingChoice);

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
      reset();
      loadCurrentAct();
    }
  }, [currentActBundle, isLoading, loadCurrentAct, setLoading, reset]);

  // status에 따른 분기 처리
  useEffect(() => {
    if (!status) return;

    switch (status) {
      case 'GAME_END':
        onGameEnd?.();
        break;
      case 'GAME_OVER':
        onGameOver?.();
        break;
      case 'SUDDEN_DEATH':
        onSuddenDeath?.();
        break;
      case 'DAY_END':
        // DAY_END 후 다음 Day의 첫 번째 Act를 불러오기
        // 현재 Act의 모든 이벤트가 처리된 후에 자동으로 호출됨
        break;
    }
  }, [status, onGameEnd, onGameOver, onSuddenDeath]);

  // 이벤트 완료 핸들러 (Simple, Status, System 타입용)
  const handleEventComplete = useCallback(() => {
    // Status 이벤트인 경우 스탯 업데이트
    if (currentEvent?.type === 'Status' && currentEvent.effects) {
      onStatChange?.(currentEvent.effects);
    }

    const hasMore = nextEvent();

    if (!hasMore) {
      // 마지막 이벤트 완료
      if (pendingOutcomeResultType) {
        // outcome 이벤트들 완료 - resultType에 따라 처리
        switch (pendingOutcomeResultType) {
          case 'ACT_END':
            // 다음 Act 요청
            if (currentActBundle?.act) {
              const params: SubmitChoiceParams = {
                lastActId: currentActBundle.act.id,
                choice: {
                  optionId: pendingChoice?.optionId ?? 0,
                  itemId: pendingChoice?.itemId,
                },
              };
              setLoading(true);
              submitChoice(params);
            }
            break;
          case 'GAME_OVER':
            onGameOver?.();
            break;
          case 'DAY_END':
            // DayScreen 표시는 아래에서 처리
            break;
          default:
            // 기본적으로 다음 Act 요청
            if (currentActBundle?.act) {
              const params: SubmitChoiceParams = {
                lastActId: currentActBundle.act.id,
                choice: {
                  optionId: pendingChoice?.optionId ?? 0,
                  itemId: pendingChoice?.itemId,
                },
              };
              setLoading(true);
              submitChoice(params);
            }
        }
      } else if (status === 'DAY_END') {
        // DayScreen 표시는 아래에서 처리
      }
    }
  }, [
    currentEvent,
    nextEvent,
    pendingOutcomeResultType,
    status,
    currentActBundle,
    pendingChoice,
    setLoading,
    submitChoice,
    onGameOver,
    onStatChange,
  ]);

  // 선택지 선택 핸들러 (StoryChoice, ItemChoice 타입용)
  const handleChoiceSelect = useCallback(
    (option: ScenarioChoiceOption, itemId?: number) => {
      selectChoice(option.choiceOptionId, itemId);

      // 선택된 옵션의 outcome 찾기
      const outcomeKey = option.choiceOptionId.toString();
      const outcome = currentEvent?.choice?.outcomes?.[outcomeKey];

      if (outcome) {
        // outcome의 events를 현재 events에 추가하고 다음 이벤트로 이동
        appendOutcomeEvents(outcome.events, outcome.resultType);
        nextEvent();
      }
    },
    [selectChoice, currentEvent, appendOutcomeEvents, nextEvent]
  );

  // DAY_END 상태이고 events가 비어있으면 DayScreen 표시
  if (
    status === 'DAY_END' &&
    (!currentActBundle?.events || currentActBundle.events.length === 0)
  ) {
    const day = currentActBundle?.day;
    return (
      <DayScreen
        dayNumber={day?.number ?? 0}
        onComplete={() => {
          setLoading(true);
          loadCurrentAct();
        }}
      />
    );
  }

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
