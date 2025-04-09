import App from '@/App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import QuizMainPage from '@/pages/quiz/QuizMain.vue';
import QuizIntroPage from '@/pages/quiz/QuizIntro.vue';
import MoneyTrackPage from '@/pages/money-tracker/MoneyTrackPage.vue';
import IncomeCategoryPage from '@/pages/money-tracker/IncomeCategory.vue';
import ExpenseCategoryPage from '@/pages/money-tracker/ExpenseCategory.vue';
import RecordListPage from '@/pages/money-tracker/TransactionListPage.vue';
import PokedexPage from '@/pages/pokemon/PokedexPage.vue';
import TransactionListPage from '@/pages/money-tracker/TransactionListPage.vue';
import AddTransactionPage from '@/pages/money-tracker/AddTransactionPage.vue';
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
      children: [
        {
          path: 'income',
          name: 'money-tracker-income',
          component: IncomeCategoryPage,
        },
        {
          path: 'expense',
          name: 'money-tracker-expense',
          component: ExpenseCategoryPage,
        },
      ],
    },
    {
      path: '/money-tracker/income/:categoryId',
      name: 'money-tracker-income-category',
      component: TransactionListPage,
    },
    {
      path: '/money-tracker/income/:categoryId/add',
      name: 'money-tracker-income-category-add',
      component: AddTransactionPage,
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: PokedexPage,
    },
  ],
});

export default router;
