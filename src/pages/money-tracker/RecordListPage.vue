<template>
  <div class="container">
    <div v-if="filteredTransactions.length === 0">거래 내역이 없습니다.</div>
    <div
      v-else
      class="card"
      v-for="transaction in filteredTransactions"
      :key="transaction.id"
    >
      <div class="card-body">
        <p>{{ transaction.data }}</p>
        <p>{{ transaction.amount }}</p>
        <p>{{ transaction.memo }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { onMounted, computed } from 'vue';
import { useMoneyTrackerStore } from '@/stores/moneyTrackerStore';

const store = useMoneyTrackerStore();
const currentRoute = useRoute();

const categoryId = currentRoute.params.categoryId;
onMounted(() => {
  store.fetchTransactions();
});

const filteredTransactions = computed(() => {
  return store.getTransactionsByCategoryId(categoryId);
});
</script>
<style scoped></style>
