<template>
  <div class="signup-container">
    <div class="logo-container">
      <img class="logo-img" src="@/assets/images/logo.png" alt="" />
    </div>

    <div class="inputs-container">
      <p>별명</p>
      <input type="text" placeholder="별명을 입력하세요. (2글자 이상)" />
      <p>비밀번호</p>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요. (4글자 이상)"
      />
      <p>나이</p>
      <div class="select-wrapper">
        <select name="age" id="age">
          <option value="" disabled selected hidden>=== 나이선택 ===</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14~">14~</option>
        </select>
      </div>
    </div>

    <div class="bottom-button-container">
      <CustomButton
        class="bottom-button"
        category="primary"
        @click="handleNavigate('select-main-pokemon')"
      >
        회원가입
      </CustomButton>
    </div>
  </div>
</template>

<script setup>
import CustomButton from '@/components/common/CustomButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleNavigate = (routeName) => {
  router.push({ name: routeName });
};
</script>

<style scoped>
.signup-container {
  position: relative;
  height: 100%;
}

.logo-container {
  display: flex;
  width: 100%;
  justify-content: center;
}
.logo-img {
  width: 85%;
  max-width: 478px;
  position: relative;
  padding-top: 60px;
}

.inputs-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 60px 25px 0;
  gap: 30px;
}
p {
  font-size: 24px;
  padding-left: 20px;
  margin-bottom: -20px;
}
input,
select {
  /* margin-top: -20px; */
  position: relative;
  background-color: white;
  color: #4a483f;
  padding: 0 20px;
  font-size: 24px;

  width: 100%;
  height: 60px;
  line-height: 60px;
  appearance: none;

  border-style: solid;
  border-color: #4a483f;
  border-radius: 13px;
  border-top-width: 1px;
  border-right-width: 4px;
  border-bottom-width: 4px;
  border-left-width: 1px;
}

option {
  margin-top: -10px;
}

select {
  cursor: pointer;
}

.select-wrapper {
  position: relative;
  width: 100%;
  display: block;
  cursor: pointer;
}
.select-wrapper::after {
  content: '▾'; /* 원하는 화살표 문자 */
  position: absolute;
  top: 50%;
  right: 20px;
  font-size: 50px;
  line-height: 0.4;
  color: #4a483f;
  transform: translateY(-50%);
  pointer-events: none;
}

.bottom-button-container {
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  padding: 0 25px 25px;
  gap: 20px;
  margin-bottom: -80px;
}
.bottom-button {
  width: 100%;
}

/* 배경 몬스터볼 */
.signup-container::before {
  content: '';
  position: absolute;
  top: 4%;
  left: 50%;
  max-width: 450px;
  max-height: 450px;
  width: 80%;
  height: 80%;
  background-image: url('@/assets/images/monster-ball-back.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: translate(-50%, -50%);
  z-index: 0;
}
</style>
