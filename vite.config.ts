import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

export default defineConfig({
  alias: [
    { find: '/@', replacement: resolve(__dirname, 'src/') },
    { find: '~', replacement: resolve(__dirname, '') },
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  plugins: [vue(), vueJsx()],
  optimizeDeps: {
    include: ['ant-design-vue/es/locale/zh_CN', 'moment/dist/locale/zh-cn'],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        plugins: [],
        additionalData: (source: string, filename: string): string => {
          console.warn('filename：', filename);
          return source.replace(/~/g, '');
        },
      },
    },
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8080',
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});
