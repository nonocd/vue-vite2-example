import { Ref, ref } from 'vue';

export function useCollapsed(defaultCollapsed: boolean): [Ref<boolean>, (value: boolean) => void] {
  const collapsed = ref(defaultCollapsed || false);
  const onCollapse = () => {
    collapsed.value = !collapsed.value;
  };

  return [collapsed, onCollapse];
}
