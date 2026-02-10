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
  build: {
    // Performance optimizations
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'wouter'],
          'ui-vendor': ['lucide-react'],
          'analytics': ['react-ga4'],
          // Admin chunks (lazy loaded)
          'admin': [
            './src/pages/admin/Dashboard',
            './src/pages/admin/Applications',
            './src/pages/admin/ComplianceApplications',
            './src/pages/admin/QuestionManager',
            './src/pages/admin/FinancialDataManager',
            './src/pages/admin/AnalyticsDashboard',
          ],
        },
        // Better file naming for caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Source maps for debugging (disable in production if needed)
    sourcemap: false,
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // CSS code splitting
    cssCodeSplit: true,
  },
  // Performance hints
  optimizeDeps: {
    include: ['react', 'react-dom', 'wouter', 'lucide-react', 'react-ga4'],
  },
})
