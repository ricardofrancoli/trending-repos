/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    globals: true,
    setupFiles: './src/setupTest.ts',
    environmentMatchGlobs: [
      ['src/**', 'happy-dom'],
      ['src/api/*.spec.ts', 'node'],
    ],
  },
});
