<template>
  <div class="fixed right-0 z-30 bg-white" id="ein-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader v-if="!checkPointExist" pageHeaderId="ein-header" />
    <div id="ein-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="ein"
      :nodeLink="EINLink"
      pageHeaderId="ein-header"
      pageContentId="ein-content"
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
const EINLink = ref("");
const foundationStatuses = ref(store.getters["aspects/getFoundationStatuses"]);

onBeforeMount(async () => {
  //fetch screen content of all pages
  try {
    const pages = {
      0: "foundation/ein",
      1: "foundation/ein/resources",
      2: "foundation/ein/ein-form",
      3: "foundation/ein/ein-match",
      4: "foundation/ein/ein-discrepancy-solutions",
      5: "foundation/ein/ein-update",
      6: "foundation/ein/ein-check",
      7: "foundation/ein/ein-form-confirm",
    };
    await store.dispatch("aspectScreen/fetchAspectScreen", pages, "pages");
  } catch (error) {
    console.log("error", error);
  }

  //eoc
  await store.dispatch("ein/fetchConfirmations");
  await store.dispatch("ein/fetchEINFields");
  const fields = store.getters["ein/getEINFields"];
  const confirmations = store.getters["ein/getConfirmations"];

  if (fields.length) {
    let EINConfirmation =
      confirmations.length &&
      confirmations.filter((field) => {
        return Object.keys(field)[0] === "has_ein";
      })[0];
    let EINMatchConfirmation =
      confirmations.length &&
      confirmations.filter((field) => {
        return Object.keys(field)[0] === "has_confirmed_address_matches_irs";
      })[0];
    let businessAddressStreet = fields.filter((field) => {
      return Object.keys(field)[0] === "business_address_street";
    })[0];

    // Check if EIN Confirmation != undefined
    EINConfirmation = EINConfirmation.has_ein;
    EINConfirmation &&
      (EINConfirmation.value === false || EINConfirmation.value === true) &&
      (EINConfirmation = EINConfirmation.value);

    // Check if EIN Address Match Confirmation != undefined
    let EINMatchConfirmationVal =
      EINMatchConfirmation.has_confirmed_address_matches_irs;
    EINMatchConfirmationVal &&
      (EINMatchConfirmationVal.value === false ||
        EINMatchConfirmationVal.value === true) &&
      (EINMatchConfirmationVal = EINMatchConfirmationVal.value);

    // Check EIN Match Confirmation Updated Time
    let EINMatchConfirmationUpdatedTime;
    EINMatchConfirmation &&
      EINMatchConfirmation.has_confirmed_address_matches_irs &&
      (EINMatchConfirmationUpdatedTime =
        EINMatchConfirmation.has_confirmed_address_matches_irs.updated_at);

    // Check Business Address Street Updated Time
    let businessAddressStreetUpdatedTime;
    businessAddressStreet &&
      (businessAddressStreetUpdatedTime =
        businessAddressStreet.business_address_street.updated_at);

    // Determine Merchant Account Link
    if (EINConfirmation === null || EINConfirmation === undefined) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/ein");
    } else if (
      EINConfirmation &&
      EINMatchConfirmationVal &&
      EINMatchConfirmationUpdatedTime > businessAddressStreetUpdatedTime
    ) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/ein/ein-form-confirm");
    } else if (
      EINConfirmation &&
      EINMatchConfirmationVal &&
      EINMatchConfirmationUpdatedTime < businessAddressStreetUpdatedTime
    ) {
      await store.dispatch("ein/sendConfirmation", {
        type: "has_confirmed_address_matches_irs",
        requiredData: { value: false },
      });
      checkPointExist.value = true;
      return router.push(
        "/fundability/foundation/ein/ein-discrepancy-solutions"
      );
    } else if (EINConfirmation && !EINMatchConfirmationVal) {
      checkPointExist.value = true;
      return router.push(
        "/fundability/foundation/ein/ein-discrepancy-solutions"
      );
    } else if (!EINConfirmation) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/ein/resources");
    }
    checkPointExist.value = true;
    return router.push("/fundability/foundation/ein");
  }
  checkPointExist.value = true;
  return router.push("/fundability/foundation/ein");
});

onUpdated(() => {
  EINLink.value = route.fullPath;
});
</script>
