import { setupApiClient } from '@shared/auth/lib/setup';

// API 클라이언트 초기화 (BASE URL, TOKEN, CREDENTIALS 설정)
setupApiClient();

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@shared/styles/globals.css';
import App from '@app/App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
