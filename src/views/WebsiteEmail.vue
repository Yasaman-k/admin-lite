<template>
  <div class="fixed right-0 z-30 bg-white" id="website-email-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader
      v-if="!checkPointExist"
      pageHeaderId="website-email-header"
    />
    <div id="website-email-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="website_and_email"
      :nodeLink="websiteEmailLink"
      pageHeaderId="website-email-header"
      pageContentId="website-email-content"
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
const websiteEmailLink = ref("");

// Statuses
const foundationStatuses = ref(store.getters["aspects/getFoundationStatuses"]);

onBeforeMount(async () => {
  await store.dispatch("websiteEmail/fetchWebsiteEmailConfirmation");
  await store.dispatch("websiteEmail/fetchWebsiteEmailFields");

  // Get Website & Email Checkpoint
  const websiteEmailFields =
    store.getters["websiteEmail/getWebsiteEmailFields"];
  const confirmation =
    store.getters["websiteEmail/getWebsiteEmailConfirmation"];

  let websiteEmailConfirmation =
    confirmation &&
    confirmation.length &&
    confirmation[0].has_website_and_email;

  websiteEmailConfirmation &&
  (websiteEmailConfirmation.value === false ||
    websiteEmailConfirmation.value === true)
    ? (websiteEmailConfirmation = websiteEmailConfirmation.value)
    : (websiteEmailConfirmation = null);

  if (websiteEmailFields.length) {
    let businessWebsite = websiteEmailFields.filter((field) => {
      return Object.keys(field)[0] === "business_website";
    })[0];
    // Check if Website != undefined
    businessWebsite &&
      (businessWebsite = businessWebsite.business_website.data);

    let businessEmail = websiteEmailFields.filter((field) => {
      return Object.keys(field)[0] === "business_email";
    })[0];
    // Check if Email != undefined
    businessEmail && (businessEmail = businessEmail.business_email.data);

    // Determine Website && Email Link
    if (
      websiteEmailConfirmation === null ||
      websiteEmailConfirmation === undefined
    ) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/website-email");
    } else if (
      websiteEmailConfirmation &&
      (businessWebsite === null || businessEmail === null)
    ) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/website-email/website-form");
    } else if (
      websiteEmailConfirmation &&
      businessWebsite != null &&
      businessEmail != null
    ) {
      checkPointExist.value = true;
      return router.push(
        "/fundability/foundation/website-email/website-form-confirm"
      );
    } else if (!websiteEmailConfirmation) {
      checkPointExist.value = true;
      return router.push("/fundability/foundation/website-email/resources");
    }
  }
  checkPointExist.value = true;
  return router.push("/fundability/foundation/website-email");
});

onUpdated(() => {
  websiteEmailLink.value = route.fullPath;
});
</script>
