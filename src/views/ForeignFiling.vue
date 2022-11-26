<template>
  <div class="fixed right-0 z-30 bg-white" id="foreign-filing-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader
      v-if="!checkPointExist"
      pageHeaderId="foreign-filing-header"
    />
    <div id="foreign-filing-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="foreign_filing"
      :nodeLink="foreignLink"
      pageHeaderId="foreign-filing-header"
      pageContentId="foreign-filing-content"
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

// Statuses
const foundationStatuses = ref(store.getters["aspects/getFoundationStatuses"]);

const checkPointExist = ref(false);
const foreignLink = ref("");

onBeforeMount(async () => {
  await store.dispatch("foreignFiling/fetchForeignFilingFields");
  await store.dispatch("foreignFiling/fetchConfirmation");
  const fields = store.getters["foreignFiling/getForeignFilingFields"];
  const confirmation =
    store.getters["foreignFiling/getForeignFilingConfirmation"];

  let foreignFilingConfirmation = confirmation.length && confirmation[0];

  // Check if foreignFilingConfirmation != undefined
  foreignFilingConfirmation &&
    (foreignFilingConfirmation = foreignFilingConfirmation.has_foreign_filed);

  foreignFilingConfirmation &&
    (foreignFilingConfirmation.value === false ||
      foreignFilingConfirmation.value === true) &&
    (foreignFilingConfirmation = foreignFilingConfirmation.value);

  if (fields.length) {
    let businessAddressState = fields.filter((field) => {
      return Object.keys(field)[0] === "business_address_state";
    })[0];
    let businessStateIncorporated = fields.filter((field) => {
      return Object.keys(field)[0] === "business_state_incorporated";
    })[0];

    // Check if Business Address State != undefined
    businessAddressState &&
      (businessAddressState = businessAddressState.business_address_state.data);

    // Check if Business State Incorporated != undefined
    businessStateIncorporated &&
      (businessStateIncorporated =
        businessStateIncorporated.business_state_incorporated.data);
    // Determine Foreign Filing Link
    if (businessAddressState === businessStateIncorporated) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/foreign-filing/not-needed");
    } else if (
      !foreignFilingConfirmation &&
      foreignFilingConfirmation != null &&
      foreignFilingConfirmation != undefined
    ) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/foreign-filing/resources");
    } else if (foreignFilingConfirmation) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/foreign-filing/filing-done");
    }
  }
  checkPointExist.value = true;
  return router.push("/fundability/foundation/foreign-filing");
});

onUpdated(() => {
  foreignLink.value = route.fullPath;
});
</script>
