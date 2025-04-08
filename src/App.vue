<template>
  <div class="main-container">
    <div class="hello"></div>

    <!-- 임시 네비게이션 바 -->
    <!-- 첫 페이지에서 네비게이션 바 두 번 렌더링됨 - 해결필요 -->
    <nav class="navbar">
      <router-link to="/pokedex">📘 도감</router-link>
      <router-link to="/money-tracker">💰 가계부</router-link>
      <router-link to="/quiz">🔎 퀴즈</router-link>
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
