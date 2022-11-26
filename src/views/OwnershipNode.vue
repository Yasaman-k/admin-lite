<template>
  <div class="fixed right-0 z-30 bg-white" id="ownership-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader v-if="!checkPointExist" pageHeaderId="ownership-header" />
    <div id="ownership-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="ownership"
      :nodeLink="ownershipLink"
      pageHeaderId="ownership-header"
      pageContentId="ownership-content"
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
const ownershipLink = ref("");

// Statuses
const foundationStatuses = ref(store.getters["aspects/getFoundationStatuses"]);

onBeforeMount(async () => {
  await store.dispatch("ownership/getOwnershipsOwners");
  await store.dispatch("ownership/fetchOwnershipSosConfirmation");
  const ownerships = store.getters["ownership/getOwnershipOwners"];
  let confirmation = store.getters["ownership/getOwnershipSosConfirmation"];

  confirmation.length &&
    (confirmation =
      confirmation[0].has_confirmed_ownership_matches_secretary_of_states);
  confirmation &&
    (confirmation.value === false || confirmation.value === true) &&
    (confirmation = confirmation.value);

  // Determine Merchant Account Link
  if (ownerships.length) {
    if (confirmation === null || confirmation === undefined) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/ownership/verification");
    } else if (ownerships.length === 1 && !confirmation) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/ownership/resources");
    } else if (ownerships.length === 1 && confirmation) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/ownership/complete");
    } else if (ownerships.length > 1 && !confirmation) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/ownership/resources");
    } else if (ownerships.length > 1 && confirmation) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/ownership/complete");
    }
    checkPointExist.value = true;
    return router.push("/fundability/foundation/ownership");
  }
  checkPointExist.value = true;
  return router.push("/fundability/foundation/ownership");
});

onUpdated(() => {
  ownershipLink.value = route.fullPath;
});
</script>
