import App from '@/App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import QuizMain from '@/pages/quiz/QuizMain.vue';
import QuizIntro from '@/pages/quiz/QuizIntro.vue';

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
      component: QuizMain,
    },
    {
      path: '/quiz/intro',
      name: 'QuizIntro',
      component: QuizIntro,
    },
  ],
});

export default router;
