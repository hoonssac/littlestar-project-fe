<template>
  <div class="modal-overlay">
    <transition name="scale-fade">
      <div class="modal-content" v-if="show">
        <p class="today-text">오늘은 이미 퀴즈를 풀었어요!</p>
        <p class="next-text">내일 다시 도전해볼까요?</p>
        <CustomButton
          :category="buttonCategory"
          size="medium"
          style="width: 100%; max-width: 400px; margin-top: 3rem"
          @click="$emit('close')"
        >
          닫기
        </CustomButton>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CustomButton from '../common/CustomButton.vue';
const show = ref(true); // 트랜지션 동작용
const buttonCategory = 'primary'; // Define buttonCategory or replace with the appropriate value
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* 그냥 부드러운 배경 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background-color: #fff;
  padding: 1.5rem 1rem;
  border-radius: 20px;
  text-align: center;
  font-size: 1.1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 80%;
  max-width: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ✅ scale + fade 트랜지션 */
.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.scale-fade-enter-from,
.scale-fade-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
.scale-fade-enter-to,
.scale-fade-leave-from {
  transform: scale(1);
  opacity: 1;
}

.today-text {
  font-size: 25px;
  margin-top: 10px;
}
.next-text {
  font-size: 23px;
  margin-top: 10px;
}
</style>
