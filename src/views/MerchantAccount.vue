<template>
  <div class="fixed right-0 z-30 bg-white" id="merchant-account-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader
      v-if="!checkPointExist"
      pageHeaderId="merchant-account-header"
    />
    <div id="merchant-account-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="merchant_account"
      :nodeLink="merchantAccountLink"
      pageHeaderId="merchant-account-header"
      pageContentId="merchant-account-content"
      aspectTitle="Foundation"
      :aspectStatuses="foundationNodes"
      :aspectStatusesDb="foundationStatuses"
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
import { foundationNodes } from "../constants";

const store = useStore();
const router = useRouter();
const route = useRoute();
const checkPointExist = ref(false);
const merchantAccountLink = ref("");

// Statuses
const foundationStatuses = ref(store.getters["aspects/getFoundationStatuses"]);

onBeforeMount(async () => {
  await store.dispatch("merchantAccount/fetchConfirmations");
  await store.dispatch("merchantAccount/fetchMerchantAccountFields");
  const fields = store.getters["merchantAccount/getMerchantAccountFields"];
  const confirmations = store.getters["merchantAccount/getConfirmations"];

  if (fields.length) {
    let merchantAccountConfirmation =
      confirmations.length &&
      confirmations.filter((field) => {
        return Object.keys(field)[0] === "has_merchant_account";
      })[0];
    let merchantAccountAddressMatchConfirmation =
      confirmations.length &&
      confirmations.filter((field) => {
        return (
          Object.keys(field)[0] ===
          "has_confirmed_address_matches_merchant_account"
        );
      })[0];

    let businessAddressStreet = fields.filter((field) => {
      return Object.keys(field)[0] === "business_address_street";
    })[0];

    // Check if Merchant Account Confirmation != undefined
    merchantAccountConfirmation =
      merchantAccountConfirmation.has_merchant_account;
    merchantAccountConfirmation &&
      (merchantAccountConfirmation.value === false ||
        merchantAccountConfirmation.value === true) &&
      (merchantAccountConfirmation = merchantAccountConfirmation.value);
    // Check if Merchant Account Address Match Confirmation != undefined
    let merchantAccountAddressMatchConfirmationVal =
      merchantAccountAddressMatchConfirmation.has_confirmed_address_matches_merchant_account;

    merchantAccountAddressMatchConfirmationVal &&
      (merchantAccountAddressMatchConfirmationVal.value === false ||
        merchantAccountAddressMatchConfirmationVal.value === true) &&
      (merchantAccountAddressMatchConfirmationVal =
        merchantAccountAddressMatchConfirmationVal.value);

    // Check Merchant Account Match Confirmation Updated Time
    let merchantAccountAddressMatchConfirmationUpdatedTime;
    merchantAccountAddressMatchConfirmation.has_confirmed_address_matches_merchant_account &&
      (merchantAccountAddressMatchConfirmationUpdatedTime =
        merchantAccountAddressMatchConfirmation
          .has_confirmed_address_matches_merchant_account.updated_at);

    // Check Business Address Street Updated Time
    let businessAddressStreetUpdatedTime;
    businessAddressStreet &&
      (businessAddressStreetUpdatedTime =
        businessAddressStreet.business_address_street.updated_at);

    // Determine Merchant Account Link
    if (
      merchantAccountConfirmation === null ||
      merchantAccountConfirmation === undefined
    ) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/merchant-account");
    } else if (
      merchantAccountConfirmation &&
      merchantAccountAddressMatchConfirmationVal &&
      merchantAccountAddressMatchConfirmationUpdatedTime >
        businessAddressStreetUpdatedTime
    ) {
      checkPointExist.value = true;
      return router.push(
        "/fundability/foundation/merchant-account/merchant-account-form-confirm"
      );
    } else if (
      merchantAccountConfirmation &&
      merchantAccountAddressMatchConfirmationVal &&
      merchantAccountAddressMatchConfirmationUpdatedTime <
        businessAddressStreetUpdatedTime
    ) {
      await store.dispatch("merchantAccount/sendConfirmation", {
        type: "has_confirmed_address_matches_merchant_account",
        requiredData: { value: false },
      });
      checkPointExist.value = true;
      return router.push(
        "/fundability/foundation/merchant-account/merchant-account-update"
      );
    } else if (
      merchantAccountConfirmation &&
      !merchantAccountAddressMatchConfirmationVal
    ) {
      checkPointExist.value = true;
      return router.push(
        "/fundability/foundation/merchant-account/merchant-account-update"
      );
    } else if (!merchantAccountConfirmation) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/merchant-account/not-needed");
    }
  }
  checkPointExist.value = true;
  return router.push("/fundability/foundation/merchant-account");
});

onUpdated(() => {
  merchantAccountLink.value = route.fullPath;
});
</script>
