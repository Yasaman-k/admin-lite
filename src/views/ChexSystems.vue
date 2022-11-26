<template>
  <div class="fixed right-0 z-30 bg-white" id="chex-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader v-if="!checkPointExist" pageHeaderId="chex-header" />
    <div id="chex-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="chex_report"
      :nodeLink="chexSystemsLink"
      pageHeaderId="chex-header"
      pageContentId="chex-content"
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
const chexSystemsLink = ref("");
const personalStatuses = ref(store.getters["aspects/getPersonalStatuses"]);

onBeforeMount(async () => {
  await store.dispatch("chexSystems/fetchChexConfirmation");

  let confirmation = store.getters["chexSystems/getChexConfirmation"];
  confirmation.length &&
  confirmation[0].has_chex_report &&
  (confirmation[0].has_chex_report.value === false ||
    confirmation[0].has_chex_report.value === true)
    ? (confirmation = confirmation[0].has_chex_report.value)
    : (confirmation = null);

  if (confirmation) {
    checkPointExist.value = true;
    return router.push("/fundability/personal/chex-systems/complete");
  } else if (!confirmation && confirmation != null) {
    checkPointExist.value = true;
    return router.push("/fundability/personal/chex-systems/resources");
  }
  checkPointExist.value = true;
  return router.push("/fundability/personal/chex-systems");
});

onUpdated(() => {
  chexSystemsLink.value = route.fullPath;
});
</script>
