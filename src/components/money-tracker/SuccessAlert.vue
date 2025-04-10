<template>
  <div v-if="show" class="custom-alert">
    <div class="alert-content">
      <span class="alert-text">{{ message }}</span>
    </div>
    <img :src="pikachu" alt="teamRocket" class="alert-image" />
  </div>
</template>
<script setup>
import pikachu from '@/assets/images/pikapika.png';
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
  position: fixed; /* ✅ fixed로 변경! */
  top: 50%; /* ✅ 화면 위쪽에서 50% */
  left: 50%; /* ✅ 화면 왼쪽에서 50% */
  transform: translate(-50%, -50%); /* ✅ 화면 정중앙 */

  width: 40%;
  height: 50px;
  background-color: #61ba5d;
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
  justify-content: center;
  width: 100%;
}

.alert-text {
  font-size: 1.5rem;
  text-align: center;
}

.alert-image {
  position: absolute;
  right: -70px;
  width: 50%;
  height: auto;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style>
