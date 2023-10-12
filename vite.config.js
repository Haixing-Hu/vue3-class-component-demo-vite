/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import babel from '@haixing_hu/vite-plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',                               // use relative pathes for all resources
  plugins: [
    vue({
      script: {
        babelParserPlugins: ['decorators'], // enable decorators support
      },
    }),
    babel(),                                // must after the vue plugin
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
