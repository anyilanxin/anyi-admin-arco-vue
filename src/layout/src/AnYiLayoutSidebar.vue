<!--左侧菜单模式模式-->
<template>
  <a-layout :class="prefixCls">
    <a-layout-sider
      breakpoint="xl"
      :collapsed="collapsed"
      :collapsible="true"
      :width="menuWidth"
      :hide-trigger="true"
      @collapse="setCollapsed"
    >
      <AnYiLogo
        v-if="showLogo"
        :color-background="logoColorBackground"
        :color-border="logoColorBorder"
      />
      <a-scrollbar style="height: calc(100vh - 60px); overflow: auto">
        <AnYiMenu
          :class="prefixCls + '-menu'"
          :expand-icon-down="false"
          :expand-icon-right="false"
        />
      </a-scrollbar>
    </a-layout-sider>
    <a-layout>
      <div :class="prefixCls + '-header-parent'">
        <a-layout-header
          v-if="appStore.topNavbar"
          :class="prefixCls + '-header'"
        >
          <AnYiBreadcrumb v-if="breadcrumb" />
          <span v-else></span>
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
        <AnYiFooter v-if="showFooter" />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useAppStore } from '@/store';
  import useResponsive from '@/hooks/responsive';
  import { useDesign } from '@/hooks/useDesign';
  import {
    AnYiBannerNotice,
    AnYiBreadcrumb,
    AnYiContent,
    AnYiHeaderNavbar,
    AnYiLogo,
    AnYiMenu,
    AnYiTabs,
  } from './components';

  const { prefixCls } = useDesign('layout-sidebar');
  const appStore = useAppStore();
  useResponsive(true);
  const showLogo = computed(() => appStore.showLogo);
  const menuWidth = computed(() => {
    return appStore.menuCollapse ? 48 : appStore.menuWidth;
  });
  const collapsed = computed(() => {
    return appStore.collapsed;
  });
  const setCollapsed = (val: boolean) => {
    appStore.updateSettings({ collapsed: val });
  };
  const logoColorBackground = computed(() => appStore.menuColor);
  const logoColorBorder = computed(() =>
    appStore.menuTheme === 'dark'
      ? 'rgba(255, 255, 255, 0.04)'
      : 'rgb(242,243,245)'
  );
  const showTab = computed(() => appStore.tabBar);
  const breadcrumb = computed(() => appStore.breadcrumb);
  const showBannerNotice = computed(() => appStore.bannerNotice);
  const showFooter = computed(() => appStore.showFooter);
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-layout-sidebar';
  .@{prefix-cls} {
    height: 100vh;
    :deep(
        .arco-menu-collapsed > .arco-menu-inner > .arco-menu-selected::before
      ) {
      position: absolute;
      top: 0;
      left: 0;
      width: 3px;
      height: 100%;
      content: '';
      background-color: rgb(var(--primary-6));
    }
    :deep(.arco-menu-collapsed .arco-menu-inner) {
      padding: 4px 0px !important;
    }
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
