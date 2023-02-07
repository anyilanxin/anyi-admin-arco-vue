<template>
  <div class="block">
    <a-divider orientation="center">{{ title }}</a-divider>
    <div v-for="option in options" :key="option.name" class="switch-wrapper">
      <span>{{ $t(option.name) }}</span>
      <form-wrapper
        :type="option.type || 'switch'"
        :name="option.key"
        :disabled="getDisabled(option.key)"
        :options="option?.options"
        :default-value="option.defaultVal"
        @input-change="handleChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { useAppStore } from '@/store';
  import FormWrapper from './form-wrapper.vue';

  interface OptionsProps {
    name: string;
    key: string;
    type?: string;
    options?: Array<any>;
    defaultVal?: boolean | string | number;
  }
  defineProps({
    title: {
      type: String,
      default: '',
    },
    options: {
      type: Array as PropType<OptionsProps[]>,
      default() {
        return [];
      },
    },
  });
  const appStore = useAppStore();
  const handleChange = async ({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }) => {
    if (key === 'colorWeak') {
      document.body.style.filter = value ? 'invert(80%)' : 'none';
    }
    if (key === 'menuFromServer' && value) {
      await appStore.fetchServerMenuConfig();
    }
    appStore.updateSettings({ [key]: value });
  };
  function getDisabled(key: string) {
    let disabled = false;
    switch (key) {
      case 'breadcrumbIcon':
        disabled = !appStore.breadcrumb;
        break;
      case 'tabType':
        disabled = !appStore.tabBar;
        break;
      case 'topNavbar':
        disabled =
          appStore.layoutType === 'top' || appStore.layoutType === 'top-mix';
        break;

      default:
        disabled = false;
    }
    return disabled;
  }
</script>

<style scoped lang="less">
  .block {
    margin-bottom: 24px;
  }

  .title {
    margin: 10px 0;
    padding: 0;
    font-size: 14px;
  }

  .switch-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
  }
</style>
