<template>
  <div class="main-container">
    <TopBar />
    <div class="app-container">
      <router-view></router-view>
    </div>
    <BottomBar />
  </div>
</template>

<script setup>
import BottomBar from './components/common/BottomBar.vue';
import TopBar from './components/common/TopBar.vue';
</script>

<style scoped>
.app-container {
  overflow-y: auto;
  padding: 70px 0 95px 0;
}

.navbar {
  display: flex;
  justify-content: end;
}
</style>
