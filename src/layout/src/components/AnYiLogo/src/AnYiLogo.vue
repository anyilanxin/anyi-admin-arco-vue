<template>
  <div
    class="anyi-app-logo-parent"
    :style="{
      'width': menuWidth + 'px',
      '--color-border': colorBorder,
      '--color-background': colorBackground,
    }"
  >
    <img src="/img/logo.png" />
    <div v-if="!collapsed" class="title">安一兰芯</div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useAppStore } from '@/store';

  defineProps({
    colorBorder: {
      type: String,
      default: 'rgb(242,243,245)',
    },
    colorBackground: {
      type: String,
      default: '#ffffff',
    },
    colorColor: {
      type: String,
      default: 'rgb(29 32 40)',
    },
  });
  const appStore = useAppStore();
  const menuWidth = computed(() => {
    return appStore.collapsed ? 48 : appStore.menuWidth;
  });
  const collapsed = computed(() => {
    return appStore.collapsed;
  });
</script>

<style lang="less" scoped>
  .anyi-app-logo-parent {
    height: 60px;
    text-align: left;
    line-height: 60px;
    display: flex;
    padding: 10px 4px 10px 10px;
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-background);
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;
    img {
      width: 32px;
      height: 32px;
    }
    .title {
      padding-left: 7px;
      font-size: 16px;
      font-weight: 700;
      transition: all 0.5s;
      line-height: normal;
      color: rgb(var(--primary-6));
    }
  }

  body[arco-theme='dark'] .anyi-app-logo-parent {
    border-bottom: 1px solid var(--color-fill-2) !important;
    background-color: var(--color-menu-light-bg) !important;
  }
</style>
