<template>
  <div
    class="bg-white p-6 px-20 flex gap-5 tab-connection before:z-10 before:!left-9"
  >
    <div class="cards-icon text-[#196499]">
      <component :is="`Icon${currentCat.icon}`" />
    </div>
    <div class="flex flex-col gap-2 pb-2 mt-5">
      <h1
        class="text-[#196499] text-[23px] font-semibold"
        v-if="currentCat.title"
      >
        {{ currentCat.title }}
      </h1>
      <div class="flex flex-col justify-center gap-10 mt-3">
        <div
          v-for="(subCat, i) in subCats"
          :key="subCat.id"
          :class="`${!subCat.checked && !categoriesPage && 'opacity-70'}`"
        >
          <BaseFundingOption
            radioName="business-credit-financing"
            :title="subCat.title"
            :desc="subCat.description"
            :icon="subCat.icon"
            :matched="i === 0 ? true : false"
            :to="`${currentCat.slug}/${subCat.slug}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import BaseFundingOption from "../BaseFundingOption.vue";

const route = useRoute();
const store = useStore();

// Data
const categoriesPage = ref(true);
const categories = ref([]);
const currentCat = ref({});
const subCats = ref([]);

// Hooks
onBeforeMount(() => {
  categories.value = store.getters["funding/getFundingCategories"];
  const currentSubCatSlug = route.params.subcategory
    ? route.params.subcategory
    : "";
  const currentCatSlug = route.params.category ? route.params.category : "";
  const category = categories.value.find((cat) => cat.slug === currentCatSlug);
  currentCat.value = category;

  currentCat.value &&
    currentCat.value["sub_categories"] &&
    (subCats.value = currentCat.value["sub_categories"]);

  !currentCatSlug.length &&
    currentSubCatSlug.length &&
    (categoriesPage.value = false);
});

watch(route, (newRoute) => {
  const currentSubCatSlug = newRoute.params.subcategory
    ? newRoute.params.subcategory
    : "";
  const currentCatSlug = newRoute.params.category
    ? newRoute.params.category
    : "";
  currentCatSlug && currentCatSlug.length
    ? (currentCat.value = categories.value.find(
        (cat) => cat.slug === currentCatSlug
      ))
    : (currentCat.value = {});

  currentCat.value && currentCat.value["sub_categories"]
    ? (subCats.value = currentCat.value["sub_categories"])
    : (subCats.value = []);

  if (!currentCatSlug.length && currentSubCatSlug.length) {
    return (categoriesPage.value = false);
  }
  return (categoriesPage.value = true);
});
</script>

<style scoped>
.cards-icon {
  @apply w-[50px] h-[50px] z-10 rounded-full shadow-lg shadow-[#00000025] bg-white flex items-center justify-center absolute left-3 top-4;
}
</style>
