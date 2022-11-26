<template>
  <PageHeader title="Resource Marketplace" />
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader v-if="loader" pageHeaderId="resource-header" />
    <BaseResourceMain />
  </section>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useStore } from "vuex";
import SpinnerLoader from "../components/SpinnerLoader.vue";
import PageHeader from "../components/PageHeader.vue";
import BaseResourceMain from "../components/resource-market/BaseResourceMain.vue";

const store = useStore();
const loader = ref(true);

// Hooks
onBeforeMount(async () => {
  await store.dispatch("resourceMarket/fetchResourceTypes");
  await store.dispatch("resourceMarket/fetchResourceCategories");
  const cats = store.getters["resourceMarket/getResourceCategories"];
  const types = store.getters["resourceMarket/getResourceTypes"];
  (types.length || cats.length) && (loader.value = false);
});

watch(store.state, (newState) => {
  const resourceTypes = newState.resourceMarket.resourceTypes.length;
  const resourceCats = newState.resourceMarket.resourceCategories.length;
  if (resourceTypes || resourceCats) {
    return (loader.value = false);
  }
  return (loader.value = true);
});
</script>
