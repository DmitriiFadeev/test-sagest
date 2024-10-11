<script setup lang="ts">
const props = defineProps({
  width: { type: String, default: '10' },
  height: { type: String, default: '10' },
  fill: { type: String, default: '#000000' }
});
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="props.width" :height="props.height" viewBox="0 0 10 10">
    <path d="M1.5 1.5L8.5 8.5M1.50001 8.5L5.00001 5L8.50001 1.5" :stroke="props.fill" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
</template>