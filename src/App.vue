<template>
  <div class="main-container">
    <TopBar v-if="!isAuthPage" />
    <div class="app-container">
      <router-view></router-view>
    </div>
    <BottomBar v-if="!isAuthPage" />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import BottomBar from './components/common/BottomBar.vue';
import TopBar from './components/common/TopBar.vue';
import { computed, onMounted } from 'vue';
import { useAuthStore } from './stores/authStore';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const isAuthPage = computed(() => {
  return ['/login', '/signup', '/select-main-pokemon'].includes(route.path);
});

onMounted(() => {
  if (!authStore.user && !isAuthPage.value) {
    router.push('/login');
  }
});
</script>

<style scoped>
.main-container {
  display: flex;
}

.app-container {
  min-height: 100vh;
  padding: 70px 0 80px 0;
  overflow-y: auto;
  flex: 1;
}

.navbar {
  display: flex;
  justify-content: end;
}
</style>
