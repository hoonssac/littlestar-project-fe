import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useMoneyTrackerStore = defineStore('moneyTracker', () => {
  const categories = ref([]);
  const incomeCategories = ref([]);
  const expenseCategories = ref([]);

  const isAddCategoryModalOpen = ref(false);

  const url = 'http://localhost:3001/categories';

  const fetchCategories = async () => {
    try {
      let response = await axios.get(url);
      categories.value = response.data;

      incomeCategories.value = categories.value.filter((c) => c.is_income);
      expenseCategories.value = categories.value.filter((c) => !c.is_income);
    } catch (error) {
      console.error('카테고리 불러오기 오류: error', error);
    }
  };

  const addCategory = async (categoryName, isIncome) => {
    try {
      const data = {
        name: categoryName,
        transaction_ids: [],
        is_income: isIncome,
      };
      const response = await axios.post(url, data);
      categories.value.push(response.data);

      if (isIncome) {
        incomeCategories.value.push(response.data);
      } else {
        expenseCategories.value.push(response.data);
      }
    } catch (error) {
      console.error('카테고리 추가 실패', error);
    }
  };

  const openAddCategoryModal = () => {
    isAddCategoryModalOpen.value = true;
  };
  const closeAddCategoryModal = () => {
    isAddCategoryModalOpen.value = false;
  };

  return {
    categories,
    incomeCategories,
    expenseCategories,
    isAddCategoryModalOpen,
    fetchCategories,
    addCategory,
    openAddCategoryModal,
    closeAddCategoryModal,
  };
});
