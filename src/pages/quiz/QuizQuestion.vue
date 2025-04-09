<template>
  <div class="quiz-question">
    <QuizProfessorTalk
      v-if="questionText"
      :text="questionText"
      :isLast="false"
      :dialogIndex="0"
      :showNextHint="false"
      @typingEnd="onTypingEnd"
    />

    <!-- 보기 프롬프트는 typing 끝나고 나서만 표시 -->
    <Transition name="fade-up">
      <QuizOptionPrompt
        v-if="showOptions"
        :options="pickedQuestion?.options"
        @select="handleSelect"
      />
    </Transition>

    <img src="@/assets/images/dr-oh.png" class="professor" alt="오박사" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import QuizProfessorTalk from '@/components/quiz/QuizProfessorTalk.vue';
import QuizOptionPrompt from '@/components/quiz/QuizOptionPrompt.vue';
import { useQuizResultStore } from '@/stores/quizResult';

const quizResult = useQuizResultStore();
const questionText = ref('');
const pickedQuestion = ref(null);
const showOptions = ref(false);
const router = useRouter();

onMounted(async () => {
  const res = await axios.get('/api/questions');
  const questions = res.data;
  const randomIndex = Math.floor(Math.random() * questions.length);
  pickedQuestion.value = questions[randomIndex];
  questionText.value = pickedQuestion.value.question;
});

const onTypingEnd = () => {
  showOptions.value = true;
};

function handleSelect(index) {
  const correct = pickedQuestion.value.answer_index;
  const isCorrect = index === correct;

  quizResult.setResult({
    isCorrect,
    mileage: isCorrect ? 1000 : 500,
    explanation: pickedQuestion.value.explanation,
  });

  router.push('/quiz/result');
}
</script>

<style scoped>
.quiz-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  z-index: 2;
  margin-top: 1rem;
  margin-bottom: 0;
}

.quiz-question {
  position: relative;
  height: 100%;
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
  width: 300px;
  height: 300px;
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

.fade-up-enter-active {
  animation: fadeUp 0.5s ease-out;
}
.fade-up-leave-active {
  display: none;
}
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
