<template>
  <div class="quiz-intro">
    <!-- 타이틀 -->
    <transition name="fade-up" appear>
      <div class="quiz-title" style="transition-delay: 0.2s">
        <h2>
          오늘의 퀴즈
          <img src="@/assets/images/pikachu.png" alt="피카츄" class="pikachu" />
        </h2>
      </div>
    </transition>

    <!-- 설명 -->

    <div class="quiz-desc">
      <transition name="fade-up" appear>
        <p class="quiz-desc-1" style="transition-delay: 0.6s">
          정답을 맞히면 포켓몬을 뽑을 수 있는<br />마일리지를 받을 수 있어요!
        </p>
      </transition>

      <transition name="fade-up" appear>
        <p class="quiz-desc-2" style="transition-delay: 1s">
          퀴즈는 하루에 한 번만 도전 가능해요
        </p>
      </transition>
    </div>

    <!-- 이미지 -->
    <transition name="fade-up" appear>
      <img
        src="@/assets/images/dice.png"
        alt="물음표 박스"
        class="question-box"
        style="transition-delay: 1.4s"
      />
    </transition>

    <!-- START 버튼 -->
    <transition name="fade-up" appear>
      <CustomButton
        :category="buttonCategory"
        size="medium"
        class="start-button"
        :class="{ faded: !showButton }"
        style="transition-delay: 1.8s"
        @click="goToQuiz"
      >
        START
      </CustomButton>
    </transition>

    <transition name="scale-fade">
      <TodayLimitModal v-if="showModal" @close="showModal = false" />
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import TodayLimitModal from '@/components/quiz/TodayLimitModal.vue'; // 모달 컴포넌트
import CustomButton from '@/components/common/CustomButton.vue';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const showButton = ref(false);
const showModal = ref(false);
const authStore = useAuthStore();

function getTodayDateString() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

const goToQuiz = async () => {
  try {
    const userId = authStore.user.id;
    const res = await axios.get(`/api/users/${userId}`); // 임시 사용자
    const lastAnswered = res.data.last_answered_date;
    const today = getTodayDateString();

    if (lastAnswered === today) {
      showModal.value = true; // 👉 오늘 이미 풀었으면 모달 표시
    } else {
      router.push('/quiz/intro'); // 👉 아직 안 풀었으면 퀴즈 시작
    }
  } catch (err) {
    console.error('유저 정보 불러오기 실패:', err);
  }
};

onMounted(() => {
  setTimeout(() => (showButton.value = true), 1400); // 딜레이 등장
});
</script>

<style scoped>
.quiz-intro {
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.faded {
  opacity: 0;
  pointer-events: none;
}

.fade-up-appear-from,
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(60px);
}
.fade-up-appear-to,
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-up-appear-active,
.fade-up-enter-active {
  transition: all 0.8s ease;
}

/* 딜레이 간격 늘리기 */
.delay-1.fade-up-appear-active {
  transition-delay: 0.2s;
}
.delay-2.fade-up-appear-active {
  transition-delay: 0.6s;
}
.delay-3.fade-up-appear-active {
  transition-delay: 1s;
}
.delay-4.fade-up-appear-active {
  transition-delay: 1.4s;
}
.delay-4.fade-up-appear-active {
  transition-delay: 1.8s;
}

.invisible {
  visibility: hidden;
}

/* 기타 스타일 */
.quiz-title {
  font-size: 33px;
  margin: 0;
}
.pikachu {
  width: 4rem;
}
.quiz-desc {
  margin: 0 1rem;
}
.quiz-desc-1 {
  font-size: 22px;
}
.quiz-desc-2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0;

  margin-top: 10px;
}
.question-box {
  width: 300px;
  padding-bottom: 15px;
}
.start-button {
  font-size: 48px;

  padding: 0.1rem 2rem;

  transition: transform 0.2s;
  width: 80%;
  max-width: 400px;
  transition: all 0.8s ease; /* opacity까지 부드럽게 */
}

.start-button:hover {
  transform: scale(1.05);
}
</style>
