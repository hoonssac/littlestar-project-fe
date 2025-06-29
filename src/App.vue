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
import { computed, onMounted, watch } from 'vue';
import { useAuthStore } from './stores/authStore';
import { getSessionUser } from './apis/users'; // ✅ 수정: getSessionUser로 변경

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const isAuthPage = computed(() => {
  return ['/login', '/signup', '/select-main-pokemon'].includes(route.path);
});

onMounted(async () => {
  if (!authStore.user && !isAuthPage.value) {
    const user = await getSessionUser();
    if (user) {
      authStore.login(user); // ✅ Pinia 상태 복구
    } else {
      router.push('/login');
    }
  }
});

const fetchUser = async () => {
  if (authStore.user) {
    await getSessionUser(); // 필요시 세션 최신화
  }
};

watch(
  () => route.fullPath,
  async () => {
    await fetchUser();
  }
);
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
