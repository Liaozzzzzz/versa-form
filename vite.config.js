import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import copy from 'rollup-plugin-copy';

export default defineConfig(({ mode }) => {
    return {
        plugins: [
            vue(),
            // AutoImport({
            //     resolvers: [ElementPlusResolver()]
            // }),
            // Components({
            //     resolvers: [ElementPlusResolver()]
            // }),
            // copy({
            //     hook: 'generateBundle',
            //     targets: [
            //         {
            //             src: './node_modules/element-plus/theme-chalk/base.css',
            //             dest: './lib'
            //         }
            //     ]
            // })
        ],
        build: {
            target: 'es2015',
            lib: {
                entry: resolve(__dirname, 'src/components/index.js'),
                name: '@versa/form',
                fileName: (module) => `[name].${module}.js`,
                formats: ['es']
            },
            rollupOptions: {
                external: ['vue'],
                output: {
                    globals: {
                        vue: 'Vue'
                    }
                }
            },
            outDir: 'lib'
        },
        // for those who develop in a virtual machine
        server: {
            port: 8888,
        },
    }
});
