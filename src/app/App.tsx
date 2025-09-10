import React from 'react';
import AppProviders from './providers/AppProviders';
import RootLayout from './layout/RootLayout';
import { useGameFlowStore } from '../processes/game-flow';

// 페이지 컴포넌트들
import AuthCheck from './pages/AuthCheck';
import LandingPage from './pages/LandingPage';
import LoginProgress from './pages/LoginProgress';
import MainMenu from './pages/MainMenu';
import { ShelfSelection } from '../features/shelf-selection';
import { CharacterSelect } from '../features/character-selection';
import { useCharacterSelectionStore } from '../features/character-selection/model/useCharacterSelectionStore';

export default function App() {
  const { step, next, back, setSelectedCharacter } = useGameFlowStore();

  return (
    <AppProviders>
      <RootLayout>
        {step === 'AUTH_CHECK' && <AuthCheck />}
        {step === 'LOGIN' && <LandingPage />}
        {step === 'LOGIN_PROGRESS' && <LoginProgress />}
        {step === 'MAIN_MENU' && <MainMenu />}
        {step === 'CHARACTER_SELECT' && (
          <CharacterSelect
            onNext={() => {
              // 선택된 캐릭터를 게임 플로우에 저장하고 다음 단계로
              const characterStore = useCharacterSelectionStore.getState();
              if (characterStore.selectedCharacter) {
                setSelectedCharacter(characterStore.selectedCharacter.id);
              }
              next();
            }}
            onBack={back}
          />
        )}
        {step === 'PLAYING' && <ShelfSelection onBack={back} />}
      </RootLayout>
    </AppProviders>
  );
}
