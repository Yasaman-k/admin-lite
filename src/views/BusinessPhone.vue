<template>
  <div class="fixed right-0 z-30 bg-white" id="business-phone-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader
      v-if="!checkPointExist"
      pageHeaderId="business-phone-header"
    />
    <div id="business-phone-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="business_phone"
      :nodeLink="businessPhoneLink"
      pageHeaderId="business-phone-header"
      pageContentId="business-phone-content"
      aspectTitle="Foundation"
      :aspectStatuses="foundationNodes"
      :aspectStatusesDb="foundationStatuses"
    >
    </base-foundation-right-bar>
  </section>
</template>

<script setup>
import { onBeforeMount, onUpdated, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import SpinnerLoader from "../components/SpinnerLoader.vue";
import PageHeader from "../components/PageHeader.vue";
import BaseFoundationRightBar from "../components/BaseFoundationRightBar.vue";
import { foundationNodes } from "../constants";

const store = useStore();
const router = useRouter();
const route = useRoute();
const checkPointExist = ref(false);
const businessPhoneLink = ref("");
// Statuses
const foundationStatuses = ref(store.getters["aspects/getFoundationStatuses"]);


onBeforeMount(async () => {
  await store.dispatch("businessPhone/fetchBusinessPhoneConfirmation");
  await store.dispatch("businessPhone/fetchBusinessPhoneFields");

  // Get Business Phone Checkpoint
  const businessPhoneFields =
    store.getters["businessPhone/getBusinessPhoneFields"];
  const confirmation =
    store.getters["businessPhone/getBusinessPhoneConfirmation"];

  let businessPhoneConfirmation =
    confirmation && confirmation.length && confirmation[0].has_business_phone;

  // Check if Business Phone Confirmation != undefined
  businessPhoneConfirmation &&
  (businessPhoneConfirmation.value === false ||
    businessPhoneConfirmation.value === true)
    ? (businessPhoneConfirmation = businessPhoneConfirmation.value)
    : (businessPhoneConfirmation = null);

  if (businessPhoneFields.length) {
    let businessPhone = businessPhoneFields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "business_phone")
    );
    // Check if Business Phone != undefined
    businessPhone && (businessPhone = businessPhone.business_phone.data);

    let businessPhoneProvider = businessPhoneFields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "business_phone_provider")
    );
    // Check if Business Phone Provider != undefined
    businessPhoneProvider &&
      (businessPhoneProvider =
        businessPhoneProvider.business_phone_provider.data);

    // Determine Business Phone Link
    if (
      businessPhoneConfirmation === null ||
      businessPhoneConfirmation === undefined
    ) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/business-phone");
    } else if (
      businessPhoneConfirmation &&
      (businessPhone === null || businessPhoneProvider === null)
    ) {
      checkPointExist.value = true;
      return router.push(
        "/fundability/foundation/business-phone/business-phone-form"
      );
    } else if (
      businessPhoneConfirmation &&
      businessPhone != null &&
      businessPhoneProvider != null
    ) {
      checkPointExist.value = true;
      return router.push(
        "/fundability/foundation/business-phone/business-phone-form-confirm"
      );
    } else if (!businessPhoneConfirmation) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/business-phone/resources");
    }
  }
  checkPointExist.value = true;
  return router.push("/fundability/foundation/business-phone");
});

onUpdated(() => {
  businessPhoneLink.value = route.fullPath;
});
</script>
