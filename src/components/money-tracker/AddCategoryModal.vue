<template>
  <div>
    <div class="modal-overlay">
      <div class="modal-container">
        <h3>지출 카테고리 만들기</h3>
        <p>새롭게 만들고 싶은</p>
        <p>카테고리 이름을 입력하세요</p>
        <input
          type="text"
          v-model="categoryName"
          placeholder="카테고리 이름 입력"
          class="form-control"
        />

        <div class="modal-actions">
          <button class="modal-button" @click="store.closeAddCategoryModal">
            취소
          </button>

          <button class="modal-button add-button" @click="addCateogry">
            저장
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useMoneyTrackerStore } from '@/stores/moneyTrackerStore';

const props = defineProps({
  isIncome: Boolean,
});

const store = useMoneyTrackerStore();
const categoryName = ref('');

const addCateogry = () => {
  if (categoryName.value.trim() !== '') {
    store.addCategory(categoryName.value.trim(), props.isIncome);
    store.closeAddCategoryModal();
    categoryName.value = '';
  }
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* 어두운 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소보다 위에 올라오게 */
}

.modal-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  height: 322px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.modal-button {
  width: 137px;
  height: 58px;
  border-radius: 13px;
  font-size: 24px;

  border-style: solid;
  border-color: #4a483f;

  border-top-width: 0px;
  border-right-width: 3px;
  border-bottom-width: 3px;
  border-left-width: 0px;
}
.modal-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
}
.add-button {
  background-color: #fed337;
}
p {
  margin: 0;
}
input {
  margin: 2rem auto;
  height: 3rem;
  font-size: 20px;
}
</style>
