import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_URL || 'http://localhost:8001'

  return {
    plugins: [react()],
    server: {
      port: 3001,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
        }
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      // Minify with esbuild (default, fastest)
      minify: 'esbuild',
      // Raise warning limit; pages are lazy so per-chunk size is fine
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          // Each lazy page becomes its own chunk automatically via dynamic import.
          // We only need to split the heavy shared vendor libraries.
          manualChunks(id) {
            if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
              return 'react-core'
            }
            if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-router/') || id.includes('node_modules/@remix-run')) {
              return 'router'
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'icons'
            }
            if (id.includes('node_modules/react-hot-toast')) {
              return 'toast'
            }
          },
        }
      }
    }
  }
})
