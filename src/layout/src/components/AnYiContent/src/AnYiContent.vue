<template>
  <a-layout-content class="anyi-layout-content">
    <router-view v-slot="{ Component, route }">
      <transition :name="animationType" mode="out-in" appear>
        <component
          :is="Component"
          v-if="route.meta.ignoreCache"
          :key="route.fullPath"
        />
        <keep-alive v-else :include="cacheList">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </a-layout-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useTabBarStore, useAppStore } from '@/store';

  const appStore = useAppStore();
  const tabBarStore = useTabBarStore();

  const cacheList = computed(() => tabBarStore.getCacheList);
  const animationType = computed(() =>
    appStore.routerAnimation ? appStore.animationType || 'left' : 'left'
  );
</script>

<style scoped lang="less">
  @import './style/index.less';
</style>
