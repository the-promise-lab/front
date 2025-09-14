import { useState } from 'react';
import LandingPage from '@app/pages/LandingPage';
import MainMenu from '@app/pages/MainMenu';
import { ShelfSelection } from '@features/shelf-selection';
import RootLayout from '@app/layout/RootLayout';
import { useCheckAuthState } from '@shared/auth/model/useLoginStatus';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const { isLoggedIn } = useCheckAuthState();

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleBackToMenu = () => {
    setGameStarted(false);
  };

  const renderScreen = () => {
    // TODO: GameFlow 구현되면 내부 로직을 수정/개선
    if (!isLoggedIn) {
      return <LandingPage />;
    }
    if (!gameStarted) {
      return <MainMenu onStartGame={handleStartGame} />;
    }
    return <ShelfSelection onBackToMenu={handleBackToMenu} />;
  };

  return (
    <RootLayout>
      <div className="fixed inset-0 z-10 touch-pan-y overflow-hidden">
        {renderScreen()}
      </div>
    </RootLayout>
  );
}

export default App;
