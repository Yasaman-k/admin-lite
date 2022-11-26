<template>
  <div class="fixed right-0 z-30 bg-white" id="bank-account-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader v-if="!checkPointExist" pageHeaderId="bank-account-header" />
    <div id="bank-account-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="bank_account"
      :nodeLink="bankAccountLink"
      pageHeaderId="bank-account-header"
      pageContentId="bank-account-content"
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
const bankAccountLink = ref("");

const financialStatuses = ref(store.getters["aspects/getFinancialsStatuses"]);

onBeforeMount(async () => {
  await store.dispatch("bankAccount/fetchConfirmations");
  await store.dispatch("bankAccount/fetchBankAccountFields");
  const fields = store.getters["bankAccount/getBankAccountFields"];
  const confirmations = store.getters["bankAccount/getConfirmations"];

  if (fields.length) {
    let bankAccountConfirmation =
      confirmations.length &&
      confirmations.filter((field) => {
        return Object.keys(field)[0] === "has_bank_account";
      })[0].has_bank_account;

    let bankAccountAddressMatchConfirmation =
      confirmations.length &&
      confirmations.filter((field) => {
        return (
          Object.keys(field)[0] === "has_confirmed_address_matches_bank_account"
        );
      })[0].has_confirmed_address_matches_bank_account;

    let businessAddressStreet = fields.filter((field) => {
      return Object.keys(field)[0] === "business_address_street";
    })[0];

    // Check if Bank Account Confirmation != undefined
    let bankAccountConfirmationVal = bankAccountConfirmation;
    bankAccountConfirmationVal &&
      (bankAccountConfirmationVal.value === false ||
        bankAccountConfirmationVal.value === true) &&
      (bankAccountConfirmationVal = bankAccountConfirmationVal.value);

    // Check if Bank Account Address Match Confirmation != undefined
    let bankAccountAddressMatchConfirmationVal;
    bankAccountAddressMatchConfirmation &&
      (bankAccountAddressMatchConfirmation.value === false ||
        bankAccountAddressMatchConfirmation.value === true) &&
      (bankAccountAddressMatchConfirmationVal =
        bankAccountAddressMatchConfirmation.value);

    // Check Bank Account Address Match Confirmation Updated Time
    let bankAccountAddressMatchConfirmationUpdatedTime;
    bankAccountAddressMatchConfirmation &&
      (bankAccountAddressMatchConfirmationUpdatedTime =
        bankAccountAddressMatchConfirmation.updated_at);

    // Check Business Address Street Updated Time
    let businessAddressStreetUpdatedTime;
    businessAddressStreet &&
      (businessAddressStreetUpdatedTime =
        businessAddressStreet.business_address_street.updated_at);

    // Determine Bank Account Link
    if (
      bankAccountConfirmationVal === null ||
      bankAccountConfirmationVal === undefined
    ) {
      checkPointExist.value = true;
      return router.push("/fundability/financials/business-account");
    } else if (
      !bankAccountConfirmationVal &&
      (bankAccountAddressMatchConfirmationVal === null ||
        bankAccountAddressMatchConfirmationVal === undefined)
    ) {
      checkPointExist.value = true;
      return router.push("/fundability/financials/business-account/resources");
    } else if (
      bankAccountConfirmationVal &&
      bankAccountAddressMatchConfirmationVal &&
      bankAccountAddressMatchConfirmationUpdatedTime >
        businessAddressStreetUpdatedTime
    ) {
      checkPointExist.value = true;
      return router.push(
        "/fundability/financials/business-account/bank-account-form-confirm"
      );
    } else if (
      bankAccountConfirmationVal &&
      bankAccountAddressMatchConfirmationVal &&
      bankAccountAddressMatchConfirmationUpdatedTime <
        businessAddressStreetUpdatedTime
    ) {
      await store.dispatch("bankAccount/sendConfirmation", {
        type: "has_confirmed_address_matches_bank_account",
        requiredData: { value: false },
      });

      checkPointExist.value = true;
      return router.push(
        "/fundability/financials/business-account/bank-account-update"
      );
    } else if (!bankAccountAddressMatchConfirmationVal) {
      checkPointExist.value = true;
      return router.push(
        "/fundability/financials/business-account/bank-account-update"
      );
    }
  }
  checkPointExist.value = true;
  return router.push("/fundability/financials/business-account");
});

onUpdated(() => {
  bankAccountLink.value = route.fullPath;
});
</script>
