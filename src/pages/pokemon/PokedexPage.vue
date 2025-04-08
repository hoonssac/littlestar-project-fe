<template>
  <div class="container">
    <h1>로고, 마일리지 자리</h1>
    <Pokedex />
  </div>
</template>
<script setup>
import Pokedex from '@/components/pokemon/Pokedex.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
