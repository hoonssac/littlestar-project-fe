<template>
  <div class="container">
    <div class="header form-control">
      <p class="category-name">{{ categoryName }}</p>
    </div>

    <div class="card">
      <div class="card-body">
        <label for="date">날짜</label><br />
        <input
          type="date"
          id="date"
          class="form-control"
          v-model="date"
        /><br />
        <label for="amount">금액</label><br />
        <input
          type="text"
          id="amount"
          class="form-control"
          v-model="amount"
        /><br />
        <label for="memo">메모</label><br />
        <input type="text" class="form-control" v-model.trim="memo" />
        <div class="button-group">
          <CustomButton
            category="secondary"
            size="medium"
            @click="router.go(-1)"
            class="form-button"
            >취소</CustomButton
          >

          <CustomButton
            category="success"
            size="medium"
            @click="addTransaction"
            class="form-button"
            >저장</CustomButton
          >
        </div>
      </div>
    </div>

    <TeamRocketAlert :show="showAlert" :message="alertMessage" />
  </div>
</template>
<script setup>
import { useMoneyTrackerStore } from '@/stores/moneyTrackerStore';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import CustomButton from '@/components/common/CustomButton.vue';
import TeamRocketAlert from '@/components/money-tracker/TeamRocketAlert.vue';

const currentRoute = useRoute();
const router = useRouter();
const store = useMoneyTrackerStore();
const id = currentRoute.params.categoryId;

const date = ref('');
const amount = ref('');
const memo = ref('');

const showAlert = ref(false);
const alertMessage = ref('');

const categoryName = computed(() => {
  const category = store.categories.find((c) => String(c.id) === String(id));
  return category.name;
});
const isIncome = computed(() => {
  const category = store.categories.find((c) => String(c.id) === String(id));
  return category.is_income;
});

const showTemporaryAlert = (message) => {
  alertMessage.value = message;
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 2000);
};
const addTransaction = async () => {
  if (!amount.value || !memo.value || !date.value) {
    showTemporaryAlert('모든 항목을 입력해라옹!');
    return;
  }

  if (isNaN(amount.value)) {
    showTemporaryAlert('금액은 숫자로 입력해라옹!');
    return;
  }

  //   유저 아이디 생기면 수정 필요
  await store.addTransaction(
    1,
    date.value,
    isIncome.value,
    amount.value,
    memo.value,
    id
  );

  router.go(-1);
};
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

.card {
  padding: 1rem;
  width: 80%;
  margin: 3rem auto;
  background-color: #dcebfd;

  border-radius: 25px;
  border-style: solid;
  border-color: #4a483f;

  border-top-width: 1px;
  border-right-width: 7px;
  border-bottom-width: 7px;
  border-left-width: 1px;
}
label {
  margin-left: 0.5rem;
  font-size: 1.2rem;
}
input {
  height: 3rem;
  font-size: 1.2rem;
}

.button-group {
  margin-top: 2rem;

  display: flex;
  gap: 20px;
  justify-content: center;
}

.form-button {
  width: 137px;
  height: 58px;
}
.add-button {
  background-color: #3365a6;
}
</style>
