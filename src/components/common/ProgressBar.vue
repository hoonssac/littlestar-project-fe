<template>
  <div class="progress-container">
    <div class="progress-max">
      <div class="progress-degree" :style="{ width: `${degree}%` }"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  degree: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100,
  },
});
</script>

<style scoped>
.progress-container {
  width: 100%;
  padding: 25px 35px;
}

.progress-max {
  height: 6px;
  background-color: #e4e4e6;
  border-radius: 3px;
  overflow: hidden;
}

.progress-degree {
  height: 100%;
  background-color: #fab809;
  border-radius: 3px;
  transition: width 0.3s ease-in-out;
}
</style>
