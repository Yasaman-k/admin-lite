<template>
  <div class="fixed right-0 z-30 bg-white" id="personal-score-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader
      v-if="!checkPointExist"
      pageHeaderId="personal-score-header"
    />
    <div id="personal-score-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="credit_score"
      :nodeLink="personalScoreLink"
      pageHeaderId="personal-score-header"
      pageContentId="personal-score-content"
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
const personalScoreLink = ref("");
const personalStatuses = ref(store.getters["aspects/getPersonalStatuses"]);

onBeforeMount(async () => {
  await store.dispatch("creditScore/fetchCreditScore");

  let creditScore = store.getters["creditScore/getCreditScore"];
  if (creditScore.length) {
    checkPointExist.value = true;
    return router.push("/fundability/personal/personal-credit-score/complete");
  }

  checkPointExist.value = true;
  return router.push("/fundability/personal/personal-credit-score");
});

onUpdated(() => {
  personalScoreLink.value = route.fullPath;
});
</script>
