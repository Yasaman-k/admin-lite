<template>
  <div class="fixed right-0 z-30 bg-white" id="personal-tax-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader v-if="!checkPointExist" pageHeaderId="personal-tax-header" />
    <div id="personal-tax-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="personal_tax_returns"
      :nodeLink="personalTaxLink"
      pageHeaderId="personal-tax-header"
      pageContentId="personal-tax-content"
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
const personalTaxLink = ref("");
const financialStatuses = ref(store.getters["aspects/getFinancialsStatuses"]);

onBeforeMount(async () => {
  await store.dispatch("personalTaxReturns/fetchPersonalTaxReturnsFields");
  await store.dispatch("personalTaxReturns/fetchPersonalConfirmations");
  const confirmations =
    store.getters["personalTaxReturns/getPersonalTaxReturnsConfirmations"];

  // Determine Checkpoint
  if (confirmations.length) {
    // Get Up-to-date Confirmation
    let upToDateConfirmation = "";
    upToDateConfirmation = confirmations.filter(
      (field) => Object.keys(field)[0] === "has_personal_tax_returns_updated"
    );
    upToDateConfirmation.length &&
      (upToDateConfirmation = upToDateConfirmation[0]);

    upToDateConfirmation.has_personal_tax_returns_updated &&
    (upToDateConfirmation.has_personal_tax_returns_updated.value === false ||
      upToDateConfirmation.has_personal_tax_returns_updated.value === true)
      ? (upToDateConfirmation =
          upToDateConfirmation.has_personal_tax_returns_updated.value)
      : (upToDateConfirmation = null);

    // Get Extensions Confirmation
    let extensionConfirmation = "";
    extensionConfirmation = confirmations.filter(
      (field) =>
        Object.keys(field)[0] === "has_personal_tax_returns_filed_for_extension"
    );
    extensionConfirmation.length &&
      (extensionConfirmation = extensionConfirmation[0]);
    extensionConfirmation.has_personal_tax_returns_filed_for_extension &&
    (extensionConfirmation.has_personal_tax_returns_filed_for_extension
      .value === false ||
      extensionConfirmation.has_personal_tax_returns_filed_for_extension
        .value === true)
      ? (extensionConfirmation =
          extensionConfirmation.has_personal_tax_returns_filed_for_extension
            .value)
      : (extensionConfirmation = null);

    // Get Back Taxes Confirmation
    let backTaxesConfirmation = "";
    backTaxesConfirmation = confirmations.filter(
      (field) => Object.keys(field)[0] === "has_no_personal_back_taxes"
    );
    backTaxesConfirmation.length &&
      (backTaxesConfirmation = backTaxesConfirmation[0]);
    backTaxesConfirmation.has_no_personal_back_taxes &&
    (backTaxesConfirmation.has_no_personal_back_taxes.value === false ||
      backTaxesConfirmation.has_no_personal_back_taxes.value === true)
      ? (backTaxesConfirmation =
          backTaxesConfirmation.has_no_personal_back_taxes.value)
      : (backTaxesConfirmation = null);

    // Determine The Checkpoint
    if (
      upToDateConfirmation &&
      extensionConfirmation &&
      backTaxesConfirmation
    ) {
      checkPointExist.value = true;
      return router.push("/fundability/financials/personal-tax/complete");
    } else if (
      upToDateConfirmation &&
      !extensionConfirmation &&
      extensionConfirmation != null &&
      !backTaxesConfirmation &&
      backTaxesConfirmation != null
    ) {
      checkPointExist.value = true;
      return router.push("/fundability/financials/personal-tax/form");
    } else if (
      !upToDateConfirmation ||
      (upToDateConfirmation &&
        !extensionConfirmation &&
        extensionConfirmation != null) ||
      (upToDateConfirmation &&
        extensionConfirmation &&
        !backTaxesConfirmation &&
        backTaxesConfirmation != null)
    ) {
      checkPointExist.value = true;
      return router.push("/fundability/financials/personal-tax/resources");
    }
  }
  checkPointExist.value = true;
  return router.push("/fundability/financials/personal-tax");
});

onUpdated(() => {
  personalTaxLink.value = route.fullPath;
});
</script>
