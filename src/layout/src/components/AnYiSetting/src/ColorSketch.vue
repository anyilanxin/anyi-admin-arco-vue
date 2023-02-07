<template>
  <div class="anyi-color-sketch">
    <a-popover
      position="bottom"
      trigger="click"
      content-class="anyi-color-popover"
    >
      <div class="anyi-color-parent">
        <div class="anyi-color" :style="currentColorStype"></div>
        <span>{{ currentColor }}</span>
      </div>
      <template #content>
        <Sketch v-model="color" />
      </template>
    </a-popover>
  </div>
</template>

<script lang="ts" setup>
  import { PropType, ref, watch, computed } from 'vue';
  import type { StyleValue } from 'vue';
  import { Sketch } from '@ckpack/vue-color';
  import { useAppStore } from '@/store';

  const props = defineProps({
    colorList: {
      type: Array as PropType<string[]>,
      defualt: [],
    },
    name: {
      type: String,
      default: '',
    },
  });
  const appStore = useAppStore();
  const currentColor = computed(() => appStore[props.name]);
  const currentColorStype = computed(() => {
    return {
      'background-color': appStore[props.name],
    } as StyleValue;
  });
  const color: any = ref<any>(appStore[props.name]);
  const hexColor = ref<any>(appStore[props.name]);
  function handleColor(value: string) {
    appStore.updateSettings({ [props.name]: value });
  }
  watch(
    () => color.value,
    (oldV, newV) => {
      if (oldV !== newV) {
        if (color.value?.hex) {
          hexColor.value = color.value.hex;
        } else {
          hexColor.value = color.value;
        }
        handleColor(hexColor.value);
      }
    },
    { immediate: true }
  );
</script>

<style lang="less" scoped>
  .anyi-color-sketch {
    .anyi-color-parent {
      border: 1px solid var(--color-neutral-3);
      box-sizing: border-box;
      display: flex;
      height: 32px;
      padding: 3px;
      width: 100%;
      .anyi-color {
        height: 24px;
        margin-right: 10px;
        width: 120px;
      }
    }
  }

  .vc-sketch {
    box-shadow: none !important;
    padding: 4px !important;
    background-color: var(--color-bg-popup);
  }
  :deep(.vc-sketch-presets) {
    border-top: 1px solid var(--color-neutral-3) !important;
  }
  :deep(.vc-sketch-field .vc-input__label) {
    color: var(--color-text-1) !important;
  }
  :deep(.vc-sketch-field .vc-input__input) {
    background-color: var(--color-bg-3) !important;
    color: var(--color-text-1) !important;
    box-shadow: none !important;
    border: 1px solid var(--color-neutral-3) !important;
  }
  .anyi-color-popover {
    padding: 0px !important;
  }
</style>
