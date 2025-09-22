import { useAssetStore } from '@shared/model/assetStore';
import {
  DayScreen,
  Header,
  PlaceScreen,
  RandomEventScreen,
  WarningBeforeStartScreen,
  ChangeStatsScreen,
} from '@features/event-phase/index';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function EventPhase() {
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));
  const shelterBgUrl = getObjectUrl('shelter-bg.png');
  const [step, setStep] = useState<number>(0);
  const renderScreen = () => {
    switch (step) {
      case 0:
        return <PlaceScreen />;
      case 1:
        return <WarningBeforeStartScreen />;
      case 2:
        return <DayScreen />;
      case 3:
        return <RandomEventScreen />;
      case 4:
        return <RandomEventScreen type='ITEM' />;
      case 5:
        return <ChangeStatsScreen />;
      case 6:
        return <RandomEventScreen type='RESULT' />;
    }
  };
  const handleNext = () => {
    setStep(prev => (prev < 6 ? prev + 1 : 0));
  };
  return (
    <div
      className='relative flex h-screen w-screen flex-col gap-4 bg-cover bg-center'
      style={{
        backgroundImage: `url(${shelterBgUrl})`,
      }}
      onClick={handleNext}
    >
      <Header hasCharacterProfiles={step > 2} />
      <div className='flex-1'>{renderScreen()}</div>
    </div>
  );
}
