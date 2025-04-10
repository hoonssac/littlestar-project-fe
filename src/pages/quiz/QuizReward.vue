<template>
  <div class="quiz-result">
    <div class="content-wrapper">
      <div class="result-wrapper">
        <!-- <div class="result-image spin-in-fade-up spin-in">
          <IconMileage size="120" color="#FAB809" />
        </div> -->
        <MileageDisplay :size="120" color="#FAB809" class="delay-1" />

        <MileageCounter
          :amount="mileage"
          :duration="1200"
          class="mileage fade-up delay-2"
        />

        <p class="result-text fade-up delay-3">그래도 잘했어요!</p>
        <p class="sub-text fade-up delay-4">500 마일리지 획득</p>
      </div>
    </div>

    <div class="footer-button fade-up delay-5">
      <CustomButton
        category="primary"
        size="medium"
        style="width: 80%; max-width: 400px"
        @click="goToPokedex"
      >
        포켓몬 뽑으러 가기
      </CustomButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuizResultStore } from '@/stores/quizResult';
import CustomButton from '@/components/common/CustomButton.vue';
import axios from 'axios';
import MileageDisplay from '@/components/quiz/MileageDisplay.vue';
import MileageCounter from '@/components/quiz/MileageCounter.vue';
import { useAuthStore } from '@/stores/authStore';
import { getUserInfo } from '@/apis/users';
import GetMileageSound from '@/assets/sounds/GetMileage.mp3';

const quizResult = useQuizResultStore();
const route = useRoute();
const router = useRouter();
const isCorrect = quizResult.isCorrect;
const mileage = quizResult.mileage;
const explanation = quizResult.explanation;
const last_answered_date = quizResult.last_answered_date;
const authStore = useAuthStore();

function getTodayDateString() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

onMounted(async () => {
  // 🎵 효과음 재생
  const audio = new Audio(GetMileageSound);
  audio.volume = 0.6;

  audio.play().catch((err) => {
    console.warn('🔇 효과음 자동재생 실패:', err);
  });
  try {
    // 먼저 기존 유저 정보 가져오기
    const userId = authStore.user.id;
    const res = await axios.get(`/api/users/${userId}`);
    const currentMileage = res.data.mileage;

    // 마일리지 500 추가해서 PATCH 요청 보내기
    await axios.patch(`/api/users/${userId}`, {
      mileage: currentMileage + 500,
      last_answered_date: getTodayDateString(),
    });

    const fetchUser = async () => {
      if (authStore.user) {
        await getUserInfo(authStore.user.id);
      }
    };

    await fetchUser();

    console.log('마일리지 지급 완료!');
    console.log(currentMileage);
  } catch (error) {
    console.error('마일리지 업데이트 실패:', error);
  }
});

function goToPokedex() {
  router.push('/pokedex');
}
</script>

<style scoped>
/* ✅ QuizResult.vue 스타일 재사용 */

.quiz-result {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 2rem 1rem;
  text-align: center;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;
}

.result-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.result-image {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.mileage {
  font-size: 40px;

  font-family: 'Pretendard Variable', Pretendard, -apple-system,
    BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI',
    'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: bold;
  color: #fab809;
}

.result-text {
  font-size: 35px;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}

.sub-text {
  font-size: 20px;
  color: #555;
  margin-bottom: 4rem;
}

.footer-button {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}

.fade-up {
  opacity: 0;
  transform: translateY(40px);
  animation: fadeUp 0.5s ease-out forwards;
}

.delay-1 {
  animation-delay: 0.2s;
}
.delay-2 {
  animation-delay: 0.4s;
}
.delay-3 {
  animation-delay: 0.6s;
}
.delay-4 {
  animation-delay: 0.8s;
}
.delay-5 {
  animation-delay: 1.4s;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.spin-in {
  animation: spinInY 0.8s ease-out forwards;
  transform-style: preserve-3d; /* ✅ 3D 회전 자연스럽게 */
}

.spin-in-fade-up {
  animation: spinInFadeUp 0.8s ease-out forwards;
  transform-style: preserve-3d;
}

@keyframes spinInFadeUp {
  0% {
    opacity: 0;
    transform: rotateY(90deg) scale(0.8) translateY(80px);
  }
  60% {
    opacity: 1;
    transform: rotateY(180deg) scale(1.05) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: rotateY(360deg) scale(1) translateY(0);
  }
}
</style>
