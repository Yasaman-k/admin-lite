<template>
  <div class="fixed right-0 z-30 bg-white" id="entity-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader v-if="!checkPointExist" pageHeaderId="entity-header" />
    <div id="entity-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="entity"
      :nodeLink="entityLink"
      pageHeaderId="entity-header"
      pageContentId="entity-content"
      aspectTitle="Foundation"
      :aspectStatuses="foundationNodes"
      :aspectStatusesDb="foundationStatuses"
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
import { foundationNodes } from "../constants";

const store = useStore();
const router = useRouter();
const route = useRoute();
const checkPointExist = ref(false);
const entityLink = ref("");
const entityType = ref("");

// Statuses
const foundationStatuses = ref(store.getters["aspects/getFoundationStatuses"]);

onBeforeMount(async () => {
  await store.dispatch("entity/fetchEntityFields");
  await store.dispatch("entity/fetchMatchConfirmation");
  await store.dispatch("entity/fetchIndustryOptions");

  const entityFields = store.getters["entity/getEntityFields"];
  const matchFields = store.getters["entity/getMatchFields"];
  const matchConfirmation = store.getters["entity/getMatchConfirmation"];

  // Check if Entity Address Match Confirmation != undefined
  let entityMatchConfirmationVal;
  matchConfirmation &&
    matchConfirmation.length &&
    matchConfirmation[0].has_confirmed_address_matches_secretary_of_states &&
    (entityMatchConfirmationVal =
      matchConfirmation[0].has_confirmed_address_matches_secretary_of_states
        .value);

  // Check Entity Match Confirmation Updated Time
  let entityMatchConfirmationUpdatedTime;
  matchConfirmation &&
    matchConfirmation.length &&
    matchConfirmation[0].has_confirmed_address_matches_secretary_of_states &&
    (entityMatchConfirmationUpdatedTime =
      matchConfirmation[0].has_confirmed_address_matches_secretary_of_states
        .updated_at);

  if (entityFields.length) {
    // Set Entity Type
    const newEntityType = entityFields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "entity_type")
    );

    newEntityType && newEntityType.entity_type && newEntityType.entity_type.data
      ? (entityType.value = newEntityType.entity_type.data.const)
      : (entityType.value = "");

    let businessAddressStreet = matchFields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "business_address_street")
    );

    // Check Business Address Street Updated Time
    let businessAddressStreetUpdatedTime;
    businessAddressStreet &&
      (businessAddressStreetUpdatedTime =
        businessAddressStreet.business_address_street.updated_at);

    // Determine Merchant Account Link
    if (entityType.value === "Sole Proprietor") {
      checkPointExist.value = true;
      return router.push(
        "/fundability/foundation/business-entity/sole-proprietor"
      );
    } else if (
      entityMatchConfirmationVal === null ||
      entityMatchConfirmationVal === undefined
    ) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/business-entity");
    } else if (
      entityMatchConfirmationVal &&
      entityMatchConfirmationUpdatedTime > businessAddressStreetUpdatedTime
    ) {
      checkPointExist.value = true;
      return router.push(
        "/fundability/foundation/business-entity/entity-form-confirm"
      );
    } else if (
      entityMatchConfirmationVal &&
      entityMatchConfirmationUpdatedTime < businessAddressStreetUpdatedTime
    ) {
      await store.dispatch("entity/sendMatchConfirmation", {
        type: "has_confirmed_address_matches_secretary_of_states",
        requiredData: { value: false },
      });
      checkPointExist.value = true;
      return router.push(
        "/fundability/foundation/business-entity/update-match"
      );
    } else if (!entityMatchConfirmationVal) {
      checkPointExist.value = true;
      return router.push(
        "/fundability/foundation/business-entity/entity-discrepancy-solutions"
      );
    }
    checkPointExist.value = true;
    return router.push("/fundability/foundation/business-entity");
  }
  checkPointExist.value = true;
  return router.push("/fundability/foundation/business-entity");
});

watch(route, (newRoute) => (entityLink.value = newRoute.fullPath));
</script>
