<template>
  <AnYiPageWrapper>
    <AnYiBpmnPreviewInstance
      ref="diagramInstanceDomRef"
      :theme="theme"
      :create-html="getHtml"
      tag-id="Activity_1s3ocxk:e63351bb-faaa-11ec-9f3a-0242ac1f090f"
    />
  </AnYiPageWrapper>
</template>

<script lang="ts" setup>
  import { AnYiBpmnPreviewInstance } from 'anyi-process-ee-native-arcovue';
  import type {
    CreateHtmlFuncArgs,
    BpmnInstanceInfo,
  } from 'anyi-process-ee-native-arcovue/dist/types/types/instance.d';
  import useThemes from '@/hooks/themes';
  import { ref, onMounted, watch } from 'vue';
  import instancesdata from './instancesdata.json';

  const { isDark } = useThemes();
  const diagramInstanceDomRef = ref();
  const theme = ref('light');
  watch(
    () => isDark.value,
    (val) => {
      console.log('----val--camunda---', val);
      if (val) {
        theme.value = 'dark';
      } else {
        theme.value = 'light';
      }
    },
    { immediate: true }
  );
  function getHtml(info: CreateHtmlFuncArgs) {
    console.log('-----info-------', info);
    return '<scan>Nihao</scan>';
  }
  onMounted(() => {
    console.log('-----info---8888----');
    diagramInstanceDomRef.value.viewInstance(
      instancesdata.data as unknown as BpmnInstanceInfo
    );
  });
</script>

<script lang="ts">
  export default {
    name: 'Instance',
  };
</script>

<style lang="less">
  @import 'anyi-process-ee-native-arcovue/dist/style.css';
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
  @import 'bpmn-js/dist/assets/bpmn-js.css';
  @import 'bpmn-js/dist/assets/diagram-js.css';
  @import 'diagram-js-minimap/assets/diagram-js-minimap.css';
</style>
