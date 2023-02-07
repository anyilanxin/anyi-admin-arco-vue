<template>
  <div :class="prefixCls">
    <div :class="prefixCls + '-theme'">
      <a-button
        class="nav-btn"
        type="outline"
        :shape="'circle'"
        @click="handleToggleTheme"
      >
        <template #icon>
          <icon-moon-fill v-if="theme === 'dark'" />
          <icon-sun-fill v-else />
        </template>
      </a-button>
    </div>
    <div :class="prefixCls + '-i18n'">
      <a-dropdown @select="handleLanguageSelect">
        <a-button class="nav-btn" type="outline" :shape="'circle'">
          <template #icon>
            <icon-language />
          </template>
        </a-button>
        <template #content>
          <a-doption
            v-for="item in locales"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/useDesign';
  import { computed } from 'vue';
  import { useDark, useToggle } from '@vueuse/core';
  import { useAppStore } from '@/store';
  import { LOCALE_OPTIONS } from '@/locale';
  import useLocale from '@/hooks/locale';

  const locales = [...LOCALE_OPTIONS];
  const { changeLocale } = useLocale();
  const appStore = useAppStore();
  const { prefixCls } = useDesign('i18n-theme');

  const theme = computed(() => {
    return appStore.theme;
  });
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
  function handleLanguageSelect(value: any) {
    changeLocale(value);
  }
</script>

<script lang="ts">
  export default {
    name: 'AnYiI18nTheme',
  };
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-i18n-theme';

  .@{prefix-cls} {
    display: flex;
    margin: 10px;
    .@{prefix-cls}-theme {
      margin-right: 10px;
      .nav-btn {
        border-color: rgb(var(--gray-2));
        color: rgb(var(--gray-8));
      }
    }
    .@{prefix-cls}-i18n {
      margin-right: 0px;
      border-color: rgb(var(--gray-2));
      .nav-btn {
        border-color: rgb(var(--gray-2));
        color: rgb(var(--gray-8));
      }
    }
  }
</style>
