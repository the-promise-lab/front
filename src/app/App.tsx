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
    // 디버깅: 현재 step 상태 확인
    console.log('App.tsx - Current step:', step);

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
            console.log('CharacterSelect onNext called');
            const gameFlowStore = useGameFlowStore.getState();
            const characterStore = useCharacterSelectionStore.getState();

            // 선택된 캐릭터 세트를 전역 상태에 저장
            const selectedSet = characterStore.selectedCharacterSet;
            if (selectedSet && !selectedSet.isLocked) {
              // 캐릭터 세트의 캐릭터들을 전역 상태로 변환 (초기값: mentality 50, hp 50)
              gameFlowStore.setCharacters(
                selectedSet.characters.map((character, index) => ({
                  name: character.name,
                  image: character.image,
                  mentality: 50,
                  hp: 50,
                  colors:
                    index === 0
                      ? { backgroundColor: '#5C35A299', borderColor: '#CE96F1' }
                      : {
                          backgroundColor: '#5B707E99',
                          borderColor: '#9FEFD2',
                        },
                }))
              );

              setSelectedCharacter(selectedSet.id);
            }

            console.log('Calling next() from CHARACTER_SELECT');
            next();
          }}
          onBack={() => useGameFlowStore.getState().goto('MAIN_MENU')}
        />
      );
    }
    if (step === 'PACKING_PHASE') {
      return <PackingPhase />;
    }
    if (step === 'DAY_FLOW') {
      return <EventPhase />;
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
