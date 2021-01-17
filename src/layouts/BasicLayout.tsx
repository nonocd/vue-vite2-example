import { defineComponent, reactive, ref, watch } from 'vue';
import { menus } from '../config/menus';
import ProLayout2 from '/@/layouts/pro-layout';

export default defineComponent({
  name: 'BasicLayout',
  inheritAttrs: false,
  setup() {
    return () => <ProLayout2></ProLayout2>;
  },
});
