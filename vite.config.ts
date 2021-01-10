import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

const alias: Record<string, string> = {
  '@': pathResolve('src'),
};

export default defineConfig({
  // alias,
  plugins: [vue(), vueJsx({})],
  optimizeDeps: {
    include: ['ant-design-vue/es/locale/zh_CN'],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
