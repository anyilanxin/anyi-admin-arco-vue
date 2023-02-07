<template>
  <div :class="prefixCls + tabType">
    <a-tabs
      :type="tabType"
      :size="tabType == 'rounded' ? 'mini' : 'medium'"
      :editable="true"
      auto-switch
      animation
      :active-key="activeKeyRef"
      @tab-click="handleTabClick"
      @delete="handleDeleteClick"
    >
      <a-tab-pane v-for="tag of tagList" :key="tag.fullPath">
        <template #title>
          <span>
            {{ $t(tag.title) }}
          </span>
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onUnmounted } from 'vue';
  import type { RouteLocationNormalized } from 'vue-router';
  import { useDesign } from '@/hooks/useDesign';
  import { useRouter, useRoute } from 'vue-router';
  import type { TabsType } from '@arco-design/web-vue/es/tabs/interface.d';
  import {
    listenerRouteChange,
    removeRouteListener,
  } from '@/utils/route-listener';
  import { useTabBarStore, useAppStore } from '@/store';

  const activeKeyRef = ref<string>('');
  const tabBarStore = useTabBarStore();
  const appStore = useAppStore();
  const router = useRouter();
  const routeInfo = useRoute();
  const tagList = computed(() => {
    return tabBarStore.getTabList;
  });
  // line,card,card-gutter,text,rounded,capsule
  const tabType = computed(() => {
    return appStore.tabType as TabsType;
  });
  const { prefixCls } = useDesign('tab-bar-container-');
  function handleTabClick(key: string | number) {
    activeKeyRef.value = `${key}`;
    router.push({ path: activeKeyRef.value });
  }
  function handleDeleteClick(key: string | number) {
    const index = tagList.value.findIndex((item) => item.fullPath === key);
    const tag = tagList.value[index];
    tabBarStore.deleteTag(index, tag);
    if (key === routeInfo.fullPath) {
      const latest = tagList.value[index - 1]; // 获取队列的前一个tab
      router.push({ name: latest.name });
    }
  }
  listenerRouteChange((route: RouteLocationNormalized) => {
    if (
      !route.meta.noAffix &&
      !tagList.value.some((tag) => tag.fullPath === route.fullPath)
    ) {
      tabBarStore.updateTabList(route);
    }
    activeKeyRef.value = route.fullPath;
  }, true);
  onUnmounted(() => {
    removeRouteListener();
  });
</script>

<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-tab-bar-container';

  .@{prefix-cls}-rounded {
    padding: 6px 5px 0px 5px;
    background-color: var(--color-fill-3);

    :deep(.arco-tabs-nav-type-rounded .arco-tabs-tab) {
      border-radius: 2px !important;
      padding: 2px 8px;
      font-size: 13px;
      background-color: var(--color-bg-2);
    }
    :deep(.arco-tabs-nav-type-rounded .arco-tabs-tab:hover) {
      color: rgb(var(--color-neutral-2));
    }
    :deep(.arco-tabs-nav-type-rounded .arco-tabs-tab-active:hover) {
      color: rgb(var(--primary-6)) !important;
    }
    :deep(.arco-tabs-content) {
      padding-top: 0px !important;
    }
  }

  .@{prefix-cls}-card {
    margin-bottom: 2px;
    :deep(.arco-tabs-type-card > .arco-tabs-content) {
      border: none !important;
    }
    :deep(.arco-tabs-nav-type-card .arco-tabs-tab) {
      padding: 5px 8px;
      font-size: 14px;
    }
    :deep(.arco-tabs-content) {
      padding-top: 0px !important;
    }
  }

  .@{prefix-cls}-card-gutter {
    margin-bottom: 2px;
    :deep(.arco-tabs-type-card-gutter > .arco-tabs-content) {
      border: none !important;
    }
    :deep(.arco-tabs-nav-type-gutter .arco-tabs-tab) {
      padding: 5px 8px;
      font-size: 14px;
    }
    :deep(.arco-tabs-content) {
      padding-top: 0px !important;
    }
  }

  .@{prefix-cls}-text {
    margin-bottom: 2px;
    :deep(.arco-tabs-type-text > .arco-tabs-content) {
      border: none !important;
    }
    :deep(.arco-tabs-nav-type-text .arco-tabs-tab) {
      padding: 5px 8px;
      font-size: 14px;
    }
    :deep(.arco-tabs-content) {
      padding-top: 0px !important;
    }
  }

  .@{prefix-cls}-capsule {
    margin-bottom: 2px;
    :deep(.arco-tabs-type-capsule > .arco-tabs-content) {
      border: none !important;
    }
    :deep(.arco-tabs-nav-type-capsule .arco-tabs-tab) {
      padding: 4px 8px;
      font-size: 14px;
      line-height: 18px;
    }
    :deep(.arco-tabs-content) {
      padding-top: 0px !important;
    }
  }

  .@{prefix-cls}-line {
    margin-bottom: 2px;
    :deep(.arco-tabs-type-line > .arco-tabs-content) {
      border: none !important;
    }
    :deep(.arco-tabs-nav-type-line .arco-tabs-tab) {
      padding: 5px 8px;
      font-size: 14px;
    }
    :deep(.arco-tabs-content) {
      padding-top: 0px !important;
    }
  }
</style>
