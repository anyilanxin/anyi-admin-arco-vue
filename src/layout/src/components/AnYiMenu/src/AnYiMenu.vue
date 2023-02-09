<template>
  <a-menu
    ref="menuDomRef"
    v-model:collapsed="collapsed"
    v-model:open-keys="openKeys"
    :theme="theme"
    :accordion="accordion"
    :auto-scroll-into-view="true"
    :show-collapse-button="appStore.device !== 'mobile'"
    :auto-open="false"
    :expand-icon-down="false"
    :selected-keys="selectedKey"
    :auto-open-selected="true"
    :level-indent="34"
    style="height: 100%"
    :on-collapse="setCollapse"
  >
    <AnYiMenuItem
      v-for="subItem in menuTree"
      :key="subItem.path"
      :first-menu-item="true"
      :menu-item="subItem"
    />
  </a-menu>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { RouteRecordRaw } from 'vue-router';
  import { useAppStore } from '@/store';
  import { listenerRouteChange } from '@/utils/route-listener';
  import useMenuTree from './use-menu-tree';
  import AnYiMenuItem from './AnYiMenuItem.vue';

  const openKeys = ref<string[]>([]);
  const selectedKey = ref<string[]>([]);
  const appStore = useAppStore();
  const menuDomRef = ref();

  const { menuTree } = useMenuTree();
  const collapsed = computed({
    get() {
      if (appStore.device === 'desktop') return appStore.collapsed;
      return false;
    },
    set(value: boolean) {
      appStore.updateSettings({ collapsed: value });
    },
  });

  const accordion = computed(() => {
    return appStore.accordion;
  });
  const theme = computed(() => {
    console.log('-------appStore.menuTheme-------', appStore.menuTheme);
    return appStore.menuTheme === 'dark' ? 'dark' : 'light';
  });
  const findMenuOpenKeys = (target: string) => {
    const result: string[] = [];
    let isFind = false;
    const backtrack = (item: RouteRecordRaw, keys: string[]) => {
      if (item.path === target) {
        isFind = true;
        result.push(...keys);
        return;
      }
      if (item.children?.length) {
        item.children.forEach((el) => {
          backtrack(el, [...keys, el.path as string]);
        });
      }
    };
    menuTree.value.forEach((el: RouteRecordRaw) => {
      if (isFind) return; // Performance optimization
      backtrack(el, [el.path as string]);
    });
    return result;
  };
  listenerRouteChange((newRoute) => {
    const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta;
    if (requiresAuth && (!hideInMenu || activeMenu)) {
      const menuOpenKeys = findMenuOpenKeys(
        (activeMenu || newRoute.fullPath) as string
      );

      const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
      openKeys.value = [...keySet];
      selectedKey.value = [activeMenu || menuOpenKeys[menuOpenKeys.length - 1]];
    }
  }, true);
  const setCollapse = (val: boolean) => {
    if (appStore.device === 'desktop')
      appStore.updateSettings({ menuCollapse: val });
  };
</script>

<style lang="less" scoped>
  :deep(.arco-menu-inner > .arco-menu-selected > .arco-menu-icon > svg) {
    color: rgb(var(--primary-6));
  }

  :deep(.arco-menu-inner > .arco-menu-selected > .arco-menu-title) {
    color: rgb(var(--primary-6));
  }
  :deep(
      .arco-trigger-popup
        > .arco-trigger-popup-wrapper
        > .arco-trigger-content
        > .arco-trigger-menu
        > .arco-trigger-menu-inner
        > .arco-trigger-menu-selected
    ) {
    color: rgb(var(--primary-6));
  }

  :deep(
      .arco-menu-inner
        > .arco-menu-inline
        > .arco-menu-inline-content
        > .arco-menu-selected
        > .arco-menu-item-inner
    ) {
    color: rgb(var(--primary-6));
  }

  :deep(.arco-menu-inner) {
    .arco-menu-inline-header {
      display: flex;
      align-items: center;
    }

    .arco-icon {
      &:not(.arco-icon-down) {
        font-size: 18px;
      }
    }
  }
</style>
