import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,        // allows access from local network
    port: 5173,        // or any port you want
  },
  plugins: [vue()],
})
