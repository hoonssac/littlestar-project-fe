<template>
  <div class="statistics-container">
    <div class="chart-button-container">
      <PieChart
        v-if="activeTab === 'income'"
        :labels="incomeLabels"
        :data="incomeValues"
      />
      <PieChart
        v-if="activeTab === 'expense'"
        :labels="expenseLabels"
        :data="expenseValues"
      />

      <div class="button-group">
        <button
          class="income-tab"
          :class="{ active: activeTab === 'income' }"
          @click="setTab('income')"
        >
          수입
        </button>
        <button
          class="outcome-tab"
          :class="{ active: activeTab === 'expense' }"
          @click="setTab('expense')"
        >
          지출
        </button>
      </div>
    </div>

    <div class="card-container">
      <div class="card">
        <div class="card-body">
          <p>이름: {{ username }}</p>
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
import PieChart from '@/components/statistics/PieChart.vue';
import { useAuthStore } from '@/stores/authStore';
import { useMoneyTrackerStore } from '@/stores/moneyTrackerStore';
import { computed, ref, watch } from 'vue';

const moneyTrackerStore = useMoneyTrackerStore();
const authStore = useAuthStore();

const userId = computed(() => authStore.user?.id);
const username = authStore.user.username;
const today = new Date();
const activeTab = ref('income');

const setTab = (tab) => {
  activeTab.value = tab;
};

watch(
  () => authStore.user,
  async (user) => {
    if (user) {
      await moneyTrackerStore.fetchCategories();
      await moneyTrackerStore.fetchTransactions();
    }
  },
  { immediate: true }
);

function isCurrentMonth(dateString) {
  const date = new Date(dateString);
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth()
  );
}

const currentMonthTransactions = computed(() => {
  const transactions = moneyTrackerStore.transactions;
  if (!Array.isArray(transactions)) return [];

  const filtered = transactions.filter(
    (tx) => tx.user_id === userId.value && isCurrentMonth(tx.date)
  );

  return filtered;
});

const totalIncome = computed(() => {
  const total = currentMonthTransactions.value
    .filter((t) => t.is_income)
    .reduce((sum, t) => (sum += Number(t.amount)), 0);

  return total;
});

const totalExpense = computed(() => {
  const total = currentMonthTransactions.value
    .filter((t) => !t.is_income)
    .reduce((sum, t) => (sum += Number(t.amount)), 0);
  return total;
});

function groupByCategory(transactions, isIncome) {
  const categoryMap = {};

  if (!moneyTrackerStore.categories.length) return [];

  transactions
    .filter((tx) => tx.is_income === isIncome)
    .forEach((tx) => {
      const amount = Number(tx.amount);
      const catId = tx.category_id;

      if (!categoryMap[catId]) {
        categoryMap[catId] = 0;
      }
      categoryMap[catId] += amount;
    });

  // 카테고리 이름 매핑
  const result = Object.entries(categoryMap).map(([catId, total]) => {
    const category = moneyTrackerStore.categories.find(
      (c) => String(c.id) === String(catId)
    );
    return {
      name: category ? category.name : 'Unknown',
      value: total,
    };
  });

  return result;
}

function withPercentage(categoryData) {
  const total = categoryData.reduce((sum, c) => sum + c.value, 0);

  return categoryData.map((c) => ({
    label: c.name,
    value: c.value,
    percentage: Math.round((c.value / total) * 100),
  }));
}

const incomeSummary = computed(() => {
  return withPercentage(groupByCategory(currentMonthTransactions.value, true));
});
const expenseSummary = computed(() => {
  return withPercentage(groupByCategory(currentMonthTransactions.value, false));
});

const incomeLabels = computed(() => incomeSummary.value.map((i) => i.label));
const incomeValues = computed(() => incomeSummary.value.map((i) => i.value));

const expenseLabels = computed(() => expenseSummary.value.map((e) => e.label));
const expenseValues = computed(() => expenseSummary.value.map((e) => e.value));
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

.chart-button-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  justify-content: center;
}

.button-group {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 250px;
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
.income-tab.active,
.outcome-tab.active {
  background-color: #fed337;
}

/* 모바일 세로 (해상도 ~ 479px)*/
@media all and (max-width: 479px) {
  img {
    display: none;
  }
}
</style>
