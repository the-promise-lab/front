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

  return (
    <RootLayout>
      <div>
        {!isLoggedIn ? (
          <LandingPage />
        ) : !gameStarted ? (
          <MainMenu onStartGame={handleStartGame} />
        ) : (
          <ShelfSelection onBackToMenu={handleBackToMenu} />
        )}
      </div>
    </RootLayout>
  );
}

export default App;
