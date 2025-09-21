import DayScreen from '@features/event-phase/ui/DayScreen';
import Header from '@features/event-phase/ui/Header';
import PlaceScreen from '@features/event-phase/ui/PlaceScreen';
import WarningBeforeStartScreen from '@features/event-phase/ui/WarningBeforeStartScreen';
import { useState } from 'react';

export default function EventPhase() {
  const [step, setStep] = useState<number>(0);
  const renderScreen = () => {
    switch (step) {
      case 0:
        return <PlaceScreen />;
      case 1:
        return <WarningBeforeStartScreen />;
      case 2:
        return <DayScreen />;
    }
  };
  const handleNext = () => {
    setStep(prev => (prev < 2 ? prev + 1 : 0));
  };
  return (
    <div
      className='relative flex h-screen w-screen flex-col gap-4 bg-[url(shelter-bg.png)] bg-cover bg-center'
      onClick={handleNext}
    >
      <Header />
      {renderScreen()}
    </div>
  );
}
