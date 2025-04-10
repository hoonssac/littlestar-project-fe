<template>
  <div class="login-container">
    <div class="logo-container">
      <img class="logo-img" src="@/assets/images/logo.png" alt="" />
    </div>

    <div class="inputs-container">
      <p>별명</p>
      <input v-model="username" type="text" placeholder="별명을 입력하세요." />
      <p>비밀번호</p>
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호를 입력하세요."
      />
    </div>

    <div class="bottom-button-container">
      <CustomButton
        class="bottom-button"
        category="secondary"
        @click="handleNavigate('signup')"
      >
        회원가입
      </CustomButton>
      <CustomButton
        class="bottom-button"
        category="primary"
        @click="handleLogin"
      >
        로그인
      </CustomButton>
    </div>
  </div>
</template>

<script setup>
import { login } from '@/apis/users';
import CustomButton from '@/components/common/CustomButton.vue';
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref();
const password = ref();
const router = useRouter();

const handleNavigate = (routeName) => {
  router.push({ name: routeName });
};

const handleLogin = async () => {
  // TODO: 로그인 api 구현!!!
  if (!username.value || !password.value) {
    alert('아이디와 비밀번호를 다시 확인하세요!');
    return;
  }
  const user = await login(username.value, password.value);

  if (!user) {
    alert('일치하는 사용자가 없습니다!');
    return;
  }

  const authStore = useAuthStore();
  console.log(authStore);
  handleNavigate('home');
};
</script>

<style scoped>
.login-container {
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
}
input {
  margin-top: -20px;
  position: relative;
  background-color: white;
  color: #4a483f;
  padding: 10px 20px;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;

  border-style: solid;
  border-color: #4a483f;
  border-radius: 13px;
  border-top-width: 1px;
  border-right-width: 4px;
  border-bottom-width: 4px;
  border-left-width: 1px;
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
.login-container::before {
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
