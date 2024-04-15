import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  plugins: [
    react(),
    envCompatible()
  ],
  define: {
    'process.env.REACT_OPEN_WEATHER_API_KEY': process.env.REACT_OPEN_WEATHER_API_KEY,
  },
});
