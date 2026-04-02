import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, basename } from 'path'

export default defineConfig({
  base: process.env.GITHUB_PAGES ? `/${basename(process.cwd())}/` : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    forwardConsole: {
      unhandledErrors: true,
      logLevels: ['error', 'warn', 'log'],
    },
  },
})
