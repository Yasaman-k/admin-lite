<template>
  <div class="fixed right-0 z-30 bg-white" id="bank-account-balance-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader
      v-if="!checkPointExist"
      pageHeaderId="bank-account-balance-header"
    />
    <div id="bank-account-balance-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="business_account_balance"
      :nodeLink="businessAccountBalanceLink"
      pageHeaderId="bank-account-balance-header"
      pageContentId="bank-account-balance-content"
      aspectTitle="Financials"
      :aspectStatuses="financialNodes"
      :aspectStatusesDb="financialStatuses"
    >
    </base-foundation-right-bar>
  </section>
</template>

<script setup>
import { onBeforeMount, onUpdated, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import SpinnerLoader from "../components/SpinnerLoader.vue";
import PageHeader from "../components/PageHeader.vue";
import BaseFoundationRightBar from "../components/BaseFoundationRightBar.vue";
import { financialNodes } from "../constants";

const store = useStore();
const router = useRouter();
const route = useRoute();

// Data
const financialStatuses = ref(store.getters["aspects/getFinancialsStatuses"]);

const checkPointExist = ref(false);
const businessAccountBalanceLink = ref("");

onBeforeMount(async () => {
  const bankAccountStatus = financialStatuses.value.find((item) =>
    Object.prototype.hasOwnProperty.call(item, "bank_account")
  );

  if (bankAccountStatus["bank_account"].toLowerCase() != "positive") {
    router.push(
      "/fundability/financials/business-account-balance/add-bank-account"
    );
    return (checkPointExist.value = true);
  }

  await store.dispatch("businessAccountBalance/fetchBusinessAccountBalance");

  const businessAccountBalanceStatus = financialStatuses.value.find((item) =>
    Object.prototype.hasOwnProperty.call(item, "business_account_balance")
  ); 

  if (
    businessAccountBalanceStatus["business_account_balance"].toLowerCase() ==
      "empty" ||
    businessAccountBalanceStatus["business_account_balance"].toLowerCase() ==
      "negative"
  ) {
    router.push("/fundability/financials/business-account-balance");
    return (checkPointExist.value = true);
  } else {
    router.push(
      "/fundability/financials/business-account-balance/confirmation"
    );
    return (checkPointExist.value = true);
  }
});

onUpdated(() => {
  businessAccountBalanceLink.value = route.fullPath;
});
</script>
