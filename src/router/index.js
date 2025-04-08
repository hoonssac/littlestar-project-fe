import App from '@/App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import PokedexPage from '@/pages/pokemon/PokedexPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: App,
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: PokedexPage,
    },
  ],
});

export default router;
