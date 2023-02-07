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
      <AnYiLogo v-if="showLogo" />
      <AnYiMenu
        :class="prefixCls + '-menu'"
        :expand-icon-down="false"
        :expand-icon-right="false"
      />
    </a-layout-sider>
    <a-layout>
      <div :class="prefixCls + '-header-parent'">
        <a-layout-header :class="prefixCls + '-header'">
          <AnYiBreadcrumb v-if="breadcrumb" />
          <span v-else></span>
          <AnYiMenu
            mode="horizontal"
            :class="prefixCls + '-menu'"
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
        <AnYiFooter v-if="showFooter" />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useAppStore } from '@/store';
  import { useDesign } from '@/hooks/useDesign';
  import useResponsive from '@/hooks/responsive';
  import {
    AnYiBannerNotice,
    AnYiBreadcrumb,
    AnYiContent,
    AnYiHeaderNavbar,
    AnYiLogo,
    AnYiMenu,
    AnYiTabs,
  } from './components';

  const { prefixCls } = useDesign('layout-top-mix');
  const appStore = useAppStore();
  useResponsive(true);
  const showLogo = computed(() => appStore.showLogo);
  const breadcrumb = computed(() => appStore.breadcrumb);
  const menuWidth = computed(() => {
    return appStore.collapsed ? 48 : appStore.menuWidth;
  });
  const collapsed = computed(() => {
    return appStore.collapsed;
  });
  const setCollapsed = (val: boolean) => {
    appStore.updateSettings({ collapsed: val });
  };

  const showTab = computed(() => appStore.tabBar);
  const showBannerNotice = computed(() => appStore.bannerNotice);
  const showFooter = computed(() => appStore.showFooter);
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-layout-top-mix';
  .@{prefix-cls} {
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

    :deep(.arco-menu-collapsed > .arco-menu-inner > .arco-menu-selected) {
      background-color: var(--color-neutral-2);
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
