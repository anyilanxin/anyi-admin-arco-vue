<template>
  <div>
    <ul>
      <li v-for="item in menus" :key="item">
        <div>图标</div>
        <div>菜单名</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const menus = ref(['sdfsdf', 'sdfsdfsdfsdf']);
</script>
