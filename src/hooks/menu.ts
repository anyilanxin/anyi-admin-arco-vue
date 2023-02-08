import { computed } from 'vue';
import { useAppStore } from '@/store';

export default function useMenu() {
  const appStore = useAppStore();
  const menuWidth = computed(() => {
    return appStore.collapsed ? 48 : appStore.menuWidth;
  });
  const contentWidthStype = computed(() => {
    const menu = appStore.collapsed ? 48 : appStore.menuWidth;
    return {
      width: `calc(100% - ${menu}px)`,
    };
  });
  return {
    menuWidth,
    contentWidthStype,
  };
}
