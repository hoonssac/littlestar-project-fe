<template>
  <IconBase :color="color" v-bind="$attrs">
    <path
      d="M17.5072 32.0872C9.45302 32.0872 2.92383 25.5581 2.92383 17.5039C2.92383 9.44983 9.45302 2.92065 17.5072 2.92065C25.5613 2.92065 32.0905 9.44983 32.0905 17.5039C32.0905 25.5581 25.5613 32.0872 17.5072 32.0872ZM17.5072 11.3168L11.32 17.5039L17.5072 23.6912L23.6943 17.5039L17.5072 11.3168Z"
      fill="currentColor"
    />
  </IconBase>
</template>

<script setup>
import IconBase from './IconBase.vue';

defineProps({
  color: String,
});
</script>
