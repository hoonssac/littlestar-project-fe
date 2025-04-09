<template>
  <div class="mileage-reward">
    <IconMileage size="120" color="#FAB809" />
    <p class="text">500 마일리지 획득!</p>
    <CustomButton category="primary" @click="goToPokedex">
      포켓몬 뽑으러 가기
    </CustomButton>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import IconMileage from '@/components/common/icons/IconMileage.vue';
import CustomButton from '@/components/common/CustomButton.vue';
import { useMileageStore } from '@/stores/mileage';

const router = useRouter();
const mileage = useMileageStore();

// ✅ 오답 보상 지급
mileage.add(500);

function goToPokedex() {
  router.push('/pokedex');
}
</script>

<style scoped>
.mileage-reward {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.text {
  font-size: 28px;
  font-weight: bold;
  margin: 2rem 0;
  color: #fab809;
}
</style>
