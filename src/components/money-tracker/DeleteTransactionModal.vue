<template>
  <div>
    <div class="modal-overlay">
      <div class="modal-container">
        정말 삭제하시겠습니까?

        <div class="modal-actions">
          <CustomButton
            category="secondary"
            size="small"
            @click="store.closeDeleteTransactionModal"
            >취소</CustomButton
          >
          <CustomButton
            category="danger"
            size="small"
            @click="deleteTransaction"
            >삭제</CustomButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import CustomButton from '../common/CustomButton.vue';
import { useMoneyTrackerStore } from '@/stores/moneyTrackerStore';

const store = useMoneyTrackerStore();

const props = defineProps({
  transactionId: {
    type: [String, Number],
    required: true,
  },
});

const deleteTransaction = async () => {
  console.log(props.transactionId);
  await store.deleteTransaction(props.transactionId);
  await store.fetchTransactions();
  store.closeDeleteTransactionModal();
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
  gap: 15px;
  background-color: white;
  max-width: 450px;
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  margin: 0 20px;
  text-align: center;
}

.modal-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
}
</style>
