import {
  computed,
  defineComponent,
  isVNode,
  PropType,
  resolveComponent,
  toRefs,
  VNode,
  VNodeChild,
} from 'vue';
import { Menu } from 'ant-design-vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import { FormatMessage, MenuDataItem, MenuMode, MenuTheme } from '../typings';
import defaultSettings from '../defaultSettings';
import { isImg, isUrl } from '../utils';
import './index.less';

export interface BaseMenuProps {
  prefixCls?: string;
  collapsed?: boolean;
  mode?: MenuMode;
  theme?: MenuTheme;
  i18n?: FormatMessage;
  menuData?: MenuDataItem[];
}

const baseMenuProps = {
  menuData: Array as PropType<MenuDataItem[]>,
  // top-nav-header: horizontal
  mode: {
    type: String as PropType<MenuMode>,
    default: 'inline',
  },
  theme: {
    type: String as PropType<BaseMenuProps['theme']>,
    default: 'dark',
  },
  collapsed: {
    type: Boolean as PropType<boolean | undefined>,
    default: false,
  },
  i18n: {
    type: Function as PropType<FormatMessage>,
    default: (t: string): string => t,
  },
};

export default defineComponent({
  name: 'BaseMenu',
  props: baseMenuProps,
  setup(props) {
    const { mode, i18n } = toRefs(props);
    const isInline = computed(() => mode.value === 'inline');

    return () => (
      <Menu
        key="Menu"
        inlineCollapsed={(isInline.value && props.collapsed) || undefined}
        inlineIndent={16}
        mode={props.mode}
        theme={props.theme}
        class={{ 'top-nav-menu': props.mode == 'horizontal' }}
      >
        {props.menuData &&
          props.menuData.map(menu => {
            if (menu.meta.hidden) {
              return null;
            }
            return renderMenu(menu, i18n.value);
          })}
      </Menu>
    );
  },
});

const httpReg = /(http|https|ftp):\/\/([\w.]+\/?)\S*/;

const renderTitle = (title: string | undefined, i18nRender: FormatMessage) => {
  return <span>{(i18nRender && title && i18nRender(title)) || title}</span>;
};

const renderMenu = (item: MenuDataItem, i18nRender: FormatMessage) => {
  if (item && !item.meta.hidden) {
    const hasChild = item.children && !item.meta?.hideChildInMenu;
    return hasChild ? renderSubMenu(item, i18nRender) : renderMenuItem(item, i18nRender);
  }
  return null;
};

const renderMenuItem = (item: MenuDataItem, i18nRender: FormatMessage) => {
  const meta = Object.assign({}, item.meta);
  const target = meta.target || null;
  const hasRemoteUrl = httpReg.test(item.path);
  const CustomTag: any = resolveComponent((target && 'a') || 'router-link');
  const props = { to: { name: item.name } };
  const attrs = hasRemoteUrl || target ? { href: item.path, target: target } : {};
  if (item.children && item.meta?.hideChildInMenu) {
    // 把有子菜单的 并且 父菜单是要隐藏子菜单的
    // 都给子菜单增加一个 hidden 属性
    // 用来给刷新页面时， selectedKeys 做控制用
    item.children.forEach(cd => {
      cd.meta = Object.assign(cd.meta || {}, { hidden: true });
    });
  }

  return (
    <Menu.Item key={item.path}>
      <CustomTag {...attrs} {...props}>
        <LazyIcon icon={meta.icon} />
        {renderTitle(meta.title, i18nRender)}
      </CustomTag>
    </Menu.Item>
  );
};

const renderSubMenu = (item: MenuDataItem, i18nRender: FormatMessage) => {
  const renderMenuContent = (
    <span>
      <LazyIcon icon={item.meta?.icon} />
      <span>{renderTitle(item.meta?.title, i18nRender)}</span>
    </span>
  ) as string & VNode;

  return (
    <Menu.SubMenu key={item.path} title={renderMenuContent}>
      {!item.meta?.hideChildInMenu && item.children.map(cd => renderMenu(cd, i18nRender))}
    </Menu.SubMenu>
  );
};

const IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
});

const LazyIcon = (props: any) => {
  const { icon, prefixCls } = props;
  if (!icon) {
    return null;
  }
  if (typeof icon === 'string' && icon !== '') {
    if (isUrl(icon) || isImg(icon)) {
      return <img src={icon} alt="icon" class={`${prefixCls}-sider-menu-icon`} />;
    }
    if (icon.startsWith('icon-')) {
      return <IconFont type={icon} />;
    }
  }
  if (isVNode(icon)) {
    return icon;
  }
  const LazyIcon = resolveComponent(icon) as any;
  return (typeof LazyIcon === 'function' && <LazyIcon />) || null;
};

LazyIcon.icon = {
  type: [String, Function, Object] as PropType<string | Function | VNodeChild | JSX.Element>,
};
