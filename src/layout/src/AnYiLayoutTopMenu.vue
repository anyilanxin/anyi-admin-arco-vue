<!--顶部菜单模式-->
<template>
  <a-layout :class="prefixCls">
    <div :class="prefixCls + '-header-parent'">
      <a-layout-header :class="prefixCls + '-header'">
        <AnYiLogo v-if="showLogo" :class="prefixCls + '-header-logo'" />
        <AnYiMenu
          mode="horizontal"
          :class="prefixCls + '-header-menu'"
          :expand-icon-down="false"
          :expand-icon-right="false"
        />
        <AnYiHeaderNavbar :class="prefixCls + '-header-navbar'" />
      </a-layout-header>
      <AnYiTabs v-if="showTab" :class="prefixCls + '-header-tabs'" />
      <AnYiBannerNotice
        v-if="showBannerNotice"
        :class="prefixCls + '-header-banner-notice'"
      />
    </div>
    <a-layout :class="prefixCls + '-content-parent'">
      <AnYiContent />
      <AnYiFooter v-if="showFooter" :class="prefixCls + '-footer'" />
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useAppStore } from '@/store';
  import { useDesign } from '@/hooks/useDesign';
  import {
    AnYiBannerNotice,
    AnYiContent,
    AnYiHeaderNavbar,
    AnYiLogo,
    AnYiMenu,
    AnYiTabs,
  } from './components';

  const { prefixCls } = useDesign('layout-top-menu');
  const appStore = useAppStore();
  const showTab = computed(() => appStore.tabBar);
  const showLogo = computed(() => appStore.showLogo);
  const showBannerNotice = computed(() => appStore.bannerNotice);
  const showFooter = computed(() => appStore.showFooter);
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-layout-top-menu';
  .@{prefix-cls} {
    .@{prefix-cls}-header-parent {
      .@{prefix-cls}-header {
        display: flex;
        height: 60px;
        background-color: var(--color-menu-light-bg);
        justify-content: space-between;
        align-items: center;
      }
    }

     .@{prefix-cls}-content-parent{
      background-color: var(--color-fill-3);
    }
  }
</style>
