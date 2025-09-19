// src/app/pages/AuthCheck/index.tsx
// 인증 상태 확인 컴포넌트

import { useEffect } from 'react';
import { useGameFlowStore } from '../../../processes/game-flow';
import { useCheckAuthState } from '../../../shared/auth/model/useLoginStatus';

export default function AuthCheck() {
  const { setAuthenticated } = useGameFlowStore();
  const { isLoggedIn } = useCheckAuthState();

  useEffect(() => {
    setAuthenticated(isLoggedIn);
  }, [isLoggedIn, setAuthenticated]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-yellow-500"></div>
        <p className="text-gray-600">인증 상태를 확인하는 중...</p>
      </div>
    </div>
  );
}
