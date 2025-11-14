import { useEffect } from 'react';
import AppProviders from './providers/AppProviders';
import RootLayout from './layout/RootLayout';
import { useGameFlowStore, PauseMenu } from '@processes/game-flow';

// 페이지 컴포넌트들
import AuthCheck from './pages/AuthCheck';
import LandingPage from './pages/LandingPage';
import LoadingPage from './pages/LoadingPage';
import MainMenu from './pages/MainMenu';
import PackingPhase from './pages/PackingPhase';
import EventPhase from './pages/EventPhase';
import IntroStory from './pages/IntroStory';
import { BagSelectionScreen } from '@features/event-phase';
import CharacterSelectPage from './pages/CharacterSelect';

export default function App() {
  const { step, resetDayFlow } = useGameFlowStore();

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
      return <LandingPage />;
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
          jsonPath='/JSON/intro1.json'
          onNext={() => {
            useGameFlowStore.getState().goto('BAG_SELECT');
          }}
        />
      );
    }
    if (step === 'BAG_SELECT') {
      return (
        <BagSelectionScreen
          onComplete={selectedBagId => {
            console.log('Selected bag:', selectedBagId);

            // TODO: 선택된 가방을 전역 상태에 저장
            useGameFlowStore.getState().goto('INTRO_STORY_2');
          }}
        />
      );
    }
    if (step === 'INTRO_STORY_2') {
      return (
        <IntroStory
          jsonPath='/JSON/intro2.json'
          onNext={() => {
            useGameFlowStore.getState().goto('PACKING_PHASE');
          }}
        />
      );
    }
    if (step === 'PACKING_PHASE') {
      return <PackingPhase />;
    }
    if (step === 'INTRO_STORY_3') {
      return (
        <IntroStory
          jsonPath='/JSON/intro3.json'
          onNext={() => {
            useGameFlowStore.getState().goto('DAY_FLOW');
          }}
        />
      );
    }
    if (step === 'DAY_FLOW') {
      return <EventPhase />;
    }
    return <LandingPage />;
  };

  return (
    <AppProviders>
      <RootLayout>
        <div className='fixed inset-0 z-10 touch-pan-y overflow-hidden'>
          {renderScreen()}
        </div>
        {/* 일시정지 메뉴 - 전역 팝업 */}
        <div className='fixed top-11 right-11 z-10'>
          <PauseMenu />
        </div>
      </RootLayout>
    </AppProviders>
  );
}
