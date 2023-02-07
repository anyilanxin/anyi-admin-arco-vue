import type { RouteRecordNormalized } from 'vue-router';

export interface ProjectConfig {
  // 系统主题
  theme: string;
  // 布局
  layoutType: string;
  systemColor: string;
  topColor: string;
  menuColor: string;
  splitMenu: boolean;
  fixMenu: boolean;
  closeMenu: boolean;
  collapsed: boolean;
  activityMenu: boolean;
  menuSearch: boolean;
  accordion: boolean;
  collapsedMenuName: boolean;
  headerFix: boolean;
  sidebarFix: boolean;
  mixMenuType: string;
  topMenuType: string;
  showCollapsedButton: boolean;
  contentWitdh: string;
  lockScreen: number;
  menuWidth: number;
  breadcrumb: boolean;
  breadcrumbIcon: boolean;
  tabBar: boolean;
  tabType: string;
  tabRefresh: boolean;
  tabFast: boolean;
  tabFold: boolean;
  bannerNotice: boolean;
  leftMenu: boolean;
  topNavbar: boolean;
  showLogo: boolean;
  showFooter: boolean;
  fullScreen: boolean;
  colorGrey: boolean;
  colorWeak: boolean;
  topProgress: boolean;
  loading: boolean;
  routerAnimation: boolean;
  animationType: string;
  globalSettings: boolean;
  device: string;
  menuFromServer: boolean;
  serverMenu: RouteRecordNormalized[];
}
