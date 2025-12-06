import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000, // 원하는 포트 번호로 변경
    open: true,
    host: true,
    proxy: {
      '/cdn-proxy': {
        target: 'https://21009ea64690489baefd3170429f0a50.kakaoiedge.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/cdn-proxy/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  preview: {
    port: 4173,
    open: true,
  },
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@processes': fileURLToPath(new URL('./src/processes', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
      '@entities': fileURLToPath(new URL('./src/entities', import.meta.url)),
    },
  },
});
