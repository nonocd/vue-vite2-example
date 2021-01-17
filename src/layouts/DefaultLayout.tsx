import { defineComponent, reactive, ref, watch } from 'vue';
import {
  createRouteContext,
  default as ProLayout,
  RouteContextProps,
} from '@ant-design-vue/pro-layout';
import { menus } from '../config/menus';

export default defineComponent({
  name: 'BasicLayout',
  inheritAttrs: false,
  setup() {
    const state = reactive<RouteContextProps>({
      collapsed: false,

      openKeys: ['/dashboard'],
      setOpenKeys: (keys: string[]) => (state.openKeys = keys),
      selectedKeys: ['/welcome'],
      setSelectedKeys: (keys: string[]) => {
        console.log('keys', keys);
        state.selectedKeys = keys;
      },

      navTheme: 'dark',
      isMobile: false,
      fixSiderbar: false,
      fixedHeader: false,
      menuData: menus,
      sideWidth: 208,
      splitMenus: true,
      hasSideMenu: true,
      hasHeader: true,
      hasFooterToolbar: false,
      setHasFooterToolbar: (has: boolean) => (state.hasFooterToolbar = has),
    });
    const [RouteContextProvider] = createRouteContext();

    const cacheOpenKeys = ref<string[]>([]);
    watch(
      () => state.collapsed,
      (collapsed: boolean) => {
        console.log('post watch', collapsed, state.collapsed);
        if (collapsed) {
          cacheOpenKeys.value = state.openKeys;
          state.openKeys = [];
        } else {
          state.openKeys = cacheOpenKeys.value;
        }
      },
      {
        flush: 'pre',
      },
    );

    return () => (
      <RouteContextProvider value={state}>
        <ProLayout
          v-model={[state.collapsed, 'collapsed']}
          title={'bee Admin'}
          layout={'side'}
          navTheme={state.navTheme}
          i18n={(key: string) => key}
          isMobile={state.isMobile}
          fixSiderbar={state.fixSiderbar}
          fixedHeader={state.fixedHeader}
          contentWidth={'Fixed'}
          primaryColor={'#1890ff'}
          contentStyle={{ minHeight: '300px' }}
          siderWidth={state.sideWidth}
          splitMenus={state.splitMenus}
        >
          <router-view />
        </ProLayout>
      </RouteContextProvider>
    );
  },
});
