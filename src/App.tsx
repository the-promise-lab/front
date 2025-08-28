import './App.css';
import { useState } from 'react';
import { useAuthStore, type User } from '@/hooks/store/useAuthStore';
import LandingPage from '@/components/LandingPage';
import MainMenu from '@/components/MainMenu';
import ShelfSelection from '@/components/ShelfSelection';
import OrientationGuard from '@/components/OrientationGuard';

function App() {
  const { isLoggedIn, login } = useAuthStore();
  const [gameStarted, setGameStarted] = useState(false);

  const handleLoginSuccess = (user: User) => {
    login(user);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleBackToMenu = () => {
    setGameStarted(false);
  };

  return (
    <OrientationGuard>
      <div className="App">
        {!isLoggedIn ? (
          <LandingPage onLoginSuccess={handleLoginSuccess} />
        ) : !gameStarted ? (
          <MainMenu onStartGame={handleStartGame} />
        ) : (
          <ShelfSelection onBackToMenu={handleBackToMenu} />
        )}
      </div>
    </OrientationGuard>
  );
}

export default App;
