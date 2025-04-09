<template>
  <div class="quiz-intro" @click="nextDialog">
    <!-- 말풍선에 트랜지션 클래스 -->
    <QuizProfessorTalk
      :text="currentText"
      :isLast="isLast"
      :dialogIndex="currentIndex"
      class="fade-in delay-2"
    />

    <!-- 마지막 대사일 때만 프롬프트 등장 -->
    <QuizStartPrompt v-if="isLast" @confirm="goToQuiz" @cancel="goBack" />

    <!-- 오박사 이미지에도 트랜지션 클래스 -->
    <img
      src="@/assets/images/dr-oh.png"
      alt="오박사"
      class="professor fade-in delay-1"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import QuizProfessorTalk from '@/components/quiz/QuizProfessorTalk.vue';
import QuizStartPrompt from '@/components/quiz/QuizStartPrompt.vue';

const router = useRouter();

const dialogList = [
  `안녕, 나는 너의 경제 지식을 채워줄 <strong>오박사</strong>라고 하네.`,
  `그럼, 지금부터 퀴즈를 내겠다.<br/>이걸 맞힌다면 포켓몬을 뽑을 수 있는 <span class="highlight">마일리지</span>를 주지!`,
  `아! 물론 틀려도 마일리지를 줄테니 너무 걱정 하지 말라구!`,
  `자, 준비됐으면 퀴즈를 시작해보자!`,
];

const currentIndex = ref(0);
const currentText = ref(dialogList[currentIndex.value]);

const isLast = computed(() => currentIndex.value === dialogList.length - 1);

const nextDialog = () => {
  if (!isLast.value) {
    currentIndex.value++;
    currentText.value = dialogList[currentIndex.value];
  }
};

const goToQuiz = () => {
  router.push('/quiz/question');
};

const goBack = () => {
  router.push('/quiz');
};
</script>

<style scoped>
.quiz-intro {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 1rem;
  overflow: hidden;
  cursor: pointer; /* 클릭 가능한 느낌 주기 */
}

/* 배경 몬스터볼 */
.quiz-intro::before {
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

/* 오박사 */
.professor {
  position: absolute;
  bottom: 0rem;
  right: -3rem;
  width: 300px;
  z-index: 1;
}

/* 트랜지션 공통 */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease-out forwards;
}

.fade-in.delay-1 {
  animation-delay: 0.4s;
}

.fade-in.delay-2 {
  animation-delay: 0.8s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
