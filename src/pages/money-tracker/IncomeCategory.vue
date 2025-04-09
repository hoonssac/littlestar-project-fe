<template>
  <div class="container">
    <div class="list-group">
      <div class="list-group-item" v-if="store.incomeCategories.length === 0">
        아직 카테고리가 없습니다.
      </div>
      <div
        class="list-group-item"
        v-for="category in store.incomeCategories"
        :key="category.id"
        @click="
          router.push({
            name: 'money-tracker-income-category',
            params: { categoryId: category.id },
          })
        "
      >
        {{ category.name }}
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
onMounted(() => {
  store.fetchCategories();
});
</script>
<style scoped>
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
}
</style>
