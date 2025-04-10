<template>
  <div class="start-prompt">
    <div class="prompt-box">
      <div class="button-group">
        <button
          v-for="(option, index) in optionTexts"
          :key="index"
          @click="handleClick(index)"
        >
          {{ option }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import SelectSound from '@/assets/sounds/ButtonSound.mp3';

const emit = defineEmits(['select']);

function handleClick(index) {
  playClickSound();
  emit('select', index);
}

const props = defineProps({
  options: Array, // ["보기1", "보기2", ...]
});

const optionTexts = ref([]); // ["", "", "", ""] ← 타이핑용

onMounted(() => {
  optionTexts.value = props.options.map(() => '');
  props.options.forEach((full, idx) => {
    typeText('► ' + full, idx, 30, idx * 200); // 각 보기마다 딜레이 조금씩
  });
});

function typeText(full, index, speed = 30, delay = 0) {
  let i = 0;
  setTimeout(() => {
    const timer = setInterval(() => {
      if (i < full.length) {
        optionTexts.value[index] += full[i];
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }, delay);
}

function playClickSound() {
  const audio = new Audio(SelectSound);
  audio.volume = 1.0; // 🎵 소리 크기 최대로
  audio.play().catch((err) => {
    console.warn('효과음 재생 실패:', err);
  });
}
</script>

<style scoped>
.start-prompt {
  position: fixed;
  bottom: 7rem;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
}

.prompt-box {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 3 / 1;
  background: url('@/assets/images/prompt2.png') no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
}

.button-group {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2열로 나누기 */
  gap: 0rem 1rem; /* 위아래 간격 0.5rem, 좌우 간격 1rem */
  width: 100%;
  max-width: 300px;
}

button {
  background: none;
  border: none;
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
