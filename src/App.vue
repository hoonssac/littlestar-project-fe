<template>
  <div class="main-container">
    <div class="hello"></div>
    <PokedexPage />
  </div>
</template>

<script setup>
import PokedexPage from './pages/pokemon/PokedexPage.vue';
</script>

<style scoped>
.hello {
  display: flex;
  justify-content: space-between;
}
</style>
