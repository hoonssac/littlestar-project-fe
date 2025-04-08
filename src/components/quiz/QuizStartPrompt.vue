<template>
  <div class="start-prompt">
    <div class="prompt-box">
      <div class="button-group">
        <button @click="$emit('confirm')">{{ confirmText }}</button>
        <button @click="$emit('cancel')">{{ cancelText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const fullConfirm = '► 네 알겠습니다!';
const fullCancel = '► 다음에 올게요!';

const confirmText = ref('');
const cancelText = ref('');

onMounted(() => {
  typeText(fullConfirm, confirmText, 30);
  typeText(fullCancel, cancelText, 30, 300); // 살짝 늦게 시작해도 OK
});

function typeText(full, targetRef, speed = 30, delay = 0) {
  let index = 0;
  setTimeout(() => {
    const timer = setInterval(() => {
      if (index < full.length) {
        targetRef.value += full[index];
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }, delay);
}
</script>

<style scoped>
.start-prompt {
  position: fixed;
  bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
}

.prompt-box {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 3 / 1; /* 이미지 비율 유지 */
  background: url('@/assets/images/prompt2.png') no-repeat center center;
  background-size: 100% 100%; /* 이미지가 박스에 딱 맞도록 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden; /* 버튼이 삐져나가지 않도록 */
}

.button-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 300px;
}

button {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  cursor: pointer;
  transition: transform 0.2s;
  width: 100%;
  text-align: left;
  padding: 0.3rem 0;
}

button:hover {
  transform: scale(1.03);
}
</style>
