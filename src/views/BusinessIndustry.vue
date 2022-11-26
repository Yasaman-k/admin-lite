<template>
  <div class="fixed right-0 z-30 bg-white" id="business-industry-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader
      v-if="!checkPointExist"
      pageHeaderId="business-industry-header"
    />
    <div id="business-industry-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="business_industry"
      :nodeLink="businessIndustryLink"
      pageHeaderId="business-industry-header"
      pageContentId="business-industry-content"
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
const businessIndustryLink = ref("");

// Statuses
const foundationStatuses = ref(store.getters["aspects/getFoundationStatuses"]);

onBeforeMount(async () => {
  await store.dispatch("businessIndustry/fetchBusinessIndustries");
  let industryObject = store.getters["businessIndustry/getBusinessIndustry"];

  if (!industryObject) {
    await store.dispatch("businessIndustry/fetchBusinessIndustry");
    industryObject = store.getters["businessIndustry/getBusinessIndustry"];
  }
  if (industryObject) {
    checkPointExist.value = true;
    return router.push(
      "/fundability/foundation/business-industry/confirmation"
    );
  }
  checkPointExist.value = true;
  return router.push("/fundability/foundation/business-industry");
});

onUpdated(() => {
  businessIndustryLink.value = route.fullPath;
});
</script>
