import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Increases the warning limit from 500kB to 1000kB (1MB)
    chunkSizeWarningLimit: 1000, 
  }
})