import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: false },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      Routes: path.resolve(__dirname, './src/Routes'),
      Components: path.resolve(__dirname, './src/Components'),
      Configs: path.resolve(__dirname, './src/Configs'),
      Context: path.resolve(__dirname, './src/Context'),
      Hooks: path.resolve(__dirname, './src/Hooks'),
      Layout: path.resolve(__dirname, './src/Layout'),
      Mock: path.resolve(__dirname, './src/Mock'),
      Pages: path.resolve(__dirname, './src/Pages'),
      Resources: path.resolve(__dirname, './src/Resources'),
      Schemas: path.resolve(__dirname, './src/Schemas'),
      Services: path.resolve(__dirname, './src/Services'),
      Shared: path.resolve(__dirname, './src/Shared'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
