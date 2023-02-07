<template>
  <div :class="prefixCls">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/useDesign';

  const { prefixCls } = useDesign('blank-page-wrapper');
</script>

<script lang="ts">
  export default {
    name: 'AnYiBlankPageWrapper',
  };
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-blank-page-wrapper';

  .@{prefix-cls} {
    padding: 0px 12px 12px 12px;
    margin-top: 6px;
  }
</style>
