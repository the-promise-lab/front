import { useCallback } from 'react';
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
import IntroStory from './pages/IntroStory';
import CharacterSelectPage from './pages/CharacterSelect';
import BagSelectPage from './pages/BagSelectPage';
import OnboardingPage from './pages/OnboardingPage';
import PauseMenu from '@processes/game-flow/ui/menu/PauseMenu';
import ResultReportPage from './pages/ResultReportPage';
import ScenarioPage from './pages/ScenarioPage';

export default function App() {
  const { step, setAuthenticated } = useGameFlowStore(
    useShallow(state => ({
      step: state.step,
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
          jsonPath='/JSON/intro_first.json'
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
          jsonPath='/JSON/intro_second.json'
          onNext={() => {
            useGameFlowStore.getState().goto('ONBOARDING');
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
          jsonPath='/JSON/intro_third.json'
          onNext={() => {
            useGameFlowStore.getState().goto('SCENARIO_FLOW');
          }}
        />
      );
    }
    if (step === 'ONBOARDING') {
      return <OnboardingPage />;
    }
    if (step === 'SCENARIO_FLOW') {
      return <ScenarioPage />;
    }
    if (step === 'RESULT_REPORT') {
      return <ResultReportPage />;
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
