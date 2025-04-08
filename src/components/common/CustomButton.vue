<template>
  <button :class="['btn', `btn--${category}`, `btn--${size}`]" @click="onPress">
    <slot />
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  category: {
    type: String,
    default: 'primary',
    validator: (val) =>
      ['primary', 'secondary', 'success', 'danger'].includes(val),
  },
  size: {
    type: String,
    default: 'medium',
    validator: (val) => ['small', 'medium', 'large'].includes(val),
  },
});
</script>

<style scoped>
.btn {
  color: #4a483f;

  border-style: solid;
  border-color: #4a483f;

  border-radius: 13px;
}

/* 버튼 스타일 */
.btn--primary {
  background-color: #fed337;
}
.btn--secondary {
  background-color: #dbdbdb;
}
.btn--success {
  background-color: #3365a6;
  color: white;
}
.btn--danger {
  background-color: #f35746;
  color: white;
}

/* Size 옵션 */
.btn--small {
  padding: 6px 12px;
  font-size: 20px;
  padding: 10px 16px;

  border-top-width: 0px;
  border-right-width: 3px;
  border-bottom-width: 3px;
  border-left-width: 0px;
}

.btn--medium {
  padding: 10px 20px;
  font-size: 24px;
  padding: 10px 18px;

  border-top-width: 0px;
  border-right-width: 4px;
  border-bottom-width: 4px;
  border-left-width: 0px;
}

.btn--large {
  padding: 14px 26px;
  font-size: 32px;
  padding: 36px 42px;
  border-radius: 25px;

  border-top-width: 0px;
  border-right-width: 6px;
  border-bottom-width: 6px;
  border-left-width: 0px;
}

/* hover 효과 (옵션) */
.btn:hover {
  filter: brightness(0.95);
}
</style>
