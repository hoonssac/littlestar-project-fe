<template>
  <div class="container">
    <div class="header form-control">
      <p class="category-name">{{ categoryName }}</p>
    </div>

    <div class="mileage-container">
      <MileageDisplay :size="120" color="#FAB809" />
      <MileageCounter :amount="500" :duration="1200" />
      <br />
      <br />
      <h2>기록 완료!</h2>
      <h4>500 마일리지 획득!</h4>
    </div>
  </div>
</template>
<script setup>
import { useMoneyTrackerStore } from '@/stores/moneyTrackerStore';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';
import MileageDisplay from '@/components/quiz/MileageDisplay.vue';
import MileageCounter from '@/components/quiz/MileageCounter.vue';

const router = useRouter();
const currentRoute = useRoute();
const store = useMoneyTrackerStore();
const id = currentRoute.params.categoryId;

const categoryName = computed(() => {
  const category = store.categories.find((c) => String(c.id) === String(id));
  return category.name;
});

onMounted(() => {
  setTimeout(() => {
    router.go(-2);
  }, 3000);
});
</script>
<style scoped>
.header {
  background-color: #1c2b59;
  text-align: center;
  width: 100%;
}
.category-name {
  color: white;
  margin: 0.6rem;
  font-weight: 100;
  font-size: 2rem;
}
.mileage-container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  text-align: center;
  margin: 5rem auto;
}
</style>
