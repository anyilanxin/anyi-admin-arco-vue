<template>
  <a-input-number
    v-if="type === 'number'"
    :style="{ width: '120px' }"
    size="small"
    :disabled="disabled"
    :default-value="(defaultValue as number)"
    @change="handleChange"
  />
  <a-select
    v-else-if="type === 'select'"
    :default-value="(defaultValue as string)"
    size="small"
    :disabled="disabled"
    :style="{ width: '120px' }"
    :options="options"
    @change="handleChange"
  />
  <a-switch
    v-else
    :disabled="disabled"
    :default-checked="(defaultValue as boolean)"
    size="small"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
  const props = defineProps({
    type: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array<any>,
      default: [] as Array<any>,
    },
    defaultValue: {
      type: [String, Boolean, Number],
      default: '',
    },
  });
  const emit = defineEmits(['inputChange']);
  const handleChange = (value: unknown) => {
    emit('inputChange', {
      value,
      key: props.name,
    });
  };
</script>
