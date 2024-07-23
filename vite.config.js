import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import copy from 'rollup-plugin-copy';
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
    return {
        plugins: [
            vue(),
            visualizer({
                gzipSize: true,
                brotliSize: true,
                emitFile: false,
                filename: "test.html", //分析图生成的文件名
                open:true //如果存在本地服务端口，将在打包后自动展示
            })
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
                external: [/node_modules/],
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
