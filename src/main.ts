import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import 'ant-design-vue/dist/antd.css';
import { setupAntd } from './core/setup/and-design-vue';
import { setupIcons } from './core/setup/icon';

import './global.less';

const app = createApp(App);

setupAntd(app);
setupIcons(app);

setupRouter(app);
router.isReady().then(() => {
  app.mount('#app');
});
