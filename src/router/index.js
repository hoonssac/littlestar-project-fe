import App from '@/App.vue';
import { createRouter, createWebHistory } from 'vue-router';
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
