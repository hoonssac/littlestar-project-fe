<template>
  <div class="main-container">
    <div class="hello"></div>
    <!-- 네비게이션 바를 항상 두되, 페이지별로 조건을 추가하여 보이거나 숨기기 -->
    <!-- 첫 페이지에서 네비게이션 바 보이도록, 그 외 페이지에서는 안 보이게 처리 -->
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
