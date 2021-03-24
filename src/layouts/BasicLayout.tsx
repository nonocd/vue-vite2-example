import { defineComponent, reactive, ref, watch } from 'vue';
import { menus } from '../config/menus';
import ProLayout from '@/layouts/pro-layout';

export default defineComponent({
  name: 'BasicLayout',
  inheritAttrs: false,
  setup() {
    return () => (
      <ProLayout navTheme="light" headerTheme="dark" menus={menus}>
        Content
      </ProLayout>
    );
  },
});
