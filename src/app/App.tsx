import { useEffect } from 'react';
import AppProviders from './providers/AppProviders';
import RootLayout from './layout/RootLayout';
import { useGameFlowStore } from '@processes/game-flow';

// 페이지 컴포넌트들
import AuthCheck from './pages/AuthCheck';
import LoginPage from './pages/LoginPage';
import LoadingPage from './pages/LoadingPage';
import MainMenu from './pages/MainMenu';
import PackingPhase from './pages/PackingPhase';
import EventPhase from './pages/EventPhase';
import IntroStory from './pages/IntroStory';
import { BagSelection } from '@features/bag-selection';
import CharacterSelectPage from './pages/CharacterSelect';

export default function App() {
  const { step, next, resetDayFlow } = useGameFlowStore();

  // DAY_FLOW 진입 시 DAY_STEP 초기화
  useEffect(() => {
    if (step === 'DAY_FLOW') {
      resetDayFlow();
    }
  }, [step, resetDayFlow]);

  const renderScreen = () => {
    // 디버깅: 현재 step 상태 확인
    console.log('App.tsx - Current step:', step);

    // GameFlow 구현 - 단계별 컴포넌트 분기 처리
    if (step === 'AUTH_CHECK') {
      return <AuthCheck />;
    }
    if (step === 'LOGIN') {
      return <LoginPage />;
    }
    if (step === 'MAIN_MENU') {
      return <MainMenu />;
    }
    if (step === 'PROGRESS') {
      return <LoadingPage />;
    }
    if (step === 'CHARACTER_SELECT') {
      return <CharacterSelectPage />;
    }
    if (step === 'INTRO_STORY') {
      return (
        <IntroStory
          onNext={() => {
            useGameFlowStore.getState().goto('BAG_SELECT');
          }}
        />
      );
    }
    if (step === 'BAG_SELECT') {
      return (
        <BagSelection
          onComplete={selectedBagId => {
            console.log('Selected bag:', selectedBagId);

            // TODO: 선택된 가방을 전역 상태에 저장
            next();
          }}
        />
      );
    }
    if (step === 'PACKING_PHASE') {
      return <PackingPhase />;
    }
    if (step === 'DAY_FLOW') {
      return <EventPhase />;
    }
    return <LoginPage />;
  };

  return (
    <AppProviders>
      <RootLayout>{renderScreen()}</RootLayout>
    </AppProviders>
  );
}
