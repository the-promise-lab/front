import { useEffect } from 'react';
import AppProviders from './providers/AppProviders';
import RootLayout from './layout/RootLayout';
import { useGameFlowStore } from '../processes/game-flow';

// 페이지 컴포넌트들
import AuthCheck from './pages/AuthCheck';
import LandingPage from './pages/LandingPage';
import LoadingPage from './pages/LoadingPage';
import MainMenu from './pages/MainMenu';
import { CharacterSelect } from '../features/character-selection';
import PackingPhase from './pages/PackingPhase';
import EventPhase from './pages/EventPhase';
import IntroStory from './pages/IntroStory';
import { BagSelectionScreen } from '@features/event-phase';
import PauseMenu from '../widgets/menu/PauseMenu';

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
      return <LandingPage />;
    }
    if (step === 'MAIN_MENU') {
      return <MainMenu />;
    }
    if (step === 'PROGRESS') {
      return <LoadingPage />;
    }
    if (step === 'CHARACTER_SELECT') {
      return (
        <CharacterSelect
          onNext={() => {
            // TODO: 캐릭터 선택 시 gameSession.playingCharacterSet에 저장
            // const selectedSet = characterStore.selectedCharacterSet;
            // if (selectedSet && !selectedSet.isLocked) {
            //   // 향후 gameSession API를 통해 playingCharacterSet 설정
            // }

            console.log('Calling next() from CHARACTER_SELECT');
            // useGameFlowStore.getState().goto('BAG_SELECT');
            useGameFlowStore.getState().goto('INTRO_STORY');
          }}
          onBack={() => useGameFlowStore.getState().goto('MAIN_MENU')}
        />
      );
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
        <BagSelectionScreen
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
    return <LandingPage />;
  };

  return (
    <AppProviders>
      <RootLayout>
        <div className='fixed inset-0 z-10 touch-pan-y overflow-hidden'>
          {renderScreen()}
        </div>
        {/* 일시정지 메뉴 - 전역 팝업 */}
        <PauseMenu />
      </RootLayout>
    </AppProviders>
  );
}
