import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as babel from '@babel/core';

// A very simple Vite plugin support babel transpilation
const babelPlugin = {
  name: 'plugin-babel',
  transform: (src, id) => {
    if (/\.(jsx?|vue)$/.test(id)) {               // the pattern of the file to handle
      return babel.transform(src, {
        filename: id,
        babelrc: true,
      });
    }
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        babelParserPlugins: ['decorators'],     // must enable decorators support
      },
    }),
    babelPlugin,                                // must after the vue plugin
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
