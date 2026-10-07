import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const codespaceName = process.env.CODESPACE_NAME || env.VITE_CODESPACE_NAME || ''

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_CODESPACE_NAME': JSON.stringify(codespaceName),
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
    },
  }
})
