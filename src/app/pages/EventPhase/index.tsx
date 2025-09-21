import { useAssetStore } from '@shared/model/assetStore';
import {
  DayScreen,
  Header,
  PlaceScreen,
  RandomEventScreen,
  WarningBeforeStartScreen,
} from '@features/event-phase/index';
import { useGameFlowStore } from '@processes/game-flow';
import { useShallow } from 'zustand/react/shallow';

export default function EventPhase() {
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));
  const shelterBgUrl = getObjectUrl('shelter-bg.png');

  // DAY_STEP 상태 관리
  const { dayStep, nextDayStep } = useGameFlowStore();

  const renderScreen = () => {
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
          dayStep === 'RANDOM_EVENT_STORY' || dayStep === 'RANDOM_EVENT_ITEM'
        }
      />
      <div className='flex-1'>{renderScreen()}</div>
    </div>
  );
}
