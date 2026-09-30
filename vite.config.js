import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/personal-website/',
  preview: {
    // allow SSH-tunnel hosts (localhost.run etc.) when sharing a preview
    allowedHosts: true,
  },
})
