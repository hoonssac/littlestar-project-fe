<template>
  <div class="bottom-container">
    <div class="nav-container">
      <div
        @click="handleNavigate('money-tracker')"
        class="button nav-item-container"
      >
        <IconMoneyTrack color="#4A483F" />
        <p>가계부</p>
      </div>
      <div
        @click="handleNavigate('statistics')"
        class="button nav-item-container"
      >
        <IconStatistics color="#4A483F" />
        <p>통계</p>
      </div>
      <div class="nav-item-container"></div>
      <div @click="handleNavigate('quiz')" class="button nav-item-container">
        <IconQuiz color="#4A483F" />
        <p>퀴즈</p>
      </div>
      <div @click="handleNavigate('pokedex')" class="button nav-item-container">
        <IconPokemon color="#4A483F" />
        <p>포켓몬</p>
      </div>
    </div>
    <div @click="handleNavigate('home')" class="button home-button">
      <IconHome />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {
  IconHome,
  IconMoneyTrack,
  IconPokemon,
  IconStatistics,
  IconQuiz,
} from './icons';

const router = useRouter();

const handleNavigate = (routeName) => {
  // TODO: 템플릿 호출 시 실제 routeName로 변경하기!!!!
  router.push({ name: routeName });
};
</script>

<style scoped>
.bottom-container {
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: 767px;
  z-index: 100;
  background-color: white;
}

.nav-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 0;
  height: 80px;
}

.nav-item-container {
  min-width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}
.home-button {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fed337;
  border-radius: 35px;
}

.button {
  cursor: pointer;
}
</style>
