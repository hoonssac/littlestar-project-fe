<template>
  <div class="container">
    <h1>로고, 마일리지 자리</h1>
    <Pokedex></Pokedex>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import Pokedex from '@/components/pokemon/Pokedex.vue';
const currentRoute = useRoute();
</script>
