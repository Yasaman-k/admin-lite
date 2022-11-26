<template>
  <div class="fixed right-0 z-30 bg-white" id="bank-account-statements-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader
      v-if="!checkPointExist"
      pageHeaderId="bank-account-statements-header"
    />
    <div id="bank-account-statements-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="business_account_statements"
      :nodeLink="businessAccountStatementsLink"
      pageHeaderId="bank-account-statements-header"
      pageContentId="bank-account-statements-content"
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

const businessAccountStatementsFields = ref(
  store.getters["businessAccountStatements/getBusinessAccountStatements"]
);
const checkPointExist = ref(false);
const businessAccountStatementsLink = ref("");

onBeforeMount(async () => {
  await store.dispatch(
    "businessAccountStatements/fetchBusinessAccountStatements"
  );
  const bankAccountStatus = financialStatuses.value.find((item) =>
    Object.prototype.hasOwnProperty.call(item, "bank_account")
  );

  if (bankAccountStatus["bank_account"].toLowerCase() != "positive") {
    router.push(
      "/fundability/financials/business-account-statements/add-bank-account"
    );
    return (checkPointExist.value = true);
  }

  businessAccountStatementsFields.value =
    store.getters["businessAccountStatements/getBusinessAccountStatements"];
  if (businessAccountStatementsFields.value.length) {
    router.push(
      "/fundability/financials/business-account-statements/confirmation"
    );
    return (checkPointExist.value = true);
  }
  router.push("/fundability/financials/business-account-statements");
  return (checkPointExist.value = true);
});

onUpdated(() => {
  businessAccountStatementsLink.value = route.fullPath;
});
</script>
