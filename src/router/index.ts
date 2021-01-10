import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routerMap } from '../config/router.config';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routerMap,
});

export function setupRouter(app: App) {
  app.use(router);
}

export default router;
