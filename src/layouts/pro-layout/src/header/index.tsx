import { computed, FunctionalComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import { BaseMenu } from '../menu';
import { MenuTheme } from '../typings';
import { BaseMenuProps } from '../menu/BaseMenu';
import { useProProvider } from '../ProProvider';
import './index.less';

interface HeaderProps extends BaseMenuProps {}

export const LayoutHeader: FunctionalComponent<HeaderProps> = (props, { slots }) => {
  const { theme = 'dark', prefixCls: customPrefixCls } = props;
  const { getPrefixCls } = useProProvider();
  const prefixCls = customPrefixCls || getPrefixCls();
  const classNames = computed(() => {
    return {
      [`${prefixCls}-basic-layout-header`]: true,
      ['header-light']: theme === 'light',
    };
  });
  const logoClassNames = `${prefixCls}-basic-layout-header-logo`;

  return (
    <Layout.Header class={classNames.value}>
      <div class={logoClassNames}>
        Logo
      </div>
      <BaseMenu theme={theme as MenuTheme} mode="horizontal" menuData={props.menuData}></BaseMenu>
      <div>用户信息</div>
    </Layout.Header>
  );
};
