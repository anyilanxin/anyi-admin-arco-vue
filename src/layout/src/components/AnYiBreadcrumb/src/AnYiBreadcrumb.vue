<template>
  <div class="anyi-breadcrumb">
    <div class="anyi-breadcrumb-icon" @click="handleChangeCollapsed">
      <icon-menu-unfold v-if="collapsed" style="font-size: 1.4em" />
      <icon-menu-fold v-else style="font-size: 1.4em" />
    </div>
    <div>
      <a-breadcrumb :routes="routes" :max-count="3">
        <a-breadcrumb-item v-for="route in routes" :key="route.path">
          <template v-if="!hasRedirect(routes, route)">
            <img
              v-if="route.iconType === 2 && route.icon && breadcrumbIcon"
              class="arco-icon"
              style="height: 1.1em; width: 1.1em; vertical-align: -3px"
              :src="route.icon"
            />
            <component
              :is="com(route.icon)"
              v-else-if="route.icon && breadcrumbIcon"
              style="font-size: 1.4em; vertical-align: -4px"
            />
            {{ route.label }}
          </template>
          <router-link v-else to="" @click="handleClick(route, routes, $event)">
            <img
              v-if="route.iconType === 2 && route.icon && breadcrumbIcon"
              class="arco-icon"
              style="height: 1.1em; width: 1.1em; vertical-align: -3px"
              :src="route.icon"
            />
            <component
              :is="com(route.icon)"
              v-else-if="route.icon && breadcrumbIcon"
              style="font-size: 1.4em; vertical-align: -4px"
            />
            {{ route.label }}
          </router-link>
          <template
            v-if="route.children && route.children.length > 0"
            #droplist
          >
            <a-doption v-for="child in route.children" :key="child.path">
              <router-link to="" @click="handleClick(child, [], $event)">
                <img
                  v-if="child.iconType === 2 && child.icon && breadcrumbIcon"
                  class="arco-icon"
                  style="height: 1.1em; width: 1.1em; vertical-align: -3px"
                  :src="child.icon"
                />
                <component
                  :is="com(child.icon)"
                  v-else-if="child.icon && breadcrumbIcon"
                  style="font-size: 1.4em; vertical-align: -4px"
                />
                {{ child.label }}
              </router-link>
            </a-doption>
          </template>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, watchEffect, ref, h, compile } from 'vue';
  import type { RouteLocationMatched } from 'vue-router';
  import { useRouter } from 'vue-router';
  import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-vue/es/icon';
  import { useAppStore } from '@/store';
  import { useI18n } from 'vue-i18n';
  import useMenuTree from '../../AnYiMenu/src/use-menu-tree';

  const { t } = useI18n();
  const { currentRoute } = useRouter();
  const { menuTree } = useMenuTree();
  const router = useRouter();
  const routes = ref<any[]>([]);
  const appStore = useAppStore();
  const collapsed = computed(() => {
    return appStore.collapsed;
  });
  const breadcrumbIcon = computed(() => appStore.breadcrumbIcon);
  function handleChangeCollapsed() {
    appStore.updateSettings({ collapsed: !appStore.collapsed });
  }
  function getAllParentPath(menus: any[], path: string) {
    const parentMenus = menus.filter((item) => {
      return path.indexOf(item.path) >= 0;
    });
    if (parentMenus.length === 1) {
      return parentMenus;
    }
    return [];
  }
  function createRouter(menus: any[], path: string, havaMenus: any[]) {
    console.log('---menus----------', menus);
    let have = false;
    menus.forEach((item) => {
      if (item.path === path) {
        have = true;
      }
    });
    menus.forEach((item) => {
      if (have) {
        if (item.path === path) {
          havaMenus.push({
            path: item.path,
            label: t(item.meta.locale),
            icon: item.meta.icon,
            iconType: item.meta.iconType,
          });
        }
      } else {
        const route = {
          path: item.path,
          label: t(item.meta.locale),
          children: [] as any[],
          icon: item.meta.icon,
          iconType: item.meta.iconType,
        };

        if (item.children && item.children.length > 0) {
          const childrens: any[] = [];
          item.children.forEach((children: any) => {
            childrens.push({
              path: children.path,
              label: t(children.meta.locale),
              icon: children.meta.icon,
              iconType: children.meta.iconType,
            });
          });
          route.children = childrens;
          havaMenus.push(route);
          createRouter(item.children, path, havaMenus);
        } else {
          havaMenus.push(route);
        }
      }
    });
  }
  watchEffect(async () => {
    const { path } = currentRoute.value;
    const parentPath = getAllParentPath(menuTree.value, path);
    let havaMenus: any[] = [];
    createRouter(parentPath, path, havaMenus);
    havaMenus = havaMenus.filter((item) => {
      return path.indexOf(item.path) >= 0;
    });
    console.log('---havaMenus----------', havaMenus);
    routes.value = havaMenus;
  });
  const com = (icon?: string) => {
    return icon ? h(compile(`<${icon}/>`)) : null;
  };
  function hasRedirect(
    // eslint-disable-next-line no-shadow
    routes: RouteLocationMatched[],
    route: RouteLocationMatched
  ) {
    return routes.indexOf(route) !== routes.length - 1;
  }
  function handleClick(
    route: RouteLocationMatched,
    routeInfos: any[],
    e: Event
  ) {
    e?.preventDefault();
    const { children, path, redirect, meta } = route;
    if (children?.length && !path) {
      e?.stopPropagation();
      return;
    }
    if (meta?.carryParam) {
      return;
    }
    if (redirect) {
      router.push({
        path: redirect as string,
      });
    } else {
      let goPath = '';
      if (routeInfos.length === 0) {
        goPath = path;
      } else {
        const ps = routeInfos.slice(1);
        const lastPath = ps.pop() || { path: '' };
        goPath = `${lastPath.path}`;
      }
      goPath = /^\//.test(goPath) ? goPath : `/${goPath}`;
      router.push({
        path: goPath as string,
      });
    }
  }
</script>

<style lang="less" scoped>
  .anyi-breadcrumb {
    display: flex;
    height: 100%;
    min-width: 300px;
    // border-left: 1px solid var(--color-neutral-2);
    justify-content: flex-start;
    align-items: center;
    .anyi-breadcrumb-icon {
      display: flex;
      height: 100%;
      padding: 1px 10px 0;
      cursor: pointer;
      color: var(--color-neutral-10);
      align-items: center;
    }
    .anyi-breadcrumb-icon:hover {
      background-color: var(--color-neutral-2);
    }
    .icon-parent {
      display: flex;
      align-items: center;
    }
  }

  .arco-dropdown-option-content a {
    display: inline-block;
    margin: 0 -4px;
    padding: 0 4px;
    color: var(--color-text-2);
    text-decoration: none;
    border-radius: var(--border-radius-small);
    background-color: transparent;
  }
</style>
