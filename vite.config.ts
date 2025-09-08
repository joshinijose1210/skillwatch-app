import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

const PACKAGE_ROOT_PATH = process.cwd();
const DIST = path.resolve(PACKAGE_ROOT_PATH, './dist/app');

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            react(),
            svgr({
                svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
                include: '**/*.svg'
            })
        ],
        build: {
            outDir: DIST,
            rollupOptions: {
                output: {
                    entryFileNames: '[name].[hash].js',
                    chunkFileNames: '[name].[hash].js'
                }
            },
            commonjsOptions: { transformMixedEsModules: true }
        },
        css: {
            modules: false
        },
        define: {
            'process.env': JSON.stringify(env)
        },
        base: mode === 'production' ? '/app' : '/',
        resolve: {
            alias: {
                buffer: 'buffer/',
                '@': '/src',
                '@common': '/src/common',
                '@common/*': '/src/common/*',
                '@components': '/src/components',
                '@components/*': '/src/components/*',
                '@mocks': '/src/mocks',
                '@mocks/*': '/src/mocks/*',
                '@theme': '/src/theme',
                '@theme/*': '/src/theme/*',
                '@utils': '/src/utils',
                '@utils/*': '/src/utils/*',
                '@test-utils': '/src/utils/test-utils',
                '@styled': '/src/utils/styled',
                '@slice': '/src/slice',
                '@slice/*': '/src/slice/*',
                '@routes': '/src/routes',
                '@routes/*': '/src/routes/*',
                '@pages': '/src/pages',
                '@pages/*': '/src/pages/*',
                '@services/*': '/src/services/*',
                '@services': '/src/services',
                '@constants': '/src/constants',
                '@constants/*': '/src/constants/*',
                '@testData': '/src/testData',
                '@testData/*': '/src/testData/*'
            }
        }
    };
});
