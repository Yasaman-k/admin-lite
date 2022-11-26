<template>
  <div class="fixed right-0 z-30 bg-white" id="credit-report-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader
      v-if="!checkPointExist"
      pageHeaderId="credit-report-header"
    />
    <div id="credit-report-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="credit_report"
      :nodeLink="creditReport"
      pageHeaderId="credit-report-header"
      pageContentId="credit-report-content"
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
const creditReport = ref("");
const personalStatuses = ref(store.getters["aspects/getPersonalStatuses"]);

onBeforeMount(async () => {
  await store.dispatch("creditReport/fetchCreditReportConfirmation");

  let confirmation = store.getters["creditReport/getCreditReportConfirmation"];

  confirmation.length &&
  confirmation[0].has_personal_credit_report &&
  (confirmation[0].has_personal_credit_report.value === false ||
    confirmation[0].has_personal_credit_report.value === true)
    ? (confirmation = confirmation[0].has_personal_credit_report.value)
    : (confirmation = null);

  if (confirmation) {
    checkPointExist.value = true;
    return router.push("/fundability/personal/credit-report/complete");
  } else if (!confirmation && confirmation != null) {
    checkPointExist.value = true;
    return router.push("/fundability/personal/credit-report/resources");
  }
  checkPointExist.value = true;
  return router.push("/fundability/personal/credit-report");
});

onUpdated(() => {
  creditReport.value = route.fullPath;
});
</script>
