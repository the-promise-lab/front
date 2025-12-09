import { useSetBackground } from '@shared/background';
import { ResultReportScreen } from '@features/result-report';
import { sessionIdSelector, useGameFlowStore } from '@processes/game-flow';
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore } from '@shared/auth/model/useAuthStore';
import { useEffect, useState } from 'react';

export default function ResultReportPage() {
  const [resultScreenLoaded, setResultScreenLoaded] = useState(false);
  const sessionId = useGameFlowStore(sessionIdSelector);
  useSetBackground({
    image: 'bg-2.png',
  });
  const { user } = useAuthStore(
    useShallow(state => ({
      user: state.user,
    }))
  );
  const { goto } = useGameFlowStore(
    useShallow(state => ({
      goto: state.goto,
    }))
  );

  const handleGoToMainMenu = () => {
    goto('MAIN_MENU');
  };

  useEffect(() => {
    setTimeout(() => {
      setResultScreenLoaded(true);
    }, 1000);
  }, []);

  if (!resultScreenLoaded) return null;
  return (
    <ResultReportScreen
      onGoToMainMenu={handleGoToMainMenu}
      user={user}
      sessionId={sessionId?.toString() ?? null}
    />
  );
}
