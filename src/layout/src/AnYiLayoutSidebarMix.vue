<!--左侧菜单混合模式-->

<template>
  <a-layout :class="prefixCls">
    <a-layout-sider
      style="width: 68px"
      breakpoint="xl"
      :class="prefixCls + '-left'"
      :collapsed="collapsed"
      :collapsible="true"
      :width="menuWidth"
      :hide-trigger="true"
      @collapse="setCollapsed"
    >
      <div :class="prefixCls + '-left-sidebar-content'">
        <div>
          <AnYiLogoSimple v-if="showLogo" />
          <AnYiMenuSimple />
        </div>
        <!-- <div :class="prefixCls + '-left-sidebar-mix-right'">
          <AnYiLogo />
          <AnYiMenu
            class="anyi-layout-sidebar-mix-right-menu"
            :expand-icon-down="false"
            :expand-icon-right="false"
          />
        </div> -->
      </div>
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
    AnYiLogoSimple,
    AnYiMenuSimple,
    AnYiTabs,
  } from './components';

  const { prefixCls } = useDesign('layout-sidebar-mix');
  const appStore = useAppStore();
  useResponsive(true);
  const breadcrumb = computed(() => appStore.breadcrumb);
  const showLogo = computed(() => appStore.showLogo);
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
  @prefix-cls: ~'@{namespace}-layout-sidebar-mix';
  .@{prefix-cls} {
    .@{prefix-cls}-left-sidebar-content{
      display: flex;
      width: 100%;
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
