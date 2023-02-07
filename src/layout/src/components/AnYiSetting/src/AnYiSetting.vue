<template>
  <div v-if="!appStore.topNavbar" class="fixed-settings" @click="setVisible">
    <a-button type="primary">
      <template #icon>
        <icon-settings />
      </template>
    </a-button>
  </div>
  <a-drawer
    :width="300"
    unmount-on-close
    :visible="visible"
    class="anyi-setting-drawer"
    :cancel-text="$t('settings.close')"
    :ok-text="$t('settings.copySettings')"
    @ok="copySettings"
    @cancel="cancel"
  >
    <template #title> {{ $t('settings.title') }} </template>
    <a-divider orientation="center">主题</a-divider>
    <div class="anyi-dark-check-switch">
      <a-switch
        v-model="theme"
        checked-value="light"
        unchecked-value="dark"
        @change="handleToggleTheme"
      >
        <template #checked>
          <AnYiSvgIcon name="icon-setting-sun" class-name="anyi-dark-check" />
        </template>
        <template #unchecked>
          <AnYiSvgIcon name="icon-setting-moon" class-name="anyi-dark-check" />
        </template>
      </a-switch>
    </div>

    <a-divider orientation="center">导航栏模式</a-divider>
    <TypePicker />
    <a-divider orientation="center">系统主题</a-divider>
    <ColorPicker :color-list="systemColors" name="systemColor" />
    <ColorSketch name="systemColor" />
    <!-- <a-divider v-if="showSetColor" orientation="center">顶栏主题</a-divider>
    <ColorPicker v-if="showSetColor" :color-list="topColors" name="topColor" />
    <ColorSketch v-if="showSetColor" name="topColor" /> -->
    <a-divider v-if="showSetColor" orientation="center">菜单主题</a-divider>
    <ColorPicker
      v-if="showSetColor"
      :color-list="menuColors"
      name="menuColor"
    />
    <ColorSketch v-if="showSetColor" name="menuColor" />
    <Block :options="screenOpts" title="界面功能" />
    <Block :options="showOpts" title="界面显示" />
    <Block :options="animoOpts" title="动画" />
    <a-alert>{{ $t('settings.alertContent') }}</a-alert>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import { useClipboard, useDark, useToggle } from '@vueuse/core';
  import { useAppStore } from '@/store';
  import Block from './block.vue';
  import TypePicker from './TypePicker.vue';
  import ColorPicker from './ColorPicker.vue';
  import ColorSketch from './ColorSketch.vue';

  const emit = defineEmits(['cancel']);

  const appStore = useAppStore();
  const showSetColor = computed(() => appStore.theme === 'light');
  const { t } = useI18n();
  const { copy } = useClipboard();
  const visible = computed(() => appStore.globalSettings);
  const theme = computed(() => appStore.theme);
  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
    onChanged(dark: boolean) {
      appStore.toggleTheme(dark);
    },
  });
  const toggleTheme = useToggle(isDark);
  const handleToggleTheme = () => {
    toggleTheme();
  };
  const screenOpts = computed(() => [
    // { name: '分割菜单', key: 'splitMenu', defaultVal: appStore.splitMenu },
    // {
    //   name: '固定展开菜单',
    //   key: 'fixMenu',
    //   defaultVal: appStore.fixMenu,
    // },
    // {
    //   name: '切换页面关闭菜单',
    //   key: 'closeMenu',
    //   defaultVal: appStore.closeMenu,
    // },
    // {
    //   name: '折叠菜单',
    //   key: 'collapsed',
    //   defaultVal: appStore.collapsed,
    // },
    // {
    //   name: '侧边菜单拖拽',
    //   key: 'activityMenu',
    //   defaultVal: appStore.activityMenu,
    // },
    {
      name: '菜单搜索',
      key: 'menuSearch',
      defaultVal: appStore.menuSearch,
    },
    {
      name: '侧边菜单手风琴模式',
      key: 'accordion',
      defaultVal: appStore.accordion,
    },
    // {
    //   name: '折叠菜单显示名称',
    //   key: 'collapsedMenuName',
    //   defaultVal: appStore.collapsedMenuName,
    // },
    // {
    //   name: '固定header',
    //   key: 'headerFix',
    //   defaultVal: appStore.headerFix,
    // },
    // {
    //   name: '固定Sidebar',
    //   key: 'sidebarFix',
    //   defaultVal: appStore.sidebarFix,
    // },
    // {
    //   name: '混合菜单触发方式',
    //   key: 'mixMenuType',
    //   type: 'select',
    //   defaultVal: 'mixMenuType',
    //   options: [
    //     { value: 'hover', label: '悬停' },
    //     { value: 'click', label: '点击' },
    //   ],
    // },
    // {
    //   name: '顶部菜单布局',
    //   key: 'topMenuType',
    //   type: 'select',
    //   defaultVal: 'center',
    //   options: [
    //     { value: 'center', label: '居中' },
    //     { value: 'left', label: '居左' },
    //     { value: 'right', label: '居右' },
    //   ],
    // },
    // {
    //   name: '菜单折叠按钮',
    //   key: 'showCollapsedButton',
    //   type: 'select',
    //   defaultVal: 'buttom',
    //   options: [
    //     { value: 'no', label: '不显示' },
    //     { value: 'top', label: '底部' },
    //     { value: 'buttom', label: '顶部' },
    //   ],
    // },
    // {
    //   name: '内容区域宽度',
    //   key: 'contentWitdh',
    //   type: 'select',
    //   defaultVal: 'flow',
    //   options: [
    //     { value: 'flow', label: '流式' },
    //     { value: 'fixWitch', label: '定宽' },
    //   ],
    // },
    // {
    //   name: '自动锁屏',
    //   key: 'lockScreen',
    //   defaultVal: appStore.lockScreen,
    //   type: 'number',
    // },
    {
      name: '菜单展开宽度',
      key: 'menuWidth',
      defaultVal: appStore.menuWidth,
      type: 'number',
    },
  ]);
  const showOpts = computed(() => [
    { name: '面包屑', key: 'breadcrumb', defaultVal: appStore.breadcrumb },
    {
      name: '面包屑图标',
      key: 'breadcrumbIcon',
      defaultVal: appStore.breadcrumbIcon,
    },
    {
      name: '标签页',
      key: 'tabBar',
      defaultVal: appStore.tabBar,
    },
    {
      name: '标签页类型',
      key: 'tabType',
      type: 'select',
      defaultVal: appStore.tabType,
      options: [
        { value: 'line', label: '线条' },
        { value: 'card', label: '卡片' },
        { value: 'card-gutter', label: '卡片槽' },
        { value: 'text', label: '文本' },
        { value: 'rounded', label: '圆型' },
        { value: 'capsule', label: '胶囊' },
      ],
    },
    // {
    //   name: '标签页刷新按钮',
    //   key: 'tabRefresh',
    //   defaultVal: appStore.tabRefresh,
    // },
    // {
    //   name: '标签页快捷按钮',
    //   key: 'tabFast',
    //   defaultVal: appStore.tabFast,
    // },
    // {
    //   name: '标签页折叠按钮',
    //   key: 'tabFold',
    //   defaultVal: appStore.tabFold,
    // },
    {
      name: 'Banner通知',
      key: 'bannerNotice',
      defaultVal: appStore.bannerNotice,
    },
    // {
    //   name: '左侧菜单',
    //   key: 'leftMenu',
    //   defaultVal: appStore.leftMenu,
    // },
    {
      name: 'Logo',
      key: 'showLogo',
      defaultVal: appStore.showLogo,
    },
    {
      name: '顶栏',
      key: 'topNavbar',
      defaultVal: appStore.topNavbar,
    },
    {
      name: '页脚',
      key: 'showFooter',
      defaultVal: appStore.showFooter,
    },
    // {
    //   name: '全屏内容',
    //   key: 'fullScreen',
    //   defaultVal: appStore.fullScreen,
    // },
    {
      name: '灰色模式',
      key: 'colorGrey',
      defaultVal: appStore.colorGrey,
    },
    {
      name: '色弱模式',
      key: 'colorWeak',
      defaultVal: appStore.colorWeak,
    },
  ]);
  const animoOpts = computed(() => [
    // {
    //   name: '顶部进度条',
    //   key: 'topProgress',
    //   defaultVal: appStore.topProgress,
    // },
    // {
    //   name: '切换loading',
    //   key: 'loading',
    //   defaultVal: appStore.loading,
    // },
    {
      name: '切换动画',
      key: 'routerAnimation',
      defaultVal: appStore.routerAnimation,
    },
    {
      name: '动画类型',
      key: 'animationType',
      type: 'select',
      defaultVal: appStore.animationType,
      options: [
        { value: 'fade', label: 'fade' },
        { value: 'scale', label: 'scale' },
        { value: 'left', label: 'left' },
      ],
    },
  ]);

  const systemColors = [
    '#165DFF',
    '#0084F4',
    '#009688',
    '#536DFE',
    '#FF5C93',
    '#EE4F12',
    '#0096C7',
    '#9C27B0',
    '#FF9800',
  ];

  const topColors = [
    '#FFFFFF',
    '#151515',
    '#009688',
    '#5172DC',
    '#018FFB',
    '#409EFF',
    '#E74C3C',
    '#24292E',
    '#394664',
    '#001529',
    '#383F45',
  ];

  const menuColors = [
    '#001529',
    '#212121',
    '#273352',
    '#FFFFFF',
    '#191B24',
    '#191A23',
    '#304156',
    '#001628',
    '#28333E',
    '#344058',
    '#383F45',
  ];
  const cancel = () => {
    appStore.updateSettings({ globalSettings: false });
    emit('cancel');
  };
  const copySettings = async () => {
    const text = JSON.stringify(appStore.$state, null, 2);
    await copy(text);
    Message.success(t('settings.copySettings.message'));
  };
  const setVisible = () => {
    appStore.updateSettings({ globalSettings: true });
  };
</script>

<style scoped lang="less">
  .fixed-settings {
    position: fixed;
    top: 50%;
    right: 0;

    svg {
      font-size: 18px;
      vertical-align: -4px;
    }
  }
  .anyi-dark-check-switch {
    text-align: center;
    .anyi-dark-check {
      vertical-align: -0.16em !important;
    }
  }
</style>
