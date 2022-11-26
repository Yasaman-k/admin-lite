<template>
  <div class="fixed right-0 z-30 bg-white" id="bankruptcy-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader v-if="!checkPointExist" pageHeaderId="bankruptcy-header" />
    <div id="bankruptcy-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="derogatory_remarks"
      :nodeLink="bankruptcyLink"
      pageHeaderId="bankruptcy-header"
      pageContentId="bankruptcy-content"
      aspectTitle="Personal"
      :aspectStatuses="personalNodes"
      :aspectStatusesDb="personalStatuses"
    >
    </base-foundation-right-bar>
  </section>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
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
const bankruptcyLink = ref("");
const personalStatuses = ref(store.getters["aspects/getPersonalStatuses"]);

onMounted(async () => {
  await store.dispatch("bankruptcy/fetchDerogatoryConfirmation");

  await store.dispatch("bankruptcy/fetchDerogatoryRemarks");

  const status = personalStatuses.value.find((item) =>
    Object.prototype.hasOwnProperty.call(item, "derogatory_remarks")
  );

  if (
    status["derogatory_remarks"].toLowerCase() === "positive" ||
    status["derogatory_remarks"].toLowerCase() === "caution"
  ) {
    checkPointExist.value = true;
    return router.push("/fundability/personal/bankruptcy/complete");
  }

  let confirmation = store.getters["bankruptcy/getDerogatoryConfirmation"];
  confirmation &&
  confirmation.length &&
  confirmation[0].has_derogatory_remarks &&
  (confirmation[0].has_derogatory_remarks.value === false ||
    confirmation[0].has_derogatory_remarks.value === true)
    ? (confirmation = confirmation[0].has_derogatory_remarks.value)
    : (confirmation = null);

  if (confirmation != null && confirmation === true) {
    checkPointExist.value = true;
    return router.push("/fundability/personal/bankruptcy/owners-credit-report");
  } else if (confirmation != null && confirmation === false) {
    checkPointExist.value = true;
    return router.push("/fundability/personal/bankruptcy/complete");
  } else {
    checkPointExist.value = true;
    return router.push("/fundability/personal/bankruptcy");
  }
});

onUpdated(() => {
  bankruptcyLink.value = route.fullPath;
});
</script>
