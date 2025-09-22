import { useAssetStore } from '@shared/model/assetStore';
import {
  DayScreen,
  Header,
  PlaceScreen,
  RandomEventScreen,
  WarningBeforeStartScreen,
  ChangeStatsScreen,
} from '@features/event-phase/index';
import { useGameFlowStore } from '@processes/game-flow';
import { useShallow } from 'zustand/react/shallow';

export default function EventPhase() {
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));
  const shelterBgUrl = getObjectUrl('shelter-bg.png');

  // DAY_STEP 상태 관리
  const { dayStep, nextDayStep, currentEventData } = useGameFlowStore();

  const renderScreen = () => {
    // TODO: 각 컴포넌트에 currentEventData 전달 예정
    console.log('Current Event Data:', currentEventData);

    switch (dayStep) {
      case 'PLACE_SCREEN':
        return <PlaceScreen />;
      case 'WARNING_BEFORE_START':
        return <WarningBeforeStartScreen />;
      case 'DAY_SCREEN':
        return <DayScreen />;
      case 'RANDOM_EVENT_STORY':
        return <RandomEventScreen />;
      case 'RANDOM_EVENT_ITEM':
        return <RandomEventScreen type='ITEM' />;
      case 'CHANGE_STATS_SCREEN':
        return <ChangeStatsScreen />;
      case 'EVENT_RESULT_SCREEN':
        return <RandomEventScreen type='RESULT' />;
      default:
        return <PlaceScreen />;
    }
  };

  const handleNext = () => {
    nextDayStep();
  };
  return (
    <div
      className='relative flex h-screen w-screen flex-col gap-4 bg-cover bg-center'
      style={{
        backgroundImage: `url(${shelterBgUrl})`,
      }}
      onClick={handleNext}
    >
      <Header
        hasCharacterProfiles={
          dayStep === 'RANDOM_EVENT_STORY' ||
          dayStep === 'RANDOM_EVENT_ITEM' ||
          dayStep === 'CHANGE_STATS_SCREEN' ||
          dayStep === 'EVENT_RESULT_SCREEN'
        }
      />
      <div className='flex-1'>{renderScreen()}</div>
    </div>
  );
}
