<template>
  <div class="fixed right-0 z-30 bg-white" id="business-collateral-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader
      v-if="!checkPointExist"
      pageHeaderId="business-collateral-header"
    />
    <div id="business-collateral-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="business_collateral"
      :nodeLink="businessCollateralLink"
      pageHeaderId="business-collateral-header"
      pageContentId="business-collateral-content"
      aspectTitle="Financials"
      :aspectStatuses="financialNodes"
      :aspectStatusesDb="financialStatuses"
    >
    </base-foundation-right-bar>
  </section>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
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
const businessCollateralLink = ref("");
const financialStatuses = ref(store.getters["aspects/getFinancialsStatuses"]);

onBeforeMount(async () => {
  await store.dispatch("businessCollateral/fetchBusinessCollateralFields");
  await store.dispatch("businessCollateral/fetchStatements");
  await store.dispatch("businessCollateral/fetchEquipment");

  const statements = store.getters["businessCollateral/getStatements"];

  // Determine Checkpoint
  if (statements.length) {
    // Get Collateral Confirmation
    let hasCollateral = statements.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "has_collateral")
    );

    hasCollateral && hasCollateral.has_collateral
      ? (hasCollateral = hasCollateral.has_collateral.value)
      : (hasCollateral = "");
    hasCollateral =
      hasCollateral === true ? "Yes" : hasCollateral === false ? "No" : "";

    // Get Account Receivable Confirmation
    let hasAccountsReceivable = statements.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "has_accounts_receivable")
    );

    hasAccountsReceivable && hasAccountsReceivable.has_accounts_receivable
      ? (hasAccountsReceivable =
          hasAccountsReceivable.has_accounts_receivable.value)
      : "";
    hasAccountsReceivable =
      hasAccountsReceivable === true
        ? "Yes"
        : hasAccountsReceivable === false
        ? "No"
        : "";

    // Get Titled Equipment Confirmation
    let hasTitledEquipment = "";

    hasTitledEquipment = statements.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "has_titled_equipment")
    );

    hasTitledEquipment && hasTitledEquipment.has_titled_equipment
      ? (hasTitledEquipment = hasTitledEquipment.has_titled_equipment.value)
      : (hasTitledEquipment = "");
    hasTitledEquipment =
      hasTitledEquipment === true
        ? "Yes"
        : hasTitledEquipment === false
        ? "No"
        : "";

    // Get Real Estate Confirmation
    let hasRealEstate = statements.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "has_commercial_real_estate")
    );

    hasRealEstate && hasRealEstate.has_commercial_real_estate
      ? (hasRealEstate = hasRealEstate.has_commercial_real_estate.value)
      : (hasRealEstate = "");
    hasRealEstate =
      hasRealEstate === true ? "Yes" : hasRealEstate === false ? "No" : "";

    // Get 410k Confirmation
    let hasAny401;

    hasAny401 = statements.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "has_401ks_as_collateral")
    );

    hasAny401 && hasAny401.has_401ks_as_collateral
      ? (hasAny401 = hasAny401.has_401ks_as_collateral.value)
      : (hasAny401 = "");
    hasAny401 = hasAny401 === true ? "Yes" : hasAny401 === false ? "No" : "";

    // Get Securities Confirmation
    let hasSecuritiesAccounts = statements.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "has_securities_accounts")
    );

    if (hasSecuritiesAccounts) {
      hasSecuritiesAccounts.has_securities_accounts
        ? (hasSecuritiesAccounts =
            hasSecuritiesAccounts.has_securities_accounts.value === true
              ? "Yes"
              : hasSecuritiesAccounts.has_securities_accounts.value === false
              ? "No"
              : "")
        : (hasSecuritiesAccounts = "");
    } else {
      hasSecuritiesAccounts = "";
    }
    // Get Other Confirmation
    let hasOtherCollateral = statements.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "has_other_collateral")
    );

    hasOtherCollateral && hasOtherCollateral.has_other_collateral
      ? (hasOtherCollateral = hasOtherCollateral.has_other_collateral.value)
      : (hasOtherCollateral = "");
    hasOtherCollateral =
      hasOtherCollateral === true
        ? "Yes"
        : hasOtherCollateral === false
        ? "No"
        : "";
    if (!hasCollateral || !hasCollateral.length) {
      router.push("/fundability/financials/business-collateral");
      return (checkPointExist.value = true);
    } else if (hasCollateral === "No") {
      router.push("/fundability/financials/business-collateral/no-collateral");
      return (checkPointExist.value = true);
    } else if (
      hasCollateral === "Yes" &&
      hasAccountsReceivable.length &&
      !hasTitledEquipment.length
    ) {
      router.push(
        "/fundability/financials/business-collateral/titled-equipment"
      );
      return (checkPointExist.value = true);
    } else if (
      hasCollateral === "Yes" &&
      hasAccountsReceivable.length &&
      hasTitledEquipment.length &&
      !hasRealEstate.length
    ) {
      router.push("/fundability/financials/business-collateral/real-estate");
      return (checkPointExist.value = true);
    } else if (
      hasCollateral === "Yes" &&
      hasAccountsReceivable.length &&
      hasTitledEquipment.length &&
      hasRealEstate.length &&
      !hasAny401.length
    ) {
      router.push("/fundability/financials/business-collateral/401k");
      return (checkPointExist.value = true);
    } else if (
      hasCollateral === "Yes" &&
      hasAccountsReceivable.length &&
      hasTitledEquipment.length &&
      hasRealEstate.length &&
      hasAny401.length &&
      !hasSecuritiesAccounts.length
    ) {
      router.push(
        "/fundability/financials/business-collateral/securities-accounts"
      );
      return (checkPointExist.value = true);
    } else if (
      hasCollateral === "Yes" &&
      hasAccountsReceivable.length &&
      hasTitledEquipment.length &&
      hasRealEstate.length &&
      hasAny401.length &&
      hasSecuritiesAccounts.length &&
      !hasOtherCollateral.length
    ) {
      router.push("/fundability/financials/business-collateral/other");
      return (checkPointExist.value = true);
    } else if (
      hasCollateral === "Yes" &&
      hasAccountsReceivable.length &&
      hasTitledEquipment.length &&
      hasRealEstate.length &&
      hasAny401.length &&
      hasOtherCollateral.length
    ) {
      router.push("/fundability/financials/business-collateral/complete");
      return (checkPointExist.value = true);
    }
    router.push("/fundability/financials/business-collateral");
    return (checkPointExist.value = true);
  }
  router.push("/fundability/financials/business-collateral");
  return (checkPointExist.value = true);
});

watch(route, (newRoute) => (businessCollateralLink.value = newRoute.fullPath));
</script>
