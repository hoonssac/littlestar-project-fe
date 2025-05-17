<template>
  <div class="signup-container">
    <div class="logo-container">
      <img class="logo-img" src="@/assets/images/logo.png" alt="" />
    </div>

    <div class="inputs-container">
      <p>별명</p>
      <input
        v-model="username"
        type="text"
        placeholder="별명을 입력하세요. (2글자 이상)"
      />
      <p>비밀번호</p>
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호를 입력하세요. (4글자 이상)"
      />
      <p>나이</p>
      <div class="select-wrapper">
        <select v-model="age" name="age" id="age">
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
  <TeamRocketAlert :show="showAlert" :message="alertMessage" />
</template>

<script setup>
import { isUsernameTaken } from '@/apis/users';
import CustomButton from '@/components/common/CustomButton.vue';
import TeamRocketAlert from '@/components/common/TeamRocketAlert.vue';
import { useSignupStore } from '@/stores/signupStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const signupStore = useSignupStore();

const router = useRouter();

const username = ref();
const password = ref();
const age = ref('');
const showAlert = ref(false);
const alertMessage = ref('');

const handleNavigate = async (routeName) => {
  if (
    username.value === undefined ||
    username.value.length < 2 ||
    password.value < 4 ||
    !age.value
  ) {
    showTemporaryAlert('입력값을 다시 확인해주세요.');
    return;
  }

  const isDuplicated = await isUsernameTaken(username.value);
  console.log('hihi');
  if (isDuplicated) {
    console.log('hellohello');
    showTemporaryAlert('이미 존재하는 별명입니다.');
    return;
  }

  signupStore.username = username.value;
  signupStore.password = password.value;
  signupStore.age = age.value;

  router.push({ name: routeName });
};

const showTemporaryAlert = (message) => {
  alertMessage.value = message;
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 2000);
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
