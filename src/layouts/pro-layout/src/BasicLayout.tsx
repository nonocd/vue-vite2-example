import { computed, defineComponent, ref, toRef } from 'vue';
import { Layout } from 'ant-design-vue';
import { useCollapsed } from './hooks/collapsed';
import { LayoutHeader } from './header';
import { PropTypes } from '/@/utils';
import { SiderMenu } from './menu';
import ProProvider from './ProProvider';
import { MenuDataItem } from './typings';
import './BasicLayout.less';

export type BasicLayoutProps = {
  prefixCls?: string;

  /**
   * 导航菜单颜色
   */
  navTheme?: string;
  /**
   * 顶部菜单的颜色，mix 模式下生效
   */
  headerTheme?: 'dark' | 'light';
  /**
   * 是否可收起
   */
  collapsible?: boolean;
  /**
   * 当前收起状态
   */
  collapsed?: boolean;
  /**
   * 固定侧边栏
   */
  fixSiderbar?: boolean;

  /**
   * 菜单数据
   */
  menus?: MenuDataItem[];
};

const ProLayout = defineComponent({
  name: 'ProLayout',
  setup(props: BasicLayoutProps, { slots }) {
    const { navTheme, headerTheme } = props;
    const baseClassName = computed(() => `${props.prefixCls}-basicLayout`);
    const [collapsed, onCollapse] = useCollapsed(props.collapsed);
    const theme = (navTheme || 'dark').toLocaleLowerCase().includes('dark') ? 'dark' : 'light';

    return () => (
      <ProProvider>
        <div class={baseClassName.value}>
          <Layout>
            <LayoutHeader theme={headerTheme} menuData={props.menus}></LayoutHeader>

            <Layout>
              <SiderMenu
                {...props}
                collapsed={collapsed.value}
                onCollapse={onCollapse}
                theme={theme}
                menuData={props.menus}
              ></SiderMenu>
              <Layout>
                <Layout.Content style={{ padding: '24px', margin: 0, minHeight: '280px' }}>
                  {slots.default?.()}
                </Layout.Content>
              </Layout>
            </Layout>
          </Layout>
        </div>
      </ProProvider>
    );
  },
});

ProLayout.inheritAttrs = false;
ProLayout.props = {
  prefixCls: PropTypes.string.def('ant-pro'),
  /* 导航的主题，side 和 mix 模式下是左侧菜单的主题，top 模式下是顶部菜单 */
  navTheme: PropTypes.string.def('dark'),
  /* 顶部导航的主题，mix 模式生效 */
  headerTheme: PropTypes.string.def('light'),
  /* 是否固定导航 */
  fixSiderbar: PropTypes.bool,
  /* 关于 menu 的配置 */
  menus: PropTypes.array.def([]),
  /* 侧边菜单宽度 */
  siderWidth: PropTypes.number.def(208),
  /* 控制菜单的收起和展开 */
  collapsed: PropTypes.bool,
};
export default ProLayout;
