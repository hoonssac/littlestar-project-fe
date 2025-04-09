<template>
  <div class="quiz-result">
    <!-- 상단 이미지 및 텍스트 영역 -->
    <div class="content-wrapper">
      <div class="result-wrapper">
        <div class="result-image">
          <IconMileage v-if="isCorrect" size="120" color="#FAB809" />
          <img
            v-else
            src="@/assets/images/sobble.png"
            class="sobble"
            alt="울머기"
          />
        </div>

        <div v-if="isCorrect" class="mileage">{{ mileage }}</div>
        <p class="result-text">{{ isCorrect ? '정답이에요!' : '틀렸어요!' }}</p>
        <p class="sub-text">
          {{
            isCorrect
              ? `${mileage} 마일리지 획득!`
              : '해설을 보면 마일리지를 드릴게요'
          }}
        </p>

        <!-- 해설 텍스트 -->
        <div v-if="showExplanation" class="explanation-box">
          {{ explanation }}
        </div>
      </div>
    </div>

    <!-- 하단 버튼 -->
    <div class="footer-button">
      <CustomButton
        :category="buttonCategory"
        size="medium"
        style="width: 80%; max-width: 400px"
        @click="handleButtonClick"
      >
        {{ buttonText }}
      </CustomButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconMileage from '@/components/common/icons/IconMileage.vue'; // 아이콘 경로
import { useQuizResultStore } from '@/stores/quizResult';
import CustomButton from '@/components/common/CustomButton.vue';

const quizResult = useQuizResultStore();
const route = useRoute();
const router = useRouter();
const isCorrect = quizResult.isCorrect;
const mileage = quizResult.mileage;
const explanation = quizResult.explanation;

const showExplanation = ref(false);

const buttonText = computed(() => {
  if (isCorrect) return '포켓몬 뽑으러 가기';
  if (!showExplanation.value) return '해설 보기';
  return '마일리지 받기'; // 오답 + 해설 본 경우
});

const buttonCategory = computed(() => {
  if (isCorrect || showExplanation.value) return 'primary';
  return 'secondary';
});

function handleButtonClick() {
  if (isCorrect) {
    router.push('/pokedex');
  } else if (!showExplanation.value) {
    showExplanation.value = true;
  } else {
    router.push('/quiz/reward'); // 👉 새 화면으로 이동
  }
}
</script>

<style scoped>
.quiz-result {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 상단 + 하단 분리 */
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
  font-weight: bold;
  color: #fab809;
}

.result-text {
  font-size: 35px;
  font-weight: bold;
  margin-top: 2rem;
}

.sub-text {
  font-size: 20px;
  color: #555;
  margin-bottom: 4rem;
}

.explanation-box {
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 10px;
  font-size: 20px;
  line-height: 1.5;
  white-space: pre-line;
  margin: 0 auto;
  width: 80%;
  max-width: 500px;
}

.footer-button {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}

.explanation-button {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background-color: #fed337;
  border: none;
  border-radius: 13px;
  font-family: 'Press Start 2P', cursive;
  box-shadow: 4px 4px 0px #000000;
  cursor: pointer;
  transition: transform 0.2s;
}

.explanation-button:hover {
  transform: scale(1.03);
}

.sobble {
  width: 180px;
  height: auto;
}
</style>
