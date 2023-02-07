<template>
  <div class="anyi-app-logo-simple-parent" :style="{ width: '48px' }">
    <img src="/img/logo.png" />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .anyi-app-logo-simple-parent {
    height: 48px;
    text-align: center;
    line-height: 48px;
    display: flex;
    padding: 10px 0px 10px 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    img {
      width: 32px;
      height: 32px;
    }
  }
</style>
