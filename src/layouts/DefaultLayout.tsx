import { defineComponent, reactive, ref, watch } from 'vue'
import { RouterView } from 'vue-router'
import { createRouteContext, default as ProLayout } from '@ant-design-vue/pro-layout'
import { menus } from '../config/menus'

export default defineComponent({
  name: 'BasicLayout',
  inheritAttrs: false,
  setup() {
    const state = reactive({
      collapsed: false,

      openKeys: ['/dashboard'],
      selectedKeys: ['/welcome'],
      // setOpenKeys: (keys: string[]) => (state.openKeys = keys),
      // setSelectedKeys: (keys: string[]) => {
      //   console.log('keys', keys)
      //   state.selectedKeys = keys
      // },

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
    })
    const [RouteContextProvider] = createRouteContext()

    const cacheOpenKeys = ref<string[]>([])
    watch(
      () => state.collapsed,
      (collapsed: boolean) => {
        console.log('post watch', collapsed, state.collapsed)
        if (collapsed) {
          cacheOpenKeys.value = state.openKeys
          state.openKeys = []
        } else {
          state.openKeys = cacheOpenKeys.value
        }
      },
      {
        flush: 'pre',
      },
    )

    return () => (
      <RouteContextProvider value={state}>
        <ProLayout
          {...state}
          title={'bee Admin'}
          layout={'side'}
          navTheme={state.navTheme}
          contentWidth={'Fixed'}
          primaryColor={'#1890ff'}
          contentStyle={{ minHeight: '300px' }}
          locale={(i18n: string) => i18n}
        >
          <RouterView />
        </ProLayout>
      </RouteContextProvider>
    )
  },
})
