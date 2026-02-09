import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: false, // Disable error overlay
    },
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
  preview: {
    port: 3000,
  },
})
