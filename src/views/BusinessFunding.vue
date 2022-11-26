<template>
  <PageHeader :title="headerTitle" />
  <section class="min-h-screen overflow-hidden relative">
    <SpinnerLoader v-if="!categories.length" />
    <BusinessFundingMain v-if="categories.length" />
  </section>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import PageHeader from "../components/PageHeader.vue";
import BusinessFundingMain from "../components/business-funding/BusinessFundingMain.vue";
import SpinnerLoader from "../components/SpinnerLoader.vue";

const store = useStore();
const route = useRoute();

// Data
const categories = ref([]);
const headerTitle = ref("");

// Hooks
onBeforeMount(async () => {
  await store.dispatch("funding/fetchFundingCategories");
  categories.value = store.getters["funding/getFundingCategories"];
  const params = route.params;

  if (params.subcategory === "vendor-list" || params.list === "vendor-list") {
    return (headerTitle.value = "Funding Match");
  } else if (
    params.subcategory === "experimenter" ||
    params.list === "experimenter"
  ) {
    return (headerTitle.value = "Funding Match Experimenter");
  }
  headerTitle.value = "Business Funding";
});

watch(route, (newRoute) => {
  const params = newRoute.params;
  if (params.subcategory === "vendor-list" || params.list === "vendor-list") {
    return (headerTitle.value = "Funding Match");
  } else if (
    params.subcategory === "experimenter" ||
    params.list === "experimenter"
  ) {
    return (headerTitle.value = "Funding Match Experimenter");
  }
  headerTitle.value = "Business Funding";
});
</script>
