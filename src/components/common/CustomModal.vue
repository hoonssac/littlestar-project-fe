<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <h2 class="modal-title">{{ title }}</h2>
      <img v-if="img" :src="img" alt="modal image" class="modal-image" />
      <p class="modal-description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* 어두운 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소보다 위에 올라오게 */
}

.modal-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  background-color: white;
  max-width: 450px;
  padding: 30px;
  border-radius: 25px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  margin: 0 20px;
  text-align: center;
}

.modal-title {
  white-space: pre-line;
  font-size: 34px;
}

.modal-description {
  white-space: pre-line;
  font-size: 26px;
}

img {
  width: 100%;
}
</style>
