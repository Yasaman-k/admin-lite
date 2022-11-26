<template>
  <div class="fixed right-0 z-30 bg-white" id="business-tax-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader v-if="!checkPointExist" pageHeaderId="business-tax-header" />
    <div id="business-tax-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="business_tax_returns"
      :nodeLink="businessTaxLink"
      pageHeaderId="business-tax-header"
      pageContentId="business-tax-content"
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
const businessTaxLink = ref("");
const financialStatuses = ref(store.getters["aspects/getFinancialsStatuses"]);

onBeforeMount(async () => {
  // Fetching Fields, Confirmation, and Industry options
  await store.dispatch(
    "businessTaxReturns/fetchBusinessTaxReturnsConfirmations"
  );
  await store.dispatch("businessTaxReturns/fetchBusinessTaxReturnsFields");
  await store.dispatch("businessTaxReturns/fetchIndustryOptions");

  const confirmations =
    store.getters["businessTaxReturns/getBusinessTaxReturnsConfirmations"];
  const fields =
    store.getters["businessTaxReturns/getBusinessTaxReturnsFields"];

  // Determine Checkpoint
  if (confirmations.length) {
    // Get Filed Last Year Confirmation
    let filedLastYearConfirmation = "";
    filedLastYearConfirmation = confirmations.filter(
      (field) =>
        Object.keys(field)[0] === "has_filed_business_tax_returns_last_year"
    );
    filedLastYearConfirmation.length &&
      (filedLastYearConfirmation = filedLastYearConfirmation[0]);

    filedLastYearConfirmation.has_filed_business_tax_returns_last_year &&
    (filedLastYearConfirmation.has_filed_business_tax_returns_last_year
      .value === false ||
      filedLastYearConfirmation.has_filed_business_tax_returns_last_year
        .value === true)
      ? (filedLastYearConfirmation =
          filedLastYearConfirmation.has_filed_business_tax_returns_last_year
            .value)
      : (filedLastYearConfirmation = null);

    // Get Up-to-date Confirmation
    let upToDateConfirmation = "";
    upToDateConfirmation = confirmations.filter(
      (field) =>
        Object.keys(field)[0] ===
        "has_filed_business_tax_returns_for_each_year_in_business"
    );
    upToDateConfirmation.length &&
      (upToDateConfirmation = upToDateConfirmation[0]);

    upToDateConfirmation.has_filed_business_tax_returns_for_each_year_in_business &&
    (upToDateConfirmation
      .has_filed_business_tax_returns_for_each_year_in_business.value ===
      false ||
      upToDateConfirmation
        .has_filed_business_tax_returns_for_each_year_in_business.value ===
        true)
      ? (upToDateConfirmation =
          upToDateConfirmation
            .has_filed_business_tax_returns_for_each_year_in_business.value)
      : (upToDateConfirmation = null);

    // Get Last Filled Year
    let lastFiledYear = "";
    lastFiledYear =
      fields.length &&
      fields.filter(
        (field) =>
          Object.keys(field)[0] === "business_tax_return_year_last_filed_at"
      );

    lastFiledYear.length &&
    lastFiledYear[0].business_tax_return_year_last_filed_at.data
      ? (lastFiledYear =
          lastFiledYear[0].business_tax_return_year_last_filed_at.data)
      : (lastFiledYear = "");

    if (
      filedLastYearConfirmation &&
      upToDateConfirmation &&
      lastFiledYear.length
    ) {
      checkPointExist.value = true;
      return router.push("/fundability/financials/business-tax/confirmation");
    } else if (
      !filedLastYearConfirmation &&
      filedLastYearConfirmation != null
    ) {
      checkPointExist.value = true;
      return router.push("/fundability/financials/business-tax/incomplete");
    } else if (
      filedLastYearConfirmation &&
      !upToDateConfirmation &&
      upToDateConfirmation != null
    ) {
      checkPointExist.value = true;
      return router.push("/fundability/financials/business-tax/not-up-to-date");
    }
  }
  checkPointExist.value = true;
  return router.push("/fundability/financials/business-tax");
});

onUpdated(() => {
  businessTaxLink.value = route.fullPath;
});
</script>
