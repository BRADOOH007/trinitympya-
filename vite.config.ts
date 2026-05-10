import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    // Bundle these into the SSR output instead of treating as externals
    // so ESM imports work correctly
    noExternal: ['react-helmet-async', 'react-router-dom'],
  },
})
