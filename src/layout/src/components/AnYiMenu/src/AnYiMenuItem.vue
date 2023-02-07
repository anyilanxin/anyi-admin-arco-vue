<template>
  <template v-if="menuItem?.children && menuItem?.children.length !== 0">
    <a-sub-menu :key="menuItem.path">
      <template #icon>
        <span v-if="collapsed && firstMenuItem && !menuItem?.meta?.icon">
          {{ getFirstItemTitleIcon(menuItem?.meta?.locale) }}
        </span>
        <img
          v-else-if="menuItem?.meta?.iconType === 2"
          class="arco-icon"
          :src="menuItem?.meta?.icon"
        />
        <component :is="com(menuItem?.meta?.icon)" v-else />
      </template>
      <template #title>{{ $t(menuItem?.meta?.locale || '') }}</template>
      <AnYiMenuSubNew
        v-for="child in menuItem?.children"
        :key="child.path"
        :menu-item="child"
      />
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="menuItem.path" @click="() => goto(menuItem)">
      <template #icon>
        <span v-if="collapsed && firstMenuItem && !menuItem?.meta?.icon">
          {{ getFirstItemTitleIcon(menuItem?.meta?.locale) }}
        </span>
        <img
          v-else-if="menuItem?.meta?.iconType === 2"
          class="arco-icon"
          :src="menuItem?.meta?.icon"
        />
        <component :is="com(menuItem?.meta?.icon)" v-else />
      </template>
      {{ $t(menuItem?.meta?.locale || '') }}
    </a-menu-item>
  </template>
</template>

<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { ref, computed, h, compile } from 'vue';
  import { openWindow, regexUrl } from '@/utils';
  import type { RouteMeta } from 'vue-router';
  import { useAppStore } from '@/store';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter, RouteRecordRaw } from 'vue-router';

  const selectedKey = ref<string[]>([]);
  const appStore = useAppStore();
  const router = useRouter();
  const { t } = useI18n();
  const route = useRoute();
  const collapsed = computed({
    get() {
      if (appStore.device === 'desktop') return appStore.collapsed;
      return false;
    },
    set(value: boolean) {
      appStore.updateSettings({ collapsed: value });
    },
  });

  const com = (icon?: string) => {
    return icon ? h(compile(`<${icon}/>`)) : null;
  };
  function getFirstItemTitleIcon(title?: string) {
    const i18nTitle = t(title || '');
    return i18nTitle.length > 2 ? `${i18nTitle.substring(0, 2)}` : i18nTitle;
  }
  defineProps({
    menuItem: {
      type: Object as PropType<RouteRecordRaw>,
      default: {} as RouteRecordRaw,
    },
    firstMenuItem: {
      type: Boolean,
      default: false,
    },
  });

  const goto = (item: RouteRecordRaw) => {
    // Open external link
    if (regexUrl.test(item.path)) {
      openWindow(item.path);
      selectedKey.value = [item.name as string];
      return;
    }
    // Eliminate external link side effects
    const { hideInMenu, activeMenu } = item.meta as RouteMeta;
    if (route.name === item.name && !hideInMenu && !activeMenu) {
      selectedKey.value = [item.name as string];
      return;
    }
    // Trigger router change
    router.push({
      name: item.name,
    });
  };
</script>

<script lang="ts">
  export default {
    name: 'AnYiMenuSubNew',
  };
</script>
