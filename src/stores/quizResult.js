import { defineStore } from 'pinia';

export const useQuizResultStore = defineStore('quizResult', {
  state: () => ({
    isCorrect: null,
    mileage: 0,
    explanation: '',
    date: '',
  }),
  actions: {
    setResult({ isCorrect, mileage, explanation, date }) {
      this.isCorrect = isCorrect;
      this.mileage = mileage;
      this.explanation = explanation;
      this.date = date;
    },
    reset() {
      this.isCorrect = null;
      this.mileage = 0;
      this.explanation = '';
      this.date = '';
    },
  },
});
