import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          login: path.resolve(__dirname, 'pages/login.html'),
          dashboard: path.resolve(__dirname, 'pages/dashboard.html'),
          tasks: path.resolve(__dirname, 'pages/tasks.html'),
          leaves: path.resolve(__dirname, 'pages/leaves.html'),
          calendar: path.resolve(__dirname, 'pages/calendar.html'),
          profile: path.resolve(__dirname, 'pages/profile.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
  };
});
