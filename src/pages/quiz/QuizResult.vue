<template>
  <div class="quiz-result">
    <!-- 정답이면 마일리지 아이콘, 오답이면 소블 이미지 -->
    <div class="result-image">
      <IconMileage v-if="isCorrect" size="100" color="#FAB809" />
      <img
        v-else
        src="@/assets/images/sobble.png"
        class="sobble"
        alt="울머기"
      />
    </div>

    <!-- 정답이면 마일리지 숫자 출력 -->
    <div v-if="isCorrect" class="mileage">{{ mileage }}</div>

    <p class="result-text">
      {{ isCorrect ? '정답이에요!' : '아쉬워요!' }}
    </p>
    <p class="sub-text">
      {{
        isCorrect
          ? `${mileage} 마일리지 획득!`
          : '해설을 보고 마일리지 받아가요!'
      }}
    </p>

    <button class="explanation-button" @click="showExplanation = true">
      해설 보기
    </button>

    <div v-if="showExplanation" class="explanation-box">
      {{ explanation }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import IconMileage from '@/components/common/icons/IconMileage.vue'; // 아이콘 경로
import { useQuizResultStore } from '@/stores/quizResult';

const quizResult = useQuizResultStore();
const route = useRoute();
const isCorrect = quizResult.isCorrect;
const mileage = quizResult.mileage;
const explanation = quizResult.explanation;

const showExplanation = ref(false);
</script>

<style scoped>
.quiz-result {
  text-align: center;
  padding: 2rem;
}

.mileage {
  font-size: 2rem;
  font-weight: bold;
  color: #fab809;
  margin-top: 0.5rem;
}

.result-text {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 2rem;
}

.sub-text {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 2rem;
}

.explanation-button {
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  background-color: #ddd;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
}

.explanation-box {
  margin-top: 1.5rem;
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1rem;
  line-height: 1.4;
}

.result-image {
  margin-bottom: 1rem;
}

.sobble {
  width: 100px;
  height: auto;
}
</style>
