<template>
  <PageHeader />
  <section class="overflow-hidden relative">
    <SpinnerLoader v-if="loading" />
    <FundingManagerMain />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import SpinnerLoader from "../components/SpinnerLoader.vue";
import PageHeader from "../components/PageHeader.vue";
import { useStore } from "vuex";

const store = useStore();
const loading = ref(true);

onBeforeMount(async () => {
  await store.dispatch("funding/fetchFundingAccounts");
  loading.value = false;
});
</script>
