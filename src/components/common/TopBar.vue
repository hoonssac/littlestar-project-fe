<template>
  <div class="top-container">
    <img class="logo" src="@/assets/images/logo.png" alt="" />
    <div class="mileage-container">
      <p class="mileage-text">{{ userMileage }}</p>
      <IconMileage color="#FAB809" size="27" />
    </div>
  </div>
</template>

<script setup>
import { IconMileage } from './icons';
import { useAuthStore } from '@/stores/authStore';
import { computed } from 'vue';

const authStore = useAuthStore();

const userMileage = computed(() => {
  if (authStore.user) {
    return authStore.user.mileage;
  }
});
</script>

<style scoped>
.top-container {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 767px;
  z-index: 100;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 25px;
}
.logo {
  height: 44px;
}
.mileage-container {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 26px;
  color: #fab809;
}
</style>
