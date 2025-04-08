<template>
  <div class="speech-bubble">
    <p class="dialog-text" v-html="text"></p>
    <div class="next-hint">아무곳이나 누르면 다음으로 이동합니다</div>
  </div>
</template>

<script setup>
defineProps({
  text: String,
});
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
