<template>
  <div class="speech-bubble">
    <p class="dialog-text" v-html="displayedText"></p>
    <div class="next-hint" v-if="!isLast && isTypingFinished && showNextHint">
      아무곳이나 누르면 다음으로 이동합니다
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  text: String,
  isLast: Boolean,
  dialogIndex: Number,
  showNextHint: {
    type: Boolean,
    default: true, // 기본값은 true (기존 인트로 흐름 유지)
  },
});

const displayedText = ref('');
const typingIndex = ref(0);
let typingTimer = null;
const isTypingFinished = ref(false); // ✅ 추가

watch(
  () => props.text,
  (newText) => {
    clearInterval(typingTimer);
    displayedText.value = '';
    typingIndex.value = 0;
    isTypingFinished.value = false;

    const delay = props.dialogIndex === 0 ? 800 : 0;

    setTimeout(() => {
      typeText(newText);
    }, delay);
  },
  { immediate: true }
);

function typeText(fullText) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = fullText;
  const plainText = tempDiv.textContent || tempDiv.innerText || '';

  typingTimer = setInterval(() => {
    if (typingIndex.value < plainText.length) {
      displayedText.value = plainText.slice(0, typingIndex.value + 1);
      typingIndex.value++;
    } else {
      displayedText.value = fullText; // HTML 복원
      clearInterval(typingTimer);
      isTypingFinished.value = true; // ✅ 타이핑 완료 후 표시
    }
  }, 30);
}
</script>

<style scoped>
.speech-bubble {
  position: relative;
  z-index: 2;
  background-color: white;
  border: 2px solid #444;
  border-radius: 15px;
  box-shadow: 4px 4px 0 #444;
  padding: 1rem;
  margin-top: 1rem;
  max-width: 90%;
  font-size: 22px;
  line-height: 1.6;
}

.dialog-text {
  text-align: justify; /* ✅ 양쪽 정렬 */
}

.highlight {
  color: #f4b400;
  font-weight: bold;
}

.next-hint {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #aaa;
  text-align: right;
}
</style>
