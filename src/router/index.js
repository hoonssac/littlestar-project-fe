import App from '@/App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import QuizMainPage from '@/pages/quiz/QuizMain.vue';
import QuizIntroPage from '@/pages/quiz/QuizIntro.vue';
import MoneyTrackPage from '@/pages/money-tracker/MoneyTrackPage.vue';
import IncomeCategoryPage from '@/pages/money-tracker/IncomeCategory.vue';
import ExpenseCategoryPage from '@/pages/money-tracker/ExpenseCategory.vue';
import RecordListPage from '@/pages/money-tracker/RecordListPage.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: App,
    },
    {
      // 퀴즈 메인 페이지
      path: '/quiz',
      name: 'Quiz',
      component: QuizMainPage,
    },
    {
      path: '/quiz/intro',
      name: 'QuizIntro',
      component: QuizIntroPage,
    },
    {
      path: '/money-tracker',
      name: 'money-tracker',
      component: MoneyTrackPage,
    },
    {
      path: '/money-tracker/income',
      name: 'money-tracker-income',
      component: IncomeCategoryPage,
    },
    {
      path: '/money-tracker/expense',
      name: 'money-tracker-expense',
      component: ExpenseCategoryPage,
    },
    {
      path: '/money-tracker/income/:categoryId',
      name: 'money-tracker-income/categoryId',
      component: RecordListPage,
    },
  ],
});

export default router;
