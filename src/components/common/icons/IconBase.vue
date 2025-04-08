<template>
  <div
    :style="{
      width: size + 'px',
      height: size + 'px',
      display: 'flex',
      justifyContents: 'center',
      alignItems: 'center',
    }"
  >
    <svg
      width="100%"
      height="100%"
      :style="{ color }"
      :fill="color"
      viewBox="0 0 35 35"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      v-bind="$attrs"
    >
      <slot />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: [Number, String],
    default: 35,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
});
</script>
