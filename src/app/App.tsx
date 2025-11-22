import { useEffect, useCallback } from 'react';
import AppProviders from './providers/AppProviders';
import RootLayout from './layout/RootLayout';

import { useGameFlowStore } from '@processes/game-flow';
import { useShallow } from 'zustand/react/shallow';
import { useCheckAuthState } from '@shared/auth/model/useLoginStatus';

// 페이지 컴포넌트들
import LoginPage from './pages/LoginPage';
import LoadingPage from './pages/LoadingPage';
import MainMenu from './pages/MainMenu';
import PackingPhase from './pages/PackingPhase';
import EventPhase from './pages/EventPhase';
import IntroStory from './pages/IntroStory';
import CharacterSelectPage from './pages/CharacterSelect';
import BagSelectPage from './pages/BagSelectPage';
import PauseMenu from '@processes/game-flow/ui/menu/PauseMenu';

export default function App() {
  const { step, resetDayFlow, setAuthenticated } = useGameFlowStore(
    useShallow(state => ({
      step: state.step,
      resetDayFlow: state.resetDayFlow,
      setAuthenticated: state.setAuthenticated,
    }))
  );

  // 인증 상태 확인 - useCallback으로 메모이제이션하여 무한 렌더링 방지
  const handleAuthCheck = useCallback(
    (isLoggedIn: boolean) => {
      setAuthenticated(isLoggedIn);
    },
    [setAuthenticated]
  );

  useCheckAuthState(handleAuthCheck);

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
          jsonPath='/JSON/intro1.json'
          onNext={() => {
            useGameFlowStore.getState().goto('BAG_SELECT');
          }}
        />
      );
    }
    if (step === 'BAG_SELECT') {
      return <BagSelectPage />;
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
    return <LoginPage />;
  };

  return (
    <AppProviders>
      <RootLayout>
        {renderScreen()}
        <PauseMenu hidden={step === 'LOGIN' || step === 'PROGRESS'} />
      </RootLayout>
    </AppProviders>
  );
}
