// src/app/providers/AppProviders.tsx
// 전역 프로바이더 컴포넌트

import { ReactNode } from 'react';

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <>
      {/* 향후 다른 프로바이더들 추가 가능 */}
      {/* 예: ThemeProvider, QueryClient, ErrorBoundary 등 */}
      {children}
    </>
  );
}
