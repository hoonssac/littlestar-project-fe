import App from '@/App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import QuizMainPage from '@/pages/quiz/QuizMain.vue';
import QuizIntroPage from '@/pages/quiz/QuizIntro.vue';
import QuizQuestion from '@/pages/quiz/QuizQuestion.vue';
import QuizResult from '@/pages/quiz/QuizResult.vue';
import QuizReward from '@/pages/quiz/QuizReward.vue';
import MoneyTrackPage from '@/pages/money-tracker/MoneyTrackPage.vue';
import IncomeCategoryPage from '@/pages/money-tracker/IncomeCategory.vue';
import ExpenseCategoryPage from '@/pages/money-tracker/ExpenseCategory.vue';
import TransactionListPage from '@/pages/money-tracker/TransactionListPage.vue';
import EditTransactionPage from '@/pages/money-tracker/EditTransactionPage.vue';
import RecordListPage from '@/pages/money-tracker/TransactionListPage.vue';
import PokedexPage from '@/pages/pokemon/PokedexPage.vue';
import Home from '@/pages/home/Home.vue';
import Login from '@/pages/home/Login.vue';
import SelectMainPokemon from '@/pages/home/SelectMainPokemon.vue';
import AddTransactionPage from '@/pages/money-tracker/AddTransactionPage.vue';
import PokemonGachaPage from '@/pages/pokemon/PokemonGachaPage.vue';
import Statistics from '@/pages/statistics/Statistics.vue';
import Signup from '@/pages/home/Signup.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: App,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/select-main-pokemon',
      name: 'select-main-pokemon',
      component: SelectMainPokemon,
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
      path: '/quiz/question',
      name: 'QuizQuestion',
      component: QuizQuestion,
    },
    {
      path: '/quiz/result',
      name: 'QuizResult',
      component: QuizResult,
    },
    {
      path: '/quiz/reward',
      name: 'QuizReward',
      component: QuizReward,
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
    {
      path: '/gacha',
      name: 'gacha',
      component: PokemonGachaPage,
    },
  ],
});

export default router;
