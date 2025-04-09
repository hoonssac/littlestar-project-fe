import App from '@/App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import QuizMainPage from '@/pages/quiz/QuizMain.vue';
import QuizIntroPage from '@/pages/quiz/QuizIntro.vue';
import MoneyTrackPage from '@/pages/money-tracker/MoneyTrackPage.vue';
import IncomeCategoryPage from '@/pages/money-tracker/IncomeCategory.vue';
import ExpenseCategoryPage from '@/pages/money-tracker/ExpenseCategory.vue';
import RecordListPage from '@/pages/money-tracker/TransactionListPage.vue';
import PokedexPage from '@/pages/pokemon/PokedexPage.vue';
import Home from '@/pages/home/Home.vue';
import AddTransactionPage from '@/pages/money-tracker/AddTransactionPage.vue';
import Statistics from '@/pages/statistics/Statistics.vue';
import TransactionListPage from '@/pages/money-tracker/TransactionListPage.vue';
import EditTransactionPage from '@/pages/money-tracker/EditTransactionPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: App,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizMainPage,
    },
    {
      path: '/quiz/intro',
      name: 'quiz-intro',
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
      path: '/money-tracker/expense/:categoryId',
      name: 'money-tracker-expense-category',
      component: TransactionListPage,
    },
    {
      path: '/money-tracker/:categoryId/add',
      name: 'money-tracker-category-add',
      component: AddTransactionPage,
    },
    {
      path: '/money-tracker/:categoryId/edit/:transactionId',
      name: 'money-tracker-category-edit-transactionId',
      component: EditTransactionPage,
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: PokedexPage,
    },
  ],
});

export default router;
