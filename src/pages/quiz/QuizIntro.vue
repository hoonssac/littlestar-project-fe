<template>
  <div class="quiz-intro" @click="nextDialog">
    <QuizProfessorTalk :text="currentText" />
    <img src="@/assets/prof_O.png" alt="오박사" class="professor" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import QuizProfessorTalk from '@/components/quiz/QuizProfessorTalk.vue';

const router = useRouter();

const dialogList = [
  `안녕, 나는 너의 경제 지식을 채워줄 <strong>오박사</strong>라고 하네.`,
  `그럼, 지금부터 퀴즈를 내겠다.<br/>이걸 맞힌다면 포켓몬을 뽑을 수 있는 <span class="highlight">마일리지</span>를 주지!`,
  `아! 물론 틀려도 마일리지를 줄테니 너무 걱정 하지 말라구!`,
  `자, 준비됐으면 퀴즈를 시작해보자!`,
];

const currentIndex = ref(0);
const currentText = ref(dialogList[currentIndex.value]);

const nextDialog = () => {
  if (currentIndex.value < dialogList.length - 1) {
    currentIndex.value++;
    currentText.value = dialogList[currentIndex.value];
  } else {
    router.push('/quiz/question'); // 퀴즈 문제 화면으로 이동
  }
};
</script>

<style scoped>
.quiz-intro {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 3rem;
  overflow: hidden;
  cursor: pointer; /* 클릭 가능한 느낌 주기 */
}

/* 배경 몬스터볼 */
.quiz-intro::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  background-image: url('@/assets/monsterball.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: translate(-50%, -50%);
  opacity: 0.15;
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
</style>
