<!-- ✅ MileageCounter.vue -->
<template>
  <div class="animated-mileage">+{{ displayAmount }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  amount: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    default: 1000, // 애니메이션 시간 (ms)
  },
});

const displayAmount = ref(0);

onMounted(() => {
  const frameRate = 30; // 초당 프레임
  const totalFrames = Math.round(props.duration / (1000 / frameRate));
  const increment = props.amount / totalFrames;
  let current = 0;
  let frame = 0;

  const timer = setInterval(() => {
    frame++;
    current += increment;
    if (frame >= totalFrames) {
      displayAmount.value = props.amount;
      clearInterval(timer);
    } else {
      displayAmount.value = Math.floor(current);
    }
  }, 1000 / frameRate);
});
</script>

<style scoped>
.animated-mileage {
  font-size: 40px;
  font-weight: bold;
  color: #fab809;
}
</style>
