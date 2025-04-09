<!-- ✅ components/common/AnimatedMileageIcon.vue -->
<template>
  <div class="animated-icon-wrapper">
    <div class="spin-in-3d">
      <IconMileage :size="size" :color="color" />
    </div>
  </div>
</template>

<script setup>
import IconMileage from '@/components/common/icons/IconMileage.vue';

defineProps({
  size: {
    type: [Number, String],
    default: 100,
  },
  color: {
    type: String,
    default: '#FAB809',
  },
});
</script>

<style scoped>
.animated-icon-wrapper {
  display: flex;
  justify-content: center;
  perspective: 800px; /* 🎯 3D 회전에 필요 */
}

.spin-in-3d {
  animation: spinIn3D 0.8s ease-out forwards;
  transform-style: preserve-3d;
}

@keyframes spinIn3D {
  0% {
    opacity: 0;
    transform: rotateY(90deg) scale(0.8) translateY(80px);
  }
  60% {
    opacity: 1;
    transform: rotateY(180deg) scale(1.05) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: rotateY(360deg) scale(1) translateY(0);
  }
}
</style>
