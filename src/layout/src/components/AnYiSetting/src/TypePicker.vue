<template>
  <div :class="prefixCls">
    <template v-for="item in menuTypeList || []" :key="item.title">
      <a-tooltip :content="item.title" position="bottom">
        <div
          :class="[
            `${prefixCls}__item`,
            `${prefixCls}__item--${item.type}`,
            {
              [`${prefixCls}__item--active`]: layoutType === item.type,
            },
          ]"
          @click="handleSetType('layoutType', item.type)"
        >
          <div class="mix-sidebar"></div>
        </div>
      </a-tooltip>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useDesign } from '@/hooks/useDesign';
  import { useAppStore } from '@/store';
  import { menuTypeList } from './enum';

  const { prefixCls } = useDesign('setting-menu-type-picker');
  const appStore = useAppStore();
  const layoutType = computed(() => appStore.layoutType);
  function handleSetType(key: string, value: string) {
    if (key === 'top' || key === 'top-mix') {
      appStore.updateSettings({ topNavbar: true });
    }
    appStore.updateSettings({ [key]: value });
  }
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-menu-type-picker';

  .@{prefix-cls} {
    display: flex;

    &__item {
      position: relative;
      width: 56px;
      padding: 2px !important;
      height: 48px;
      box-sizing: border-box;
      margin-right: 16px;
      overflow: hidden;
      cursor: pointer;
      background-color: #f0f2f5;
      border-radius: 4px;
      box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

      &::before,
      &::after {
        position: absolute;
        content: '';
      }

      &--sidebar,
      &--light {
        &::before {
          top: 0;
          left: 0;
          z-index: 1;
          width: 33%;
          height: 100%;
          background-color: #273352;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #fff;
        }
      }

      &--sidebar-mix {
        &::before {
          top: 0;
          left: 0;
          z-index: 1;
          width: 25%;
          height: 100%;
          background-color: #273352;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #fff;
        }

        .mix-sidebar {
          position: absolute;
          left: 25%;
          width: 15%;
          height: 100%;
          background-color: #fff;
        }
      }

      &--top {
        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #273352;
        }
      }

      &--dark {
        background-color: #273352;
      }

      &--top-mix {
        &::before {
          top: 0;
          left: 0;
          width: 33%;
          height: 100%;
          background-color: #fff;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 25%;
          background-color: #273352;
        }
      }

      &:hover,
      &--active {
        padding: 1px !important;
        border: 2px solid rgb(var(--arcoblue-6));

        &::before,
        &::after {
          border-radius: 0;
        }
      }
    }

    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
</style>
