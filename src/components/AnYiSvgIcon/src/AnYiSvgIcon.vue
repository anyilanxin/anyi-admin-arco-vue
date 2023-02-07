<template>
  <svg :class="svgClass" aria-hidden="true">
    <use class="svg-use" :href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  });
  const symbolId = computed(() => `#${props.name}`);
  const svgClass = computed(() => {
    if (props.className) {
      return `anyi-svg-icon ${props.className}`;
    }
    return 'anyi-svg-icon';
  });
</script>

<script lang="ts">
  export default {
    name: 'AnYiSvgIcon',
  };
</script>

<style lang="less">
  .anyi-svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: 0.125em !important;
    color: inherit;
    outline: none;
  }
</style>
