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
.main-container {
  display: flex;
}

.app-container {
  min-height: 100vh;
  padding: 70px 0 80px 0;
  overflow-y: auto;
  flex: 1;
}

.navbar {
  display: flex;
  justify-content: end;
}
</style>
