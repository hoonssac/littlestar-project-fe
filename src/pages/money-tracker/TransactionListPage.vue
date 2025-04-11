<template>
  <div class="container">
    <div class="header form-control">
      <p class="category-name">{{ categoryName }}</p>
    </div>

    <CustomButton
      @click="
        router.push({
          name: 'money-tracker-category-add',
          params: { categoryId: id },
        })
      "
      class="add-transaction-button"
      category="secondary"
      size="large"
    >
      <p style="font-size: 100px; margin: 0; padding: 0; line-height: 0.5">+</p>
      <p style="font-size: 24px; margin: 0">기록하기</p></CustomButton
    >

    <div v-if="filteredTransactions.length === 0">거래 내역이 없습니다.</div>
    <div
      v-else
      class="card"
      v-for="transaction in filteredTransactions"
      :key="transaction.id"
    >
      <div class="card-body p-0">
        <div class="button-group">
          <button
            class="image-button"
            @click="
              router.push({
                name: 'money-tracker-category-edit-transactionId',
                params: {
                  categoryId: currentRoute.params.categoryId,
                  transactionId: transaction.id,
                },
              })
            "
          >
            <img :src="EditIcon" alt="" />
          </button>
          <button class="image-button" @click="deleteHandler(transaction.id)">
            <img :src="trashIcon" alt="" />
          </button>
        </div>

        <p class="transaction" style="font-size: 1.2rem">
          {{ transaction.date }}
        </p>
        <p class="transaction" style="font-size: 1.5rem">
          + {{ transaction.amount }}원
        </p>
        <p class="transaction" style="font-size: 1.3rem">
          {{ transaction.memo }}
        </p>
      </div>
    </div>

    <DeleteTransactionModal
      v-if="store.isDeleteTransactionModalOpen"
      :transactionId="whichTransaction"
    />
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { onMounted, computed, ref } from 'vue';
import { useMoneyTrackerStore } from '@/stores/moneyTrackerStore';
import { useRouter } from 'vue-router';
import CustomButton from '@/components/common/CustomButton.vue';
import EditIcon from '@/assets/images/pencil.png';
import trashIcon from '@/assets/images/bin.png';
import DeleteTransactionModal from '@/components/money-tracker/DeleteTransactionModal.vue';
const store = useMoneyTrackerStore();
const currentRoute = useRoute();
const router = useRouter();
const id = currentRoute.params.categoryId;

const categoryName = computed(() => {
  const category = store.categories.find((c) => String(c.id) === String(id));
  return category.name;
});

const route = useRoute();

onMounted(async () => {
  await store.fetchTransactions();
});
const filteredTransactions = computed(() => {
  return store
    .getTransactionsByCategoryId(id)
    .slice()
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
});

const whichTransaction = ref(null);

const deleteHandler = (transactionId) => {
  whichTransaction.value = transactionId;
  store.openDeleteTransactionModal();
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
.card {
  width: 70%;
  margin: 1rem auto;
  border-radius: 25px;
  background-color: #dcebfd;
  padding: 0.3rem 1rem;

  border-style: solid;
  border-color: #4a483f;

  border-top-width: 1px;
  border-right-width: 7px;
  border-bottom-width: 7px;
  border-left-width: 1px;
  position: relative;
}

.add-transaction-button {
  width: 189px;
  height: 125px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
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
.transaction {
  margin: 0.4rem auto;
}
.image-button {
  width: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.image-button img {
  width: 100%;
}
.button-group {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 4px;
}
</style>
