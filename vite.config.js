import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => { 

  const plugins = [
    react(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),

    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),
  ];

  return {
    plugins: plugins,
    server: {
      proxy: {
        '/api': {
          target: ['http://localhost:8080','https://tech-avinya-backend.onrender.com'], 
          changeOrigin: true,
          secure: false, 
        },
      },
    },
  };
});