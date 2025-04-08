<template>
  <div class="quiz-question">
    <!-- 퀴즈 타이틀 -->
    <h2 class="quiz-title">퀴즈</h2>

    <!-- 말풍선 -->
    <QuizProfessorTalk
      v-if="questionText"
      :text="questionText"
      :isLast="false"
      :dialogIndex="0"
      :showNextHint="false"
    />

    <!-- 오박사 -->
    <img src="@/assets/images/dr-oh.png" class="professor" alt="오박사" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import QuizProfessorTalk from '@/components/quiz/QuizProfessorTalk.vue';

const questionText = ref('');
const pickedQuestion = ref(null);

onMounted(async () => {
  const res = await axios.get('http://localhost:3001/questions');
  const questions = res.data;
  const randomIndex = Math.floor(Math.random() * questions.length);
  pickedQuestion.value = questions[randomIndex];
  console.log(pickedQuestion.value);

  questionText.value = pickedQuestion.value.question;
});

const skipTyping = () => {
  // 선택적으로 말풍선 타이핑 스킵 구현 가능
};
</script>

<style scoped>
.quiz-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  z-index: 2;
  margin: 0;
}

.quiz-question {
  position: relative;
  min-height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 1rem;
  overflow: hidden;
}

.quiz-question::before {
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

.professor {
  position: absolute;
  bottom: 0;
  right: -3rem;
  width: 300px;
  z-index: 1;
}
</style>
