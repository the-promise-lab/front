import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import './styles/input.css';
import { OpenAPI } from './api/core/OpenAPI';

/* OpenAPI 전역설정 */
OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL;
// OpenAPI.WITH_CREDENTIALS = true;
// OpenAPI.TOKEN = async () => localStorage.getItem('access_token') ?? '';
OpenAPI.HEADERS = async () => ({ 'X-Client': 'web' });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
