import { useState, useEffect } from 'react';
import { useAuthStore, type User } from '@processes/auth/model/useAuthStore';
import LandingPage from '@app/pages/LandingPage';
import MainMenu from '@app/pages/MainMenu';
import { ShelfSelection } from '@features/shelf-selection';
import RootLayout from '@app/layout/RootLayout';
import { config } from '@/config/env';

function App() {
  const { isLoggedIn, login } = useAuthStore();
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // 서버에서 쿠키로 로그인 처리 후 돌아온 경우
    const checkLoginStatus = async () => {
      try {
        // 서버에 프로필 요청 (쿠키에 JWT 토큰이 포함됨)
        const response = await fetch(
          `${config.API_BASE_URL}/api/auth/profile`,
          {
            method: 'GET',
            credentials: 'include', // 쿠키 포함
          }
        );

        if (response.ok) {
          const userData = await response.json();
          console.log('🔍 서버에서 받은 사용자 정보:', userData);

          // 로그인 처리 (토큰은 쿠키에 있으므로 별도로 전달하지 않음)
          login(userData, 'cookie-based-token');
        } else {
          console.log('로그인되지 않은 상태');
        }
      } catch (error) {
        console.error('로그인 상태 확인 실패:', error);
      }
    };

    checkLoginStatus();
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
    <RootLayout>
      <div>
        {!isLoggedIn ? (
          <LandingPage onLoginSuccess={handleLoginSuccess} />
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
