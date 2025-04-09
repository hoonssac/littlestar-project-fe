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
    <transition name="fade-up" appear>
      <div class="quiz-desc" style="transition-delay: 0.6s">
        <p class="quiz-desc-1">
          정답을 맞히면 포켓몬을 뽑을 수 있는<br />마일리지를 받을 수 있어요!
        </p>
        <p class="quiz-desc-2">퀴즈는 하루에 한 번만 도전 가능해요!</p>
      </div>
    </transition>

    <!-- 이미지 -->
    <transition name="fade-up" appear>
      <img
        src="@/assets/images/dice.png"
        alt="물음표 박스"
        class="question-box"
        style="transition-delay: 1s"
      />
    </transition>

    <!-- START 버튼 -->
    <transition name="fade-up">
      <button
        class="start-button"
        :class="{ faded: !showButton }"
        @click="goToQuiz"
      >
        START
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const showButton = ref(false);

const goToQuiz = () => {
  router.push('/quiz/intro');
};

onMounted(() => {
  setTimeout(() => (showButton.value = true), 1400); // 딜레이 등장
});
</script>

<style scoped>
.quiz-intro {
  height: 100%;
  background-color: #f8f9fa;
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
}
.question-box {
  width: 300px;
  padding-bottom: 15px;
}
.start-button {
  background-color: #fed337;
  color: #333;
  font-size: 48px;
  border: none;
  border-radius: 13px;
  padding: 0.1rem 2rem;
  box-shadow: 4px 4px 0px rgba(74, 72, 63, 0.1);
  transition: transform 0.2s;
  width: 80%;
  max-width: 400px;
  transition: all 0.8s ease; /* opacity까지 부드럽게 */
}

.start-button:hover {
  transform: scale(1.05);
}
</style>
