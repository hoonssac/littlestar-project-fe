import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useMoneyTrackerStore = defineStore('moneyTracker', () => {
  const categories = ref([]);
  const incomeCategories = ref([]);
  const expenseCategories = ref([]);

  const transactions = ref([]);
  const isAddCategoryModalOpen = ref(false);
  const isDeleteTransactionModalOpen = ref(false);

  //   1. 전체 카테고리 가져오기
  const fetchCategories = async () => {
    try {
      const url = 'http://localhost:3001/categories';
      //   const url = 'http://localhost:3000/categories';
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
      //   const url = 'http://localhost:3000/transactions';
      const url = 'http://localhost:3001/transactions';
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
      //   const url = 'http://localhost:3000/categories';
      const url = 'http://localhost:3001/categories';
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

  //   4. 카테고리 아이디로 그 밑에 속한 트랜잭션들 가져오기
  const getTransactionsByCategoryId = (categoryId) => {
    if (!categoryId) return [];
    return transactions.value.filter(
      (t) => String(t.category_id) === String(categoryId)
    );
  };

  //   5. 트랜잭션 추가
  const addTransaction = async (
    userId,
    date,
    isIncome,
    amount,
    memo,
    categoryId
  ) => {
    try {
      let data = {
        user_id: userId,
        date: date,
        is_income: isIncome,
        amount: amount,
        memo: memo,
        category_id: categoryId,
      };
      //   const url = 'http://localhost:3000/transactions';
      const url = 'http://localhost:3001/transactions';
      const response = await axios.post(url, data);
      transactions.value.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editTransaction = async (transactionId, data) => {
    try {
      //   const url = 'http://localhost:3000/transactions';
      const url = 'http://localhost:3001/transactions';
      const response = await axios.put(url + `/${transactionId}`, data);
      const index = transactions.value.findIndex(
        (t) => t.id === Number(transactionId)
      );
      if (index !== -1) {
        transactions.value[index] = response.data;
      }
    } catch (error) {
      console.log('거래 수정 오류:', error);
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      //   const url = `http://localhost:3000/transactions/${transactionId}`;
      const url = `http://localhost:3001/transactions/${transactionId}`;
      await axios.delete(url);

      transactions.value = transactions.value.filter(
        (t) => t.id !== Number(transactionId)
      );
    } catch (error) {
      console.error('거래 삭제 오류', error);
    }
  };

  const openAddCategoryModal = () => {
    isAddCategoryModalOpen.value = true;
  };
  const closeAddCategoryModal = () => {
    isAddCategoryModalOpen.value = false;
  };
  const openDeleteTransactionModal = () => {
    isDeleteTransactionModalOpen.value = true;
  };
  const closeDeleteTransactionModal = () => {
    isDeleteTransactionModalOpen.value = false;
  };

  return {
    categories,
    incomeCategories,
    expenseCategories,
    transactions,
    isAddCategoryModalOpen,
    isDeleteTransactionModalOpen,

    fetchCategories,
    fetchTransactions,
    addCategory,
    openAddCategoryModal,
    closeAddCategoryModal,
    getTransactionsByCategoryId,
    addTransaction,
    editTransaction,
    openDeleteTransactionModal,
    closeDeleteTransactionModal,
    deleteTransaction,
  };
});
