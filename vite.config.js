import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/grand-voyage-frontend/',
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all API requests to your Spring Boot backend
      '/api': {
        target: 'http://localhost:8080', // Your .jar backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
      },
      // Add more proxies if needed
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  preview: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})