<template>
  <div class="main-container">
    <div class="hello"></div>
    <nav class="navbar">
      <router-link to="/pokedex">📘 도감</router-link>
      <router-link to="/money-tracker">💰 가계부</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup></script>

<style scoped>
.hello {
  display: flex;
  justify-content: space-between;
}

.navbar {
  display: flex;
  justify-content: end;
}
</style>
