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
        '@': '/src',
      }
    }
  };
});
