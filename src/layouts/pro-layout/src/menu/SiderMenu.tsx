import { computed, FunctionalComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { useProProvider } from '../ProProvider';
import BaseMenu, { BaseMenuProps } from './BaseMenu';
import './index.less';

export interface SiderMenuProps extends BaseMenuProps {
  siderWidth?: number;
  collapsedWidth?: number;
  fixed?: boolean;
  hide?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  fixSiderbar?: boolean;
}

const SiderMenu: FunctionalComponent<SiderMenuProps> = (props: SiderMenuProps) => {
  const { collapsed, siderWidth, collapsedWidth = 48 } = props;
  const { getPrefixCls } = useProProvider();
  const baseClassName = getPrefixCls('sider');

  const classNames = computed(() => {
    return {
      [baseClassName]: true,
      [`${baseClassName}-${props.theme}`]: true,
      [`${baseClassName}-fixed`]: props.fixSiderbar,
    };
  });

  const runtimeSideWidth = computed(() =>
    props.collapsed ? props.collapsedWidth : props.siderWidth,
  );

  return (
    <>
      {props.fixSiderbar && (
        <div
          style={{
            width: `${runtimeSideWidth.value}px`,
            overflow: 'hidden',
            flex: `0 0 ${runtimeSideWidth.value}px`,
            maxWidth: `${runtimeSideWidth.value}px`,
            minWidth: `${runtimeSideWidth.value}px`,
          }}
        />
      )}
      <Layout.Sider
        class={classNames.value}
        collapsible={true}
        collapsed={collapsed}
        collapsedWidth={collapsedWidth}
        theme={props.theme}
        width={siderWidth}
        onCollapse={props.onCollapse}
        trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      >
        <div style="flex: 1; overflow: hidden auto;">
          <BaseMenu
            mode="inline"
            theme={props.theme}
            collapsed={props.collapsed}
            menuData={props.menuData}
            style={{
              width: '100%',
            }}
            class={`${baseClassName}-menu`}
          ></BaseMenu>
        </div>
      </Layout.Sider>
    </>
  );
};

export default SiderMenu;
