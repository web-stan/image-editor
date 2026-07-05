import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import type { ComponentResolver } from 'unplugin-vue-components/types'

// unplugin-vue-components' built-in VuetifyResolver targets Vuetify 2 (`vuetify/lib`);
// this project uses Vuetify 4, whose components live in `vuetify/components`.
const VuetifyResolver = (): ComponentResolver => ({
  type: 'component',
  resolve: (name) => {
    if (/^V[A-Z]/.test(name)) {
      return { name, from: 'vuetify/components' }
    }
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [VuetifyResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
