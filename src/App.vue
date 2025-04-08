<template>
  <div class="main-container">
    <div class="hello">
      <p>hello vue!!</p>
      <p>hi hi</p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style scoped>
.hello {
  display: flex;
  justify-content: space-between;
}
</style>
