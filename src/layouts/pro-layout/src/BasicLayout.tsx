import { computed, defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import './BasicLayout.less';

const ProLayout = defineComponent({
  name: 'ProLayout',
  props: { prefixCls: { type: String, default: 'ant-pro' } },
  setup(props: { prefixCls: string }) {
    const baseClassName = computed(() => `${props.prefixCls}-basicLayout`);

    return () => (
      <div class={baseClassName.value}>
        <Layout>
          <Layout.Header class={'header'}>
            <div class="logo" />
            <a-menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
              <a-menu-item key="1">nav 1</a-menu-item>
              <a-menu-item key="2">nav 2</a-menu-item>
              <a-menu-item key="3">nav 3</a-menu-item>
            </a-menu>
          </Layout.Header>

          <Layout>
            <Layout.Sider width="200" style={{ background: '#fff' }}>
              <a-menu theme="dark" mode="inline" style={{ height: '100%', borderRight: 0 }}>
                <a-menu-item key="1">option1</a-menu-item>
                <a-menu-item key="2">option2</a-menu-item>
                <a-menu-item key="3">option3</a-menu-item>
                <a-menu-item key="4">option4</a-menu-item>
              </a-menu>
            </Layout.Sider>
            <Layout>
              <Layout.Content
                style={{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }}
              >
                Content
              </Layout.Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  },
});

export default ProLayout;
