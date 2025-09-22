import { useEffect } from 'react';
import AppProviders from './providers/AppProviders';
import RootLayout from './layout/RootLayout';
import { useGameFlowStore } from '../processes/game-flow';
import { useAuthStore } from '../shared/auth/model/useAuthStore';

// 페이지 컴포넌트들
import AuthCheck from './pages/AuthCheck';
import LandingPage from './pages/LandingPage';
import LoadingPage from './pages/LoadingPage';
import MainMenu from './pages/MainMenu';
import { CharacterSelect } from '../features/character-selection';
import { useCharacterSelectionStore } from '../features/character-selection/model/useCharacterSelectionStore';
import PackingPhase from './pages/PackingPhase';
import EventPhase from './pages/EventPhase';

export default function App() {
  const { step, next, setSelectedCharacter, setAuthenticated, resetDayFlow } =
    useGameFlowStore();
  const { isLoggedIn } = useAuthStore();

  // 인증 상태와 게임 플로우 동기화
  useEffect(() => {
    setAuthenticated(isLoggedIn);
  }, [isLoggedIn, setAuthenticated]);

  // DAY_FLOW 진입 시 DAY_STEP 초기화
  useEffect(() => {
    if (step === 'DAY_FLOW') {
      resetDayFlow();
    }
  }, [step, resetDayFlow]);

  const renderScreen = () => {
    // 인증 상태에 따른 기본 분기
    if (!isLoggedIn) {
      return <LandingPage />;
    }

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
            // 선택된 캐릭터를 게임 플로우에 저장하고 다음 단계로
            const characterStore = useCharacterSelectionStore.getState();
            if (characterStore.selectedCharacter) {
              setSelectedCharacter(characterStore.selectedCharacter.id);
            }
            next();
          }}
          onBack={() => useGameFlowStore.getState().goto('MAIN_MENU')}
        />
      );
    }
    if (step === 'DAY_FLOW') {
      return <EventPhase />;
    }
    if (step === 'PACKING_PHASE') {
      return <PackingPhase />;
    }
    if (step === 'EVENT_PHASE') {
      return <EventPhase />;
    }

    // 기본값 (fallback)
    return <LandingPage />;
  };

  return (
    <AppProviders>
      <RootLayout>
        <div className='fixed inset-0 z-10 touch-pan-y overflow-hidden'>
          {renderScreen()}
        </div>
      </RootLayout>
    </AppProviders>
  );
}
