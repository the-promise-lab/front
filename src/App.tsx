import './App.css';
import { useState, useEffect } from 'react';
import { useAuthStore, type User } from '@/hooks/store/useAuthStore';
import LandingPage from '@/components/LandingPage';
import MainMenu from '@/components/MainMenu';
import ShelfSelection from '@/components/ShelfSelection';
import OrientationGuard from '@/components/OrientationGuard';

function App() {
  const { isLoggedIn, login } = useAuthStore();
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // URL에서 인증 결과 확인 (서버에서 카카오 로그인 완료 후 돌아온 경우)
    const urlParams = new URLSearchParams(window.location.search);
    const authResult = urlParams.get('auth');
    const error = urlParams.get('error');
    const token = urlParams.get('token');
    const userData = urlParams.get('user');

    if (authResult === 'success' && token && userData) {
      try {
        // 서버에서 받은 사용자 정보 파싱
        const user: User = JSON.parse(decodeURIComponent(userData));

        // 로그인 처리
        login(user, token);

        // URL 정리 (토큰과 사용자 정보를 URL에서 제거)
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      } catch (error) {
        console.error('사용자 정보 파싱 오류:', error);
      }
    } else if (error) {
      console.error('인증 오류:', error);
      // 오류 처리 (필요시 사용자에게 알림)
    }
  }, [login]);

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
