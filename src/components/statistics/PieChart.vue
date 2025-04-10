<template>
  <div v-if="props.data.length > 0">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
  <p v-else class="text-center text-gray-400 chart-skeleton">
    데이터가 없어 차트를 표시할 수 없습니다.
  </p>
</template>

<script setup>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { computed } from 'vue';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  labels: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.data,
      backgroundColor: ['#5C6687', '#6C90BF', '#F6CC4C', '#D1B14F'],
      hoverBackgroundColor: ['#1C2B59', '#3365A6', '#F2B807', '#F2B807'], // hover 시 색상
      borderWidth: 0,
      hoverOffset: 10, // hover 시 튀어나오는 정도
      borderRadius: 5, // 각 섹션의 모서리 둥글게
    },
  ],
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '0', // 도넛 크기 조절 (0이면 파이 차트)
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: {
          size: 14,
        },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: '#333',
      titleColor: '#fff',
      bodyColor: '#fff',
    },
  },
}));
</script>

<style scoped>
.chart-skeleton {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
