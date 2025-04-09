<template>
  <div class="container">
    <div class="gacha-container">
      <img
        src="@/assets/images/pokemon-gacha.png"
        class="pokemon-gacha-image" />
      <div class="available-ticket">
        <!-- 사용 가능한 뽑기권 표시 -->
        <p v-if="user.ticket_count > 0">
          🎟 사용 가능한 뽑기권: {{ user.ticket_count }}개
        </p>
        <p v-else>❌ 사용 가능한 뽑기권이 없어요!</p>
        <p>다음 뽑기권까지 필요한 마일리지</p>
      </div>

      <div class="button-container">
        <CustomButton
          category="secondary"
          class="fixed-modal-button"
          @click="backToPokedex">
          도감 확인</CustomButton
        >
        <CustomButton
          class="fixed-modal-button"
          @click="handleGacha()">
          뽑기</CustomButton
        >
      </div>
      <div class="result-modal-container">
        <!-- 커스텀 모달 사용 -->
        <CustomModal
          v-if="isModalVisible"
          @close="isModalVisible = false"
          :title="null"
          class="pokemon-detail-modal">
          <div class="modal-content">
            <!-- 트랜지션 적용 (out-in을 추가하여 부드러운 전환) -->
            <Transition
              name="fade"
              mode="out-in">
              <div
                v-if="isDrawing"
                key="drawing">
                <h2>포켓몬을</h2>
                <h2>뽑는 중...</h2>
                <img
                  :src="pokemonGachaImage"
                  class="pokemon-gacha-modal-image"
                  alt="포켓몬 가챠 중" />
                <h4>두근두근!</h4>
              </div>
              <div
                v-else-if="selectedPokemon"
                key="result">
                <h2>No. {{ selectedPokemon.id }}</h2>
                <h2>{{ selectedPokemon.name }}(이)가</h2>
                <h2>뽑혔다!🎉</h2>

                <img
                  :src="selectedPokemon.image_url"
                  class="selected-pokemon-image"
                  alt="포켓몬 이미지" />
                <div class="drawn-pokemon-detail">
                  <h4>키: {{ selectedPokemon.height }}cm</h4>
                  <h4>몸무게: {{ selectedPokemon.weight }}kg</h4>
                  <h4>타입: {{ selectedPokemon.types.join(', ') }}</h4>
                </div>
                <CustomButton
                  class="result-check-button"
                  @click="closeModal"
                  >확인</CustomButton
                >
              </div>
            </Transition>
          </div>
        </CustomModal>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, watchEffect, onMounted } from 'vue';
import { usePokedexStore } from '@/stores/pokedex';
import CustomButton from '../common/CustomButton.vue';
import CustomModal from '../common/CustomModal.vue';
import pokemonGachaImage from '@/assets/images/pokemon-gacha.png';

const pokedexStore = usePokedexStore();
const user = pokedexStore.user;
const pokedex = computed(() => pokedexStore.pokedex);
const fetchUser = pokedexStore.fetchUser;
const fetchPokedex = pokedexStore.fetchPokedex;
const handleGacha = pokedexStore.handleGacha;
const isDrawing = computed(() => pokedexStore.isDrawing);
const selectedPokemon = computed(() => pokedexStore.selectedPokemon);
const isModalVisible = computed(() => pokedexStore.isModalVisible);
const closeModal = pokedexStore.closeModal;

onMounted(async () => {
  await fetchUser();
  console.log('가챠 페이지 - fetchUser 완료', user);
  await fetchPokedex();
  console.log('가챠 페이지 - fetchPokedex 완료!', pokedex);
  pokedexStore.calculateMainPokemon();
  console.log('onMounted 실행됨!');
});
</script>
<style scoped>
.gacha-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pokemon-gacha-image {
  width: 40%;
  margin-top: 80px;
}

.pokemon-gacha-modal-image {
  width: 200px;
  height: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
.available-ticket {
  font-size: 24px;
  margin: 12px;
}

.button-container {
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
}

.result-modal-container {
  display: flex;
  flex-direction: column;
}

.modal-title:empty {
  margin: 0; /* title이 없으면 여백 제거 */
  padding: 0;
}

:deep(.pokemon-detail-modal .modal-container) {
  display: flex;
  justify-content: center;
  width: 300px;
  height: 500px;
  max-width: 90%;
}

:deep(.pokemon-detail-modal .modal-description) {
  font-size: 24px;
  line-height: 1.4;
  margin-bottom: 8px;
}

.selected-pokemon-image {
  width: 150px;
}

.fixed-modal-button {
  width: 200px; /* 원하는 고정된 너비 */
  height: 48px;
  font-size: 18px;
  white-space: nowrap; /* 줄바꿈 방지 */
  margin: auto;
}

.drawn-pokemon-detail h4 {
  line-height: 1; /* 줄 간격을 줄임 (기본값: 1.5) */
}

.result-check-button {
  margin-top: 8px;
  margin-bottom: 24px;
  width: 200px;
  height: 48px;
  font-size: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
