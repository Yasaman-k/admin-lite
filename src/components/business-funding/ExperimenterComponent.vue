<template>
  <section class="relative bg-white">
    <SpinnerLoader v-if="loading" />
    <FilterCarousel :filterItems="filterItems" />
    <div class="flex justify-between h-full">
      <div class="p-5 w-[60%]">
        <div ref="contentText">
          <p class="text-sunglow-blue text-xl font-semibold">
            You are matched for {{ count }} of {{ totalCount }} Providers of
            {{ catOrSubCat }}.
            <br />
            Use the toggles below to see what aspects would increase your
            matches.
          </p>
          <p class="mt-5 pr-8 text-lg">
            Most Funding Providers have minimum criteria in more than one
            Fundability Aspect. First toggle one at a time to see if any one
            factor would increase matches. Then try different combinations.
          </p>
        </div>
        <ExperimenterAspectsTable
          :tableHeight="`${experimenterTableHeight}px`"
        />
      </div>
      <div ref="scoreSidebar">
        <BaseScoreSidebar
          approvedFunding="58,000"
          :listedAccounts="7"
          :scoreLoaders="scoreLoaders"
          extraClasses="!w-full"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import BaseScoreSidebar from "../BaseScoreSidebar.vue";
import FilterCarousel from "./FilterCarousel.vue";
import SpinnerLoader from "../SpinnerLoader.vue";
import ExperimenterAspectsTable from "./ExperimenterAspectsTable.vue";

const props = defineProps({
  filterItems: {
    type: Array,
    default: () => [],
  },
});

const store = useStore();
const route = useRoute();
// Refs
const contentText = ref(null);
const scoreSidebar = ref(null);
// Data
const loading = ref(true);
const count = ref("0");
const totalCount = ref("");
const catOrSubCat = ref("");
const experimenterTableHeight = ref("500");
const scoreLoaders = ref([
  {
    title: "Equifax",
    currentScore: "2",
    totalScore: "3",
    scorePercent: "",
    color: "#FFBE24",
  },
  {
    title: "Experian",
    currentScore: "3",
    totalScore: "3",
    scorePercent: "",
    color: "#0CAE87",
  },
  {
    title: "DnB",
    currentScore: "1",
    totalScore: "3",
    scorePercent: "",
    color: "#FFBE24",
  },
  {
    title: "Revenue",
    currentScore: "",
    totalScore: "",
    scorePercent: "11%",
    color: "#0CAE87",
  },
]);

//  Hooks
onBeforeMount(async () => {
  const catSlug = route.params.category;
  const subCatSlug = route.params.subcategory;

  // Get Count and Category or sub-category name
  if (catSlug || subCatSlug) {
    const slug =
      subCatSlug && subCatSlug != "experimenter" && subCatSlug != "vendor-list"
        ? subCatSlug
        : catSlug;

    // Fetch Funding Providers
    await store.dispatch("funding/fetchFundingProviders", slug);
    const providers = store.getters["funding/getVendors"];
    count.value = providers.length;

    // Fetch Total Count
    await store.dispatch("funding/fetchTotalVendorsCount", slug);
    totalCount.value = store.getters["funding/getTotalVendorsCount"];
    const item = props.filterItems.find((item) => slug === item.slug);
    catOrSubCat.value = item ? item.title : "";
  }
  loading.value = false;
});

onMounted(() => {
  experimenterTableHeight.value =
    scoreSidebar.value.innerHeight - contentText.value.innerHeight;
});

watch(route, async (newRoute) => {
  const catSlug = newRoute.params.category;
  const subCatSlug = newRoute.params.subcategory;
  // Get Count and Category or sub-category name
  if (catSlug || subCatSlug) {
    const slug =
      subCatSlug && subCatSlug != "experimenter" && subCatSlug != "vendor-list"
        ? subCatSlug
        : catSlug;

    // Fetch Funding Providers
    await store.dispatch("funding/fetchFundingProviders", slug);
    const providers = store.getters["funding/getVendors"];
    count.value = providers.length;

    await store.dispatch("funding/fetchTotalVendorsCount", slug);
    totalCount.value = store.getters["funding/getTotalVendorsCount"];
    const item = props.filterItems.find((item) => slug === item.slug);
    catOrSubCat.value = item ? item.title : "";
  }
});
</script>
