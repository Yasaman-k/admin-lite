<template>
  <section
    class="bg-[#E4EEF3] !pr-0 flex justify-between h-screen overflow-hidden"
  >
    <div class="relative pt-11 pr-16 w-[40%]">
      <div class="flex flex-col gap-6 pb-5">
        <div
          v-for="(subCat, i) in subCategories"
          :key="subCat.id"
          :class="`relative ${!subCat.checked && 'mt-2'}`"
        >
          <div
            v-if="subCat.checked"
            class="absolute -right-20 lg:-right-24 xl:-right-20 2xl:-right-28 -left-4 -top-5 -bottom-5 pl-3 bg-gradient-to-r from-[#F0F7FB] to-white rounded-md rounded-tr-none rounded-br-none"
          ></div>
          <BaseFundingOption
            radioName="funding-subcategories"
            :title="subCat.title"
            :desc="subCat.description"
            :icon="subCat.icon"
            :checked="subCat.checked"
            :matched="i === 0 ? true : false"
            :to="`${currentCategory.slug}/${subCat.slug}`"
          />
        </div>
      </div>
    </div>
    <div
      class="bg-white p-6 pl-10 pr-12 flex gap-5 before:z-10 before:!left-[7rem] w-[61.6%]"
    >
      <div class="relative flex flex-col gap-2 pb-2 mt-5">
        <div
          v-for="trade in tradeVendorTiers"
          :key="trade.id"
          :class="`relative`"
        >
          <BaseFundingTierOption
            radioName="funding-tiers"
            :title="trade.title"
            :desc="trade.description"
            :to="`${currentCategory.slug}/${trade.slug}`"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeMount, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import BaseFundingOption from "../BaseFundingOption.vue";
import BaseFundingTierOption from "../BaseFundingTierOption.vue";

const route = useRoute();
const store = useStore();
const currentCategory = ref({});
const currentSubCategory = ref({});
const subCategories = ref([]);

const tradeVendorTiers = ref([
  {
    id: 1,
    title: "Trade Vendors Tier 1",
    slug: "trade-vendors-tier-1",
    description: "More accessible, but usually requires daily payments",
  },
  {
    id: 2,
    title: "Trade Vendors Tier 2",
    slug: "trade-vendors-tier-2",
    description: "More accessible, but usually requires daily payments",
  },
  {
    id: 3,
    title: "Trade Vendors Tier 3",
    slug: "trade-vendors-tier-3",
    description: "More accessible, but usually requires daily payments",
  },
  {
    id: 4,
    title: "Trade Vendors Tier 4",
    slug: "trade-vendors-tier-4",
    description: "More accessible, but usually requires daily payments",
  },
]);

// Data
defineProps({
  creditChecked: {
    type: Boolean,
    default: false,
  },
});

const categories = computed(
  () => store.getters["funding/getFundingCategories"]
);

// Hooks
onBeforeMount(() => {
  // Get current sub-categories
  const category = categories.value.find(
    (cat) => cat.slug === route.params.category
  );
  currentCategory.value = category;
  currentCategory.value && currentCategory.value["sub_categories"]
    ? (subCategories.value = currentCategory.value["sub_categories"])
    : (subCategories.value = []);
  // Get checked sub category
  subCategories.value = subCategories.value.length
    ? subCategories.value.map((subCat) =>
        subCat.slug === route.params.subcategory
          ? { ...subCat, checked: true }
          : { ...subCat, checked: false }
      )
    : [];
  // Get current sub-category
  route.params.subcategory &&
    subCategories.value.length &&
    (currentSubCategory.value = subCategories.value.find(
      (subCategory) => subCategory.slug === route.params.subcategory
    ));
});

watch(route, (newRoute) => {
  // Get current sub-category
  newRoute.params.subcategory &&
    subCategories.value.length &&
    (currentSubCategory.value = subCategories.value.find(
      (subCategory) => subCategory.slug === newRoute.params.subcategory
    ));

  // Get checked sub category
  subCategories.value = subCategories.value.length
    ? subCategories.value.map((subCat) =>
        subCat.slug === route.params.subcategory
          ? { ...subCat, checked: true }
          : { ...subCat, checked: false }
      )
    : [];
});
</script>
