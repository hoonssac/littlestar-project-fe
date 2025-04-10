<template>
    <Pokedex></Pokedex>
</template>
<script setup>
import { useRoute } from 'vue-router';
import Pokedex from '@/components/pokemon/Pokedex.vue';
const currentRoute = useRoute();
</script>
