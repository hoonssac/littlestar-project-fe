<template>
  <div class="container">
    <div class="list-group">
      <div class="list-group-item" v-if="store.incomeCategories.length === 0">
        아직 카테고리가 없습니다.
      </div>
      <div
        class="list-group-item"
        :style="{
          backgroundColor: colors[index % colors.length],
          height: getHeight(category.id) * 0.3 + 'vh',
        }"
        v-for="(category, index) in store.incomeCategories"
        :key="index"
        @click="
          router.push({
            name: 'money-tracker-income-category',
            params: { categoryId: category.id },
          })
        "
      >
        <p
          :style="{
            fontSize: getHeight(category.id) * 0.1 + 'vh',
          }"
        >
          {{ category.name }}
        </p>
        <p
          :style="{
            fontSize: getHeight(category.id) * 0.1 + 'vh',
          }"
        >
          {{
            getHeightPercentage(category.id) === 0
              ? '0%'
              : getHeightPercentage(category.id).toFixed(1) + '%'
          }}
        </p>
      </div>
    </div>

    <button @click="store.openAddCategoryModal">카테고리 추가</button>

    <AddCategoryModal v-if="store.isAddCategoryModalOpen" :isIncome="true" />
  </div>
</template>
<script setup>
import axios from 'axios';
import AddCategoryModal from '@/components/money-tracker/AddCategoryModal.vue';
import { useMoneyTrackerStore } from '@/stores/moneyTrackerStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const store = useMoneyTrackerStore();
const router = useRouter();

const colors = ['#1C2B59', '#3365A6', '#F2B807', '#BF920A'];

onMounted(() => {
  store.fetchCategories();
});

const getHeightPercentage = (categoryId) => {
  const sum = store.incomeCategorySums[categoryId] || 0;
  const total = store.totalIncome;
  console.log('categoryid:' + categoryId + ' sum:' + sum + ' total:' + total);

  if (sum === 0 || total === 0) {
    return 0;
  }
  return (sum / total) * 100;
};

const getHeight = (categoryId) => {
  const percent = getHeightPercentage(categoryId);
  return percent === 0 ? 15 : percent;
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  width: 187px;
  height: 58px;
  font-size: 24px;
  background-color: white;
  border-radius: 13px;

  border-style: solid;
  border-color: #4a483f;

  border-top-width: 0px;
  border-right-width: 3px;
  border-bottom-width: 3px;
  border-left-width: 0px;
}

.list-group {
  width: 100%;
  margin: 3rem auto;
  border-radius: 0;
}
.list-group-item {
  border: none;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
