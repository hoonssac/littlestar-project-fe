<template>
  <div class="statistics-container">
    <div class="card-container">
      <div class="card">
        <div class="card-body">
          <p>이름: {{}}</p>
          <p>이번 달 수입: {{ totalIncome.toLocaleString() }}원</p>
          <p>이번 달 지출: {{ totalExpense.toLocaleString() }}원</p>
          <hr />
          <p>
            이번 달 합계: {{ (totalIncome - totalExpense).toLocaleString() }}원
          </p>
        </div>
      </div>
      <img :src="jiwoo" alt="지우" />
    </div>
  </div>
</template>

<script setup>
import jiwoo from '@/assets/images/jiwoo.png';
import { useMoneyTrackerStore } from '@/stores/moneyTrackerStore';
import { computed, onMounted } from 'vue';

const store = useMoneyTrackerStore();

const today = new Date();

onMounted(() => {
  store.fetchTransactions();
});

function isCurrentMonth(dateString) {
  const date = new Date(dateString);
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth()
  );
}

const currentMonthTransactions = computed(() => {
  return store.transactions.filter((t) => isCurrentMonth(t.date));
});

const totalIncome = computed(() => {
  return currentMonthTransactions.value
    .filter((t) => t.is_income)
    .reduce((sum, t) => (sum += Number(t.amount)), 0);
});

const totalExpense = computed(() => {
  return currentMonthTransactions.value
    .filter((t) => !t.is_income)
    .reduce((sum, t) => (sum += Number(t.amount)), 0);
});
</script>

<style scoped>
.statistics-container {
  position: relative;
  height: 100%;
}
.card-container {
  position: absolute;
  width: 100%;
  bottom: 30px;
}
.card {
  border-radius: 25px;
  width: 70%;
  margin: 2rem auto;
  border-style: solid;
  border-color: #4a483f;

  border-top-width: 1px;
  border-right-width: 7px;
  border-bottom-width: 7px;
  border-left-width: 1px;
}
p {
  margin: 0;
  font-size: 20px;
}
hr {
  margin: 0.3rem;
}

img {
  position: absolute;
  left: 65%;
  /* transform: translateX(-50%); */
  z-index: 10;
  width: 144px;
  top: 0;
}

/* 모바일 세로 (해상도 ~ 479px)*/
@media all and (max-width: 479px) {
  img {
    display: none;
  }
}
</style>
