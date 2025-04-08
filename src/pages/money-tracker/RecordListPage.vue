<template>
  <div class="container"></div>
</template>
<script setup>
import { useRoute } from 'vue-router';

const currentRoute = useRoute();
currentRoute.params.categoryId;
</script>
<style scoped></style>
