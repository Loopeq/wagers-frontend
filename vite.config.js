import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [
    vue(),     
    svgLoader({
        svgo: true,
        svgoConfig: {
        plugins: [
            { name: 'removeDimensions', active: false },
        ]
        }
    })
    ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 8080,
    proxy: {
      '/v1': {
        target: 'http://localhost:3859',
        changeOrigin: true,
        ws: true
      }
    }
  },
  build: {
    outDir: 'public',
  }
});