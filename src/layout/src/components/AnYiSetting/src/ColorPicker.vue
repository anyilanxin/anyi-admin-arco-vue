<template>
  <div :class="prefixCls">
    <template v-for="color in colorList || []" :key="color">
      <span
        :class="[
          `${prefixCls}__item`,
          {
            [`${prefixCls}__item--active`]: currentColor === color,
          },
          {
            [`${prefixCls}__item--active-color-dark`]:
              currentColor === color && shade === '#000',
          },
        ]"
        :style="{ background: color }"
        @click="handleColor(color)"
      >
        <AnYiSvgIcon name="icon-system-dagou" />
      </span>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { PropType, computed, ref } from 'vue';
  import { useDesign } from '@/hooks/useDesign';
  import { useAppStore } from '@/store';
  import { hexCheckShade } from '@/utils';

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

  const { prefixCls } = useDesign('setting-theme-picker');
  const appStore = useAppStore();
  const shade = ref(hexCheckShade(appStore[props.name] as string));
  const currentColor = computed(() => appStore[props.name]);
  function handleColor(value: string) {
    appStore.updateSettings({ [props.name]: value });
    shade.value = hexCheckShade(value);
  }
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-setting-theme-picker';

  .@{prefix-cls} {
    display: flex;
    flex-wrap: wrap;
    margin: 16px 0;
    justify-content: space-around;

    &__item {
      width: 20px;
      height: 20px;
      cursor: pointer;
      border: 1px solid #ddd;
      border-radius: 2px;

      svg {
        display: none;
      }

      &--active {
        border: 1px solid rgb(var(--arcoblue-6));
        color: #fff;
        svg {
          display: inline-block;
          margin: 1px 0px 0px -1px;
          font-size: 18px;
          vertical-align: 0.125em !important;
        }
      }

      &--active-color-dark {
        color: #000 !important;
      }
    }
  }
</style>
