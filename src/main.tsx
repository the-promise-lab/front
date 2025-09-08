import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@shared/styles/globals.css';
import App from '@app/App.tsx';
import { OpenAPI } from '@api/core/OpenAPI';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/* OpenAPI 전역설정 */
OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL;
// OpenAPI.WITH_CREDENTIALS = true;
// OpenAPI.TOKEN = async () => localStorage.getItem('access_token') ?? '';
OpenAPI.HEADERS = async () => ({ 'X-Client': 'web' });

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
