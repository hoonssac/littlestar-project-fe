<template>
  <div class="m-container">
    <div class="card">
      <div class="card-body">
        <p>이름: {{ authStore.user.username }}</p>
        <p>이번 달 수입: {{ totalIncome.toLocaleString() }}원</p>
        <p>이번 달 지출: {{ totalExpense.toLocaleString() }}원</p>
        <hr />
        <p>
          이번 달 합계: {{ (totalIncome - totalExpense).toLocaleString() }}원
        </p>
      </div>
    </div>
    <img :src="jiwoo" alt="지우" />

    <div class="button-group">
      <router-link
        :to="{ name: 'money-tracker-income' }"
        exact-active-class="active-tab"
        ><button class="income-tab">수입</button></router-link
      >
      <router-link
        :to="{ name: 'money-tracker-expense' }"
        exact-active-class="active-tab"
        ><button class="outcome-tab">지출</button></router-link
      >
    </div>

    <router-view></router-view>
  </div>
</template>
<script setup>
import jiwoo from '@/assets/images/jiwoo.png';
import { computed, onMounted } from 'vue';
import { useMoneyTrackerStore } from '@/stores/moneyTrackerStore';
import { useAuthStore } from '@/stores/authStore';

const store = useMoneyTrackerStore();
const authStore = useAuthStore();

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
.m-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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
.button-group {
  display: flex;
  gap: 20px;
}
p {
  margin: 0;
  font-size: 20px;
}
hr {
  margin: 0.3rem;
  border: 1px dashed;
}

.income-tab {
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
.outcome-tab {
  border-radius: 13px;
  width: 137px;
  height: 58px;
  font-size: 24px;

  border-style: solid;
  border-color: #4a483f;

  border-top-width: 0px;
  border-right-width: 3px;
  border-bottom-width: 3px;
  border-left-width: 0px;
}
img {
  position: absolute;
  left: 65%;
  /* transform: translateX(-50%); */
  z-index: 10;
  width: 30%;
}

.active-tab button {
  background-color: #fed337;
}
</style>
