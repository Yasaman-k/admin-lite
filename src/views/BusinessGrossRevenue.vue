<template>
  <div class="fixed right-0 z-30 bg-white" id="business-gross-revenue-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader
      v-if="!checkPointExist"
      pageHeaderId="business-gross-revenue-header"
    />
    <div id="business-gross-revenue-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="business_gross_revenue"
      :nodeLink="businessGrossRevenueLink"
      pageHeaderId="business-gross-revenue-header"
      pageContentId="business-gross-revenue-content"
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
const checkPointExist = ref(false);
const businessGrossRevenueLink = ref("");
const financialStatuses = ref(store.getters["aspects/getFinancialsStatuses"]);

onBeforeMount(async () => {
  await store.dispatch("businessGrossRevenue/fetchBusinessGrossRevenueFields");
  await store.dispatch("businessGrossRevenue/fetchConfirmations");

  const fields =
    store.getters["businessGrossRevenue/getBusinessGrossRevenueFields"];
  const confirmation =
    store.getters["businessGrossRevenue/getGrossRevenueConfirmations"];
  // Determine Checkpoint

  // Get Filed Last Year Confirmation
  let generateRevenueConfirmation;
  confirmation.length &&
  confirmation[0].has_business_revenue &&
  (confirmation[0].has_business_revenue.value === false ||
    confirmation[0].has_business_revenue.value === true)
    ? (generateRevenueConfirmation = confirmation[0].has_business_revenue.value)
    : (generateRevenueConfirmation = null);

  // Get Filed Last Year Confirmation
  let monthlyRevenue = "";
  monthlyRevenue =
    fields.length &&
    fields.filter((field) => Object.keys(field)[0] === "monthly_gross_revenue");
  monthlyRevenue.length && (monthlyRevenue = monthlyRevenue[0]);

  monthlyRevenue && monthlyRevenue.monthly_gross_revenue.data
    ? (monthlyRevenue = monthlyRevenue.monthly_gross_revenue.data)
    : (monthlyRevenue = null);

  if (!generateRevenueConfirmation && generateRevenueConfirmation != null) {
    checkPointExist.value = true;
    return router.push("/fundability/financials/business-revenue/resources");
  } else if (generateRevenueConfirmation && monthlyRevenue) {
    checkPointExist.value = true;
    return router.push("/fundability/financials/business-revenue/complete");
  }
  checkPointExist.value = true;
  return router.push("/fundability/financials/business-revenue");
});

onUpdated(() => {
  businessGrossRevenueLink.value = route.fullPath;
});
</script>
