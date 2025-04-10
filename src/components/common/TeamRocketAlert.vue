<template>
  <div v-if="show" class="custom-alert">
    <div class="alert-content">
      <span class="alert-icon">x</span>
      <span class="alert-text">{{ message }}</span>
    </div>
    <img :src="teamRocket" alt="teamRocket" class="alert-image" />
  </div>
</template>
<script setup>
import teamRocket from '@/assets/images/team-rocket.png';
import { onMounted } from 'vue';

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
</script>
<style scoped>
.custom-alert {
  position: relative;
  width: 70%;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff4d4f;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  z-index: 1000;
  animation: slide-up 0.5s ease;
}

.alert-content {
  display: flex;
  align-items: center;
}

.alert-icon {
  margin-right: 10px;
  font-size: 20px;
}

.alert-text {
  font-size: 1.1rem;
}

.alert-image {
  position: absolute;
  top: -1rem;
  right: 4px;
  width: 30%;
  height: auto;
  margin-left: 10px;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
</style>
