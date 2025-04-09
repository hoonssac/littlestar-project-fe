import { defineStore } from 'pinia';

export const useQuizResultStore = defineStore('quizResult', {
  state: () => ({
    isCorrect: null,
    mileage: 0,
    explanation: '',
  }),
  actions: {
    setResult({ isCorrect, mileage, explanation }) {
      this.isCorrect = isCorrect;
      this.mileage = mileage;
      this.explanation = explanation;
    },
    reset() {
      this.isCorrect = null;
      this.mileage = 0;
      this.explanation = '';
    },
  },
});
