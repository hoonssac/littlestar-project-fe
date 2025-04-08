import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useMoneyTrackerStore = defineStore('moneyTracker', () => {
  const categories = ref([]);
  const incomeCategories = ref([]);
  const expenseCategories = ref([]);

  const transactions = ref([]);
  const isAddCategoryModalOpen = ref(false);

  //   1. 전체 카테고리 가져오기
  const fetchCategories = async () => {
    try {
      const url = 'http://localhost:3000/categories';
      const response = await axios.get(url);
      categories.value = response.data;
      // 수입/지출 카테고리 분리
      incomeCategories.value = categories.value.filter((c) => c.is_income);
      expenseCategories.value = categories.value.filter((c) => !c.is_income);
    } catch (error) {
      console.error('카테고리 불러오기 오류: error', error);
    }
  };

  //   2. 거래 내역 전체 가져오기
  const fetchTransactions = async () => {
    try {
      const url = 'http://localhost:3000/transactions';
      const response = await axios.get(url);
      transactions.value = response.data;
    } catch (error) {
      console.error('트랜잭션 불러오기 오류: ', error);
    }
  };

  //   3. 카테고리 추가(수입/지출 구분)
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

  const getTransactionsByCategoryId = (categoryId) => {
    if (!categoryId) return [];
    return transactions.value.filter((t) => t.category_id === categoryId);
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
    transactions,
    isAddCategoryModalOpen,

    fetchCategories,
    fetchTransactions,
    addCategory,
    openAddCategoryModal,
    closeAddCategoryModal,
    getTransactionsByCategoryId,
  };
});
