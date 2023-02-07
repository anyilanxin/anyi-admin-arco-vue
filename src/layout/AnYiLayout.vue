<template>
  <div class="anyi-layout">
    <AnYiLayoutSidebar v-if="layoutType === 'sidebar'" />
    <AnYiLayoutSidebarMix v-else-if="layoutType === 'sidebar-mix'" />
    <AnYiLayoutTopMenu v-else-if="layoutType === 'top'" />
    <AnYiLayoutTopMenuMix v-else />
    <AnYiSetting />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useAppStore } from '@/store';
  import {
    AnYiLayoutSidebar,
    AnYiLayoutSidebarMix,
    AnYiLayoutTopMenu,
    AnYiLayoutTopMenuMix,
  } from './src';
  import { AnYiSetting } from './src/components';

  const appStore = useAppStore();
  const layoutType = computed(() => appStore.layoutType);
</script>

<script lang="ts">
  export default {
    name: 'AnYiLayout',
  };
</script>

<style lang="less" scoped>
  .anyi-layout {
    width: 100%;
    height: 100%;
    .anyi-layout-content-parent {
      background-color: var(--color-fill-3);
    }
  }
</style>
