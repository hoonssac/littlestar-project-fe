<template>
  <div class="quiz-result">
    <div class="content-wrapper">
      <div class="result-wrapper">
        <div class="result-image">
          <IconMileage size="120" color="#FAB809" />
        </div>

        <div class="mileage">500</div>

        <p class="result-text">그래도 잘했어요!</p>
        <p class="sub-text">500마일리지 획득</p>
      </div>
    </div>

    <div class="footer-button">
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
import IconMileage from '@/components/common/icons/IconMileage.vue'; // 아이콘 경로
import { useQuizResultStore } from '@/stores/quizResult';
import CustomButton from '@/components/common/CustomButton.vue';

const quizResult = useQuizResultStore();
const route = useRoute();
const router = useRouter();
const isCorrect = quizResult.isCorrect;
const mileage = quizResult.mileage;
const explanation = quizResult.explanation;

onMounted(() => {
  // mileage.add(500); // 오답 보상 지급
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

.footer-button {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}
</style>
