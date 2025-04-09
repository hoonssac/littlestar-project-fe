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
      <div class="pokedex-container">
        <!-- 도감 시작 -->
        <ul class="pokemon-list">
          <li
            class="pokemon-container"
            v-for="pokemon in displayPokedex"
            :key="pokemon.id + pokemon.name"
            @click="openModal(pokemon)">
            No. {{ pokemon.id }}
            <img
              :src="pokemon.image_url"
              alt="Pokemon Image"
              :class="pokemon.isOwned ? 'pokemon-image' : 'pokeball-image'" />
            {{ pokemon.name }}
          </li>
        </ul>

        <router-link
          to="/gacha"
          class="gacha-button">
          <img
            src="@/assets/images/gacha.png"
            alt="pokemon gacha" />
        </router-link>
        <router-view></router-view>
      </div>

      <!-- 포켓몬 모달 -->
      <CustomModal
        v-if="isModalVisible"
        class="pokemon-detail-modal"
        :title="
          isOwned
            ? `No.${selectedPokemon.id}\n${selectedPokemon?.name} `
            : `No. ?\n???`
        "
        :description="
          isOwned
            ? `타입: ${selectedPokemon?.types.join(', ')}\n키: ${
                selectedPokemon?.height
              }cm\n몸무게: ${selectedPokemon?.weight}kg`
            : '미지의 포켓몬'
        "
        :img="isOwned ? selectedPokemon?.image_url : monsterBallImage"
        :class="{ 'small-monsterball': !isOwned, 'owned-modal': isOwned }">
        <div class="modal-button-container">
          <CustomButton
            category="secondary"
            class="fixed-modal-button"
            @click="closeModal"
            >취소</CustomButton
          >
          <CustomButton
            class="fixed-modal-button"
            @click="setMainPokemon(selectedPokemon.id)"
            >대표 설정</CustomButton
          >
        </div>
      </CustomModal>
    </div>
  </div>
</template>
<script setup>
import { usePokedexStore } from '@/stores/pokedex';
import { computed, onMounted, watchEffect } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import CustomModal from '@/components/common/CustomModal.vue';
import CustomButton from '@/components/common/CustomButton.vue';
import monsterBallImage from '@/assets/images/monster-ball.png';


const pokedexStore = usePokedexStore();

const user = pokedexStore.user;
const pokedex = computed(() => pokedexStore.pokedex);
const isLoading = computed(() => pokedexStore.isLoading);
const fetchUser = pokedexStore.fetchUser;
const fetchPokedex = pokedexStore.fetchPokedex;
const mainPokemon = computed(() => pokedexStore.mainPokemon);
const displayPokedex = computed(() => pokedexStore.displayPokedex);
const isModalVisible = computed(() => pokedexStore.isModalVisible);
const selectedPokemon = computed(() => pokedexStore.selectedPokemon);
const isOwned = computed(() => {
  return selectedPokemon.value
    ? pokedexStore.isOwnedPokemon(selectedPokemon.value.id)
    : false;
});
const setMainPokemon = pokedexStore.setMainPokemon;
const openModal = pokedexStore.openModal;
const closeModal = pokedexStore.closeModal;

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
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 0;
  list-style: none;
}

.pokemon-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border: 0.5px solid #ccc;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.pokemon-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.pokeball-image {
  width: 60px; /* 👈 요걸로 살짝 작게 조절! */
  height: 100px;
  object-fit: contain;
  opacity: 0.7; /* 흐릿하게도 가능! */
}

:deep(.pokemon-detail-modal .modal-container) {
  width: 300px;
  max-width: 90%;
}

:deep(.pokemon-detail-modal .modal-description) {
  font-size: 24px;
  line-height: 1.4;
  margin-bottom: 8px;
}

:deep(.small-monsterball) img {
  width: 150px;
  height: 150px;
  display: block;
  margin: 0 auto;
  margin-bottom: 16px;
}

.fixed-modal-button {
  width: 120px; /* 원하는 고정된 너비 */
  height: 48px;
  font-size: 18px;
  white-space: nowrap; /* 줄바꿈 방지 */
}

.modal-button-container {
  display: flex;
  justify-content: space-evenly;
}

/* ✅ 가챠 버튼 (container 내부에서 고정 위치) */
.gacha-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소 위에 떠 있도록 */
}

.gacha-button img {
  width: 100px; /* 원하는 크기로 조절 */
  height: auto;
}
</style>
