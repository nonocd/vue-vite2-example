import { App } from 'vue';
import * as Icon from '@ant-design/icons-vue';

declare module '@ant-design/icons-vue/lib/index' {
  type Icon = {
    [key: string]: any;
  };
}

export function setupIcons(app: App<Element>) {
  const filterIcons = ['default', 'createFromIconfontCN', 'getTwoToneColor', 'setTwoToneColor'];
  Object.keys(Icon)
    .filter(k => !filterIcons.includes(k))
    .forEach(k => {
      app.component(Icon[k].displayName, Icon[k]);
    });
}
