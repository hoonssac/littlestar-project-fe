<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <transition name="modal-scale">
      <div class="modal-content">
        <p class="modal-text">리틀스타 사용 방법</p>
        <div class="help-image-container">
          <img src="@/assets/images/help.png" alt="" class="help-image" />
        </div>
        <CustomButton
          :category="'primary'"
          size="medium"
          style="margin-top: 1rem"
          @click="$emit('close')"
        >
          닫기
        </CustomButton>
      </div>
    </transition>
  </div>
</template>

<script setup>
import CustomButton from '@/components/common/CustomButton.vue';

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 80%;
  max-width: 500px;
  text-align: center;
}

.modal-text {
  font-size: 2rem;
}

.modal-scale-enter-active {
  transition: all 0.3s ease;
}
.modal-scale-enter-from {
  transform: scale(0.8);
  opacity: 0;
}
.modal-scale-enter-to {
  transform: scale(1);
  opacity: 1;
}

.help-image {
  width: 100%;
}
</style>
