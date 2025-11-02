import { useAssetStore } from '@shared/model/assetStore';
import {
  DayScreen,
  Header,
  PlaceScreen,
  RandomEventScreen,
  WarningBeforeStartScreen,
  ChangeStatsScreen,
  SinglePortraitScreen,
} from '@features/event-phase/index';
import { useGameFlowStore } from '@processes/game-flow';
import { useShallow } from 'zustand/react/shallow';
import { getEventDataByDayStep } from '@processes/game-flow/data/dayFlowData';
import { CutSceneScreen } from '@features/event-phase/ui/CutSceneScreen';
import BeforeResultScreen from '@features/event-phase/ui/BeforeResultScreen';

export default function EventPhase() {
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));

  // DAY_STEP 상태 관리
  const { dayStep, nextDayStep, currentEventData } = useGameFlowStore();

  // 이벤트 데이터 준비
  const storyEventData = getEventDataByDayStep('RANDOM_EVENT_STORY');
  const itemEventData = getEventDataByDayStep('RANDOM_EVENT_ITEM');
  const portraitEventData = getEventDataByDayStep('SINGLE_PORTRAIT_SCREEN');
  const renderScreen = () => {
    console.log('Current Event Data:', currentEventData);

    switch (dayStep) {
      case 'PLACE_SCREEN':
        return <PlaceScreen />;
      case 'WARNING_BEFORE_START':
        return <WarningBeforeStartScreen />;
      case 'DAY_SCREEN':
        return <DayScreen />;
      case 'RANDOM_EVENT_STORY':
        return (
          <RandomEventScreen eventData={{ storyEventData, itemEventData }} />
        );
      case 'RANDOM_EVENT_ITEM':
        return (
          <RandomEventScreen
            type='ITEM'
            eventData={{ storyEventData, itemEventData }}
          />
        );
      case 'CHANGE_STATS_SCREEN':
        return <ChangeStatsScreen />;
      case 'EVENT_RESULT_SCREEN':
        return (
          <BeforeResultScreen
            backgroundImage={getObjectUrl('bg-2.png')}
            onGoToMainMenu={() => useGameFlowStore.getState().goto('MAIN_MENU')}
          />
        );
      case 'SINGLE_PORTRAIT_SCREEN':
        return (
          <SinglePortraitScreen portraits={portraitEventData?.portraits} />
        );
      case 'CUT_SCENE_SCREEN':
        return (
          <CutSceneScreen
            imageUrl={currentEventData?.image || ''}
            text={currentEventData?.descriptions.join('\n') || ''}
          />
        );
      default:
        return <PlaceScreen />;
    }
  };

  const backgroundImage = getObjectUrl(
    currentEventData?.backgroundImage || 'shelter-bg.png'
  );

  const handleNext = () => {
    // EVENT_RESULT_SCREEN에서는 클릭 이벤트 비활성화
    if (dayStep !== 'EVENT_RESULT_SCREEN') {
      nextDayStep();
    }
  };
  return (
    <div
      className='relative flex h-screen w-screen flex-col gap-4 bg-cover bg-center'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#1e293b', // fallback 배경색
      }}
      onClick={handleNext}
    >
      <Header
        hasCharacterProfiles={
          dayStep === 'RANDOM_EVENT_STORY' ||
          dayStep === 'RANDOM_EVENT_ITEM' ||
          dayStep === 'CHANGE_STATS_SCREEN' ||
          dayStep === 'EVENT_RESULT_SCREEN' ||
          dayStep === 'SINGLE_PORTRAIT_SCREEN'
        }
      />
      <div className='flex-1'>{renderScreen()}</div>
    </div>
  );
}
