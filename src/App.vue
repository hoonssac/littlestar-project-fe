<template>
  <div class="main-container">
    <div class="hello">
      <!-- <MoneyTrackPage /> -->
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import MoneyTrackPage from './pages/money-tracker/MoneyTrackPage.vue';
</script>

<style scoped>
.hello {
  display: flex;
  justify-content: space-between;
}
</style>
