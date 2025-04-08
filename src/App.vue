<template>
  <div class="main-container">
    <TopBar />
    <div class="app-container"></div>
    <BottomBar />
  </div>
</template>

<script setup>
import BottomBar from './components/common/BottomBar.vue';
import TopBar from './components/common/TopBar.vue';
</script>

<style scoped>
.app-container {
  padding: 70px 0 95px 0;
}
</style>
