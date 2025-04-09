<template>
  <div class="home-container">
    <ProgressBar :degree="10" />
    <div class="mileage-container">
      <p class="mileage-text">500 / 5000</p>
      <IconMileage color="#FAB809" size="20" />
    </div>

    <div class="info-container" size="small">
      <p>No. 14 피카츄</p>
      <p>타입: 전기</p>
      <p>크기: 0.4cm</p>
      <p>무게: 6.0kg</p>
    </div>

    <div class="main-pokemon-container">
      <img
        class="main-pokemon-img"
        src="@/assets/images/pokemon-gacha.png"
        alt=""
        width="400"
      />
    </div>

    <div class="add-button-container">
      <CustomButton class="add-button" size="large">
        <p class="plus-text">+</p>
        <p>빠른 추가</p>
      </CustomButton>
    </div>
  </div>
</template>

<script setup>
import CustomButton from '@/components/common/CustomButton.vue';
import { IconMileage } from '@/components/common/icons';
import ProgressBar from '@/components/common/ProgressBar.vue';
</script>

<style scoped>
.home-container {
  height: 100%;
  position: relative;
}

.mileage-container {
  display: flex;
  align-items: center;
  gap: 3px;
  padding-left: 35px;
  margin-top: -10px;
}
.mileage-text {
  font-size: 20px;
}

.info-container {
  background-color: white;
  color: #4a483f;
  padding: 10px 20px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  position: absolute;
  top: 80px;
  right: 25px;

  border-style: solid;
  border-color: #4a483f;
  border-radius: 13px;
  border-top-width: 1px;
  border-right-width: 4px;
  border-bottom-width: 4px;
  border-left-width: 1px;
}

.main-pokemon-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.main-pokemon-img {
  position: relative;
  z-index: 10;
}

.add-button-container {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  padding: 0 25px 45px 25px;
}
.add-button {
  display: flex;
  gap: 15px;
  align-items: center;
  flex: 1;
  justify-content: center;
}

.plus-text {
  font-size: 60px;
  line-height: 0.8;
}

/* 배경 몬스터볼 */
.home-container::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  background-image: url('@/assets/images/monster-ball-back.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: translate(-50%, -50%);
  z-index: 0;
}
</style>
