<template>
  <div class="container">
    <div class="gacha-container">
      <div
        class="gacha-button"
        @click="handleGacha">
        <img
          src="@/assets/images/pokemon-gacha.png"
          class="pokemon-gacha-image" />
        <h1 class="gacha-5000mileage mileage-text">
          5000<IconMileage></IconMileage>
        </h1>
      </div>
      <div class="my-mileage">
        <!-- 사용 가능한 뽑기권 표시 -->
        <h4>나의 마일리지</h4>
        <div class="my-mileage-amount mileage-text">
          <h3>0</h3>
          <h3>5000</h3>
        </div>
        <div class="progress-wrapper">
          <ProgressBar
            :degree="userMileageDegree"
            class="gacha-progress-bar"></ProgressBar>
        </div>
      </div>

      <div class="button-container">
        <CustomButton
          category="secondary"
          class="fixed-modal-button"
          @click="backToPokedex">
          도감으로 돌아가기</CustomButton
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
                  <h4>타입: {{ Array.isArray(selectedPokemon.types) ? selectedPokemon.types.join(', ') : selectedPokemon.types }}</h4>
                </div>
                <CustomButton
                  class="result-check-button"
                  @click="closeGachaModal"
                  >확인</CustomButton
                >
              </div>
            </Transition>
          </div>
        </CustomModal>
        <!-- 팀 로켓 알림 -->
        <TeamRocketAlert
          :show="isAlertVisible"
          :message="alertMessage"
          class="alert-message" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, watchEffect, onMounted } from 'vue';
import { usePokedexStore } from '@/stores/pokedex';
import { useAuthStore } from '@/stores/authStore';
import CustomButton from '../common/CustomButton.vue';
import CustomModal from '../common/CustomModal.vue';
import pokemonGachaImage from '@/assets/images/pokemon-gacha.png';
import IconMileage from '../common/icons/IconMileage.vue';
import ProgressBar from '../common/ProgressBar.vue';
import TeamRocketAlert from '@/components/common/TeamRocketAlert.vue';

const pokedexStore = usePokedexStore();
const authStore = useAuthStore();
const user = pokedexStore.user;
const pokedex = computed(() => pokedexStore.pokedex);
const fetchUser = pokedexStore.fetchUser;
const fetchPokedex = pokedexStore.fetchPokedex;
const handleGacha = pokedexStore.handleGacha;
const isDrawing = computed(() => pokedexStore.isDrawing);
const selectedPokemon = computed(() => pokedexStore.selectedPokemon);
const isModalVisible = computed(() => pokedexStore.isModalVisible);
const closeGachaModal = pokedexStore.closeGachaModal;
const maxMileage = pokedexStore.maxMileage;
const userMileage = pokedexStore.userMileage;
const userMileageDegree = pokedexStore.userMileageDegree;
const fetchMileageData = pokedexStore.fetchMileageData;
const isAlertVisible = computed(() => pokedexStore.isAlertVisible);
const alertMessage = computed(() => pokedexStore.alertMessage);
const backToPokedex = pokedexStore.backToPokedex

onMounted(async () => {
  await fetchUser();
  console.log('가챠 페이지 - fetchUser 완료', user);
  await fetchPokedex();
  console.log('가챠 페이지 - fetchPokedex 완료!', pokedex);
  pokedexStore.calculateMainPokemon();
  await fetchMileageData();
  console.log('유저 마일리지 불러옴', authStore.user.mileage);
  console.log(userMileageDegree);
  console.log('onMounted 실행됨!');
  user.value = { ...user.value };
});
</script>
<style scoped>
.gacha-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pokemon-gacha-image {
  width: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.pokemon-gacha-modal-image {
  width: 200px;
  height: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}

.gacha-button {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background-color: #fffdf3; /* 🌟 아주 연한 노란색 */
  border-radius: 32px; /* 둥근 모서리 */
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  align-items: center; /* 가운데 정렬 */
  justify-content: center; /* 내부 요소 중앙 정렬 */
  cursor: pointer; /* 클릭 가능하도록 변경 */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  max-width: 320px; /* 🛠️ 최대 너비 제한 */
  height: 400px;
  color: #fab809;
}

.gacha-button:hover {
  transform: scale(1.05); /* 마우스 올리면 살짝 커지게 */
  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.3); /* hover 시 그림자 강화 */
}

.gacha-5000mileage {
  white-space: nowrap; /* 줄바꿈 방지 */
  display: inline-flex; /* 요소가 한 줄에 유지되도록 설정 */
  align-items: center; /* 아이콘과 텍스트 정렬 */
}

.my-mileage {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  max-width: 80%;
}

.my-mileage-amount {
  display: flex;
  justify-content: space-between;
  width: 410px;
  color: #fab809;
  max-width: 100%;
}

.progress-wrapper {
  max-width: 410px; /* ✅ 부모 요소에 너비 고정 */
  width: 100%;
  margin: 0 auto; /* ✅ 가운데 정렬 */
}

.gacha-progress-bar {
  padding: 0;
  margin-top: 4px;
  margin-bottom: 24px; /* ✅ 가운데 정렬 */
}

.button-container {
  display: flex;
  justify-content: center;
  max-width: 80%;
  gap: 10px;
  margin-bottom: 20px;
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
  width: 410px; /* 원하는 고정된 너비 */
  height: 52px;
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

.alert-message {
  width: 420px;
  white-space: pre-line !important;
}
</style>
