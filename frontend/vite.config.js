// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Configure proxy to forward API calls to the Express backend
    proxy: {
      '/api': {
        target: 'https://product-enquiries-1.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});