import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

const PACKAGE_ROOT_PATH = process.cwd();
const DIST = path.resolve(PACKAGE_ROOT_PATH, './dist');

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
    css: { modules: false },
    define: { 'process.env': JSON.stringify(env) },
    base: '/', // important for Amplify hosting
    resolve: {
      alias: {
        buffer: 'buffer/',
        '@': path.resolve(__dirname, 'src'),
        '@common': path.resolve(__dirname, 'src/common'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@mocks': path.resolve(__dirname, 'src/mocks'),
        '@theme': path.resolve(__dirname, 'src/theme'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@test-utils': path.resolve(__dirname, 'src/utils/test-utils'),
        '@styled': path.resolve(__dirname, 'src/utils/styled'),
        '@slice': path.resolve(__dirname, 'src/slice'),
        '@routes': path.resolve(__dirname, 'src/routes'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@testData': path.resolve(__dirname, 'src/testData'),
      }
    }
  };
});
