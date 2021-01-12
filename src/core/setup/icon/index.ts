import { App } from 'vue';
import * as Icons from '@ant-design/icons-vue';

const filterIcons = ['default', 'createFromIconfontCN', 'getTwoToneColor', 'setTwoToneColor'];

export function setupIcons(app: App) {
  Object.keys(Icons)
    .filter(k => !filterIcons.includes(k))
    .forEach(k => {
      app.component(Icons[k].displayName, Icons[k]);
    });
}
