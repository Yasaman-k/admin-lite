<template>
  <div
    class="flex flex-col gap-4 py-10 px-10 2xl:px-14"
    v-if="categories && categories.length"
  >
    <div
      v-for="category in categories"
      :key="category.id"
      :class="`relative ${
        !category.checked && !fundingMainPage && 'opacity-70'
      }`"
    >
      <div
        v-if="category.checked"
        class="absolute -right-20 lg:-right-48 2xl:-right-21 -left-5 -top-6 -bottom-6 pl-3 bg-gradient-to-r from-[#F0F7FB] to-white rounded-md rounded-tr-none rounded-br-none"
      ></div>
      <BaseFundingOption
        radioName="financing"
        :title="category.title"
        :desc="category.description"
        :icon="category.icon"
        :value="category.title"
        :to="category.slug"
        :checked="category.checked && !fundingMainPage"
      />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import BaseFundingOption from "../BaseFundingOption.vue";

const route = useRoute();
const store = useStore();

// Data
const fundingMainPage = ref(true);
const categories = ref([]);

// Hooks
onBeforeMount(() => {
  const fundingCategories = store.getters["funding/getFundingCategories"];
  categories.value = fundingCategories.map((cat) =>
    cat.slug === route.params.category
      ? { ...cat, checked: true }
      : { ...cat, checked: false }
  );
});

onMounted(() => {
  route.fullPath === "/funding/funding-explorer"
    ? (fundingMainPage.value = true)
    : (fundingMainPage.value = false);
});

watch(route, (newRoute) => {
  const fundingCategories = store.getters["funding/getFundingCategories"];
  categories.value = fundingCategories.map((cat) =>
    cat.slug === newRoute.params.category
      ? { ...cat, checked: true }
      : { ...cat, checked: false }
  );
  newRoute.fullPath === "/funding/funding-explorer"
    ? (fundingMainPage.value = true)
    : (fundingMainPage.value = false);
});
</script>
