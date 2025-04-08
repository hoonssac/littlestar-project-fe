<template>
  <div class="container">
    <h1 v-if="isLoading">로딩 중...</h1>

    <div v-else>
      <!-- 대표 포켓몬 -->

      <div
        v-if="mainPokemon"
        class="main-pokemon-container">
        <h4>나의 대표 포켓몬</h4>
        <h2>{{ mainPokemon.name }}</h2>
        <img
          :src="mainPokemon.image_url"
          alt="Main Pokemon"
          class="main-pokemon-image" />
      </div>
      <div v-else>
        <p>대표 포켓몬을 불러오는 중이에요...</p>
      </div>

      <!-- 도감 시작 -->
      <ul class="pokemon-list">
        <li
          class="pokemon-container"
          v-for="pokemon in displayPokedex"
          :key="pokemon.id + pokemon.name">
          No. {{ pokemon.id }}
          <img
            :src="pokemon.image_url"
            alt="Pokemon Image"
            :class="pokemon.isOwned ? 'pokemon-image' : 'pokeball-image'" />
          {{ pokemon.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { usePokedexStore } from '@/stores/pokedex';
import { computed, onMounted, watchEffect } from 'vue';

const pokedexStore = usePokedexStore();

const user = pokedexStore.user;
const pokedex = computed(() => pokedexStore.pokedex);
const isLoading = computed(() => pokedexStore.isLoading);
const fetchUser = pokedexStore.fetchUser;
const fetchPokedex = pokedexStore.fetchPokedex;
const mainPokemon = computed(() => pokedexStore.mainPokemon);
const displayPokedex = computed(() => pokedexStore.displayPokedex);

onMounted(async () => {
  await fetchUser();
  console.log('🧪 fetchUser 후 user:', user);
  await fetchPokedex();
  console.log('🧪 fetchPokedex 후 pokedex:', pokedex);
  pokedexStore.calculateMainPokemon();
  console.log('onMounted 실행됨!');
});
</script>

<style scoped>
.main-pokemon-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main-pokemon-image {
  width: 200px;
  height: auto;
  object-fit: contain;
  margin-top: 16px;
}
.pokemon-list {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개 */
  gap: 16px;
  padding: 0;
  list-style: none;
}
.pokemon-container {
  display: flex;
  flex-direction: column; /* ← 요게 핵심! */
  align-items: center; /* 중앙 정렬하면 보기 더 좋음 */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.pokemon-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.pokeball-image {
  width: 60px; /* 👈 요걸로 살짝 작게 조절! */
  height: 60px;
  object-fit: contain;
  opacity: 0.7; /* 흐릿하게도 가능! */
}
</style>
