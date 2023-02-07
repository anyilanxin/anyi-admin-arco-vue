<template>
  <AnYiPageWrapper>
    <AnYiBpmnDesignerCamundaSimple
      ref="diagramDesigner"
      :theme="theme"
      :high-margin="150"
      :comps="comps"
      @change="handleChange"
    />
  </AnYiPageWrapper>
</template>

<script lang="ts" setup>
  import { AnYiBpmnDesignerCamundaSimple } from 'anyi-process-ee-arcovue';
  import useThemes from '@/hooks/themes';
  import { ref, onMounted, watch } from 'vue';

  const { isDark } = useThemes();
  const diagramDesigner = ref();
  const comps = {};
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
  function handleChange(diagram: any) {
    console.log('---diagram---', diagram);
  }
  onMounted(() => {
    console.log('-----info---777----');
    diagramDesigner.value.createNewOrOpenDiagram();
  });
</script>

<style lang="less">
  @import 'anyi-process-ee-arcovue/dist/style.css';
  @import 'bpmn-js/dist/assets/diagram-js.css';
  @import 'anyi-bpmn-js-color-picker/colors/color-picker.css';
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
  @import 'bpmn-js/dist/assets/bpmn-js.css';
  @import 'bpmn-js-properties-panel/dist/assets/properties-panel.css';
  @import 'bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css';
  @import 'diagram-js-minimap/assets/diagram-js-minimap.css';
  @import 'bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css';
</style>
