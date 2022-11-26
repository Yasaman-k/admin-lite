<template>
  <div class="fixed right-0 z-30 bg-white" id="lexisnexis-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader v-if="!checkPointExist" pageHeaderId="lexisnexis-header" />
    <div id="lexisnexis-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="lexisnexis_report"
      :nodeLink="lexisNexisLink"
      pageHeaderId="lexisnexis-header"
      pageContentId="lexisnexis-content"
      aspectTitle="Personal"
      :aspectStatuses="personalNodes"
      :aspectStatusesDb="personalStatuses"
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
import { personalNodes } from "../constants";

const store = useStore();
const router = useRouter();
const route = useRoute();
const checkPointExist = ref(false);
const lexisNexisLink = ref("");
const personalStatuses = ref(store.getters["aspects/getPersonalStatuses"]);

onBeforeMount(async () => {
  await store.dispatch("lexisNexis/fetchLexisNexisConfirmation");

  let confirmation = store.getters["lexisNexis/getLexisNexisConfirmation"];

  confirmation.length &&
  confirmation[0].has_lexisnexis_report &&
  (confirmation[0].has_lexisnexis_report.value === false ||
    confirmation[0].has_lexisnexis_report.value === true)
    ? (confirmation = confirmation[0].has_lexisnexis_report.value)
    : (confirmation = null);

  if (confirmation) {
    checkPointExist.value = true;
    return router.push("/fundability/personal/lexis-nexis/complete");
  } else if (!confirmation && confirmation != null) {
    checkPointExist.value = true;
    return router.push("/fundability/personal/lexis-nexis/resources");
  }
  checkPointExist.value = true;
  return router.push("/fundability/personal/lexis-nexis");
});

onUpdated(() => {
  lexisNexisLink.value = route.fullPath;
});
</script>
