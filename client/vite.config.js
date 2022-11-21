import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      /* '/api': {
        target : 'http://jsonplaceholder.typicode.com/users',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }, */ 
      '/back': {
        target : 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/back/, '')
      } 
    }
  }
})