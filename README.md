# vue3-class-component-demo-vite

This is a demo project of [vue3-class-component], using [create-vue] with [vite]
template.

The following steps will guide you through the project creation process.

1.  Create a Vue3 project using [create-vue] with [vite] template.
    ```shell
    npm create vue
    ```

2.  Upgrade yarn to modern version
    ```shell
    cd vue3-class-component-demo-webpack
    corepack enable
    yarn set version stable
    ```
    Add the following content to `.yarnrc.yml`:
    ```
    nodeLinker: pnpm
    ```
    Add the following content to `.gitignore`:
    ```
    # yarn 2.x
    .pnp.*
    .yarn/*
    !.yarn/patches
    !.yarn/plugins
    !.yarn/releases
    !.yarn/sdks
    !.yarn/versions
    ```

3.  Upgrade dependencies
    ```shell
    yarn up vue vite @vitejs/plugin-vue
    ```

4.  Add required dependencies
    ```shell
    yarn add @haixing_hu/vue3-class-component
    yarn add --dev @babel/core @babel/runtime @babel/preset-env
    yarn add --dev @babel/plugin-proposal-decorators @babel/plugin-transform-class-properties @babel/plugin-transform-runtime
    ```

5.  Add a new `babelrc.json` file with the following content:
    ```json
    {
      "presets": [
        ["@babel/preset-env", { "modules": false }]
      ],
      "plugins": [
        "@babel/plugin-transform-runtime",
        ["@babel/plugin-proposal-decorators", { "version": "2023-05" }],
        "@babel/plugin-transform-class-properties"
      ]
    }
    ```
    **Note:** When bundling with [vite], make sure to set the `modules` parameter
    of `@babel/preset-env` to `false`.

6.  Configure [vite] by modifying the `vite.config.js` file to add support for
    [Babel]. A possible `vite.config.js` file is as follows:
    ```js
    import { fileURLToPath, URL } from 'node:url';
    import { defineConfig } from 'vite';
    import vue from '@vitejs/plugin-vue';
    import * as babel from '@babel/core';
    
    // A very simple Vite plugin support babel transpilation
    const babelPlugin = {
      name: 'plugin-babel',
      transform: (src, id) => {
        if (/\.(jsx?|vue)$/.test(id)) {              // the pattern of the file to handle
          return babel.transform(src, {
            filename: id,
            babelrc: true,
          });
        }
      },
    };

    export default defineConfig({
      plugins: [
        vue({
          script: {
            babelParserPlugins: ['decorators'],     // must enable decorators support
          },
        }),
        babelPlugin,                                // must be after the vue plugin
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
    });
    ```
    **Note:** In the above configuration file, we've implemented a simple [Vite]
    plugin to transpile the code processed by the [vite-plugin-vue] plugin using
    [Babel]. Although there's a [vite-plugin-babel] plugin that claims to add
    [Babel] support to [vite], we found it doesn't correctly handle [vue] Single
    File Components (SFCs). After closely examining its source code, we
    determined that to achieve correct transpilation, we need to apply [Babel]
    after [vite-plugin-vue] processes the source code. Therefore, the very
    simple plugin function above suffices for our needs. 

7.  As an alternative, you can use [our version of vite-plugin-babel]. The 
   `vite.config.js` can be simplified as follows:
    ```js
    import { fileURLToPath, URL } from 'node:url';
    import { defineConfig } from 'vite';
    import vue from '@vitejs/plugin-vue';
    import babel from '@haixing_hu/vite-plugin-babel';
    
    export default defineConfig({
      plugins: [
        vue({
          script: {
            babelParserPlugins: ['decorators'],     // must enable decorators support
          },
        }),
        babel(),                                    // must be after the vue plugin
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
    });
    ```

8.  Edit `src/components/HelloWorld.vue` to modify its `<script>` content as follows:
    ```javascript
    import { Component, Prop, toVue } from '@haixing_hu/vue3-class-component';

    @Component
    class HelloWorld {
      @Prop
      msg = ''
    }

    export default toVue(HelloWorld);
    ```
    **NOTE:** You MUST remove the `setup` in the `<script>` tag.

9.  Edit `src/components/TheWelcome.vue` to modify its `<script>` content as follows:
    ```javascript
    import { Component, toVue } from '@haixing_hu/vue3-class-component';
    import WelcomeItem from './WelcomeItem.vue'
    import DocumentationIcon from './icons/IconDocumentation.vue'
    import ToolingIcon from './icons/IconTooling.vue'
    import EcosystemIcon from './icons/IconEcosystem.vue'
    import CommunityIcon from './icons/IconCommunity.vue'
    import SupportIcon from './icons/IconSupport.vue'
    
    @Component({
      components: {
        WelcomeItem,
        DocumentationIcon,
        ToolingIcon,
        EcosystemIcon,
        CommunityIcon,
        SupportIcon,
      },
    })
    class TheWelcome {
    //  empty
    }
    
    export default toVue(TheWelcome);
    ```
    **NOTE:** You MUST remove the `setup` in the `<script>` tag.
10. Edit `src/App.vue` to modify its `<script>` content as follows:
    ```javascript
    import { Component, toVue } from '@haixing_hu/vue3-class-component';
    import HelloWorld from './components/HelloWorld.vue';
    import TheWelcome from './components/TheWelcome.vue';

    @Component({
      components: {
        HelloWorld,
        TheWelcome,
      },
    })
    class App {
      // empty
    }

    export default toVue(App);
    ```

11. Run the dev-server
    ```shell
    yarn dev
    ```

[vue3-class-component]: https://github.com/Haixing-Hu/vue3-class-component
[create-vue]: https://github.com/vuejs/create-vue
[vite]: https://vitejs.dev/
[Babel]: https://babeljs.io/
[vite-plugin-vue]: https://www.npmjs.com/package/@vitejs/plugin-vue
[vite-plugin-babel]: https://www.npmjs.com/package/vite-plugin-babel
[our version of vite-plugin-babel]: https://npmjs.com/package/@haixing_hu/vite-plugin-babel
