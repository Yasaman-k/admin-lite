<template>
  <section
    ref="container"
    :class="[
      'relative flex overflow-hidden px-0 mx-0',
      {
        'bg-[#E4EEF3] min-w-full justify-between': !mainFundingPage,
      },
    ]"
    :style="`min-height: ${pageHeight}px`"
  >
    <TransitionGroup name="fade">
      <!-- Main Funding Page (Main Description and Categories) -->
      <div class="flex gap-16 justify-between" v-if="mainFundingPage">
        <div class="pt-5 px-5">
          <BusinessFundingDescription />
        </div>
        <div class="h-full bg-[#E4EEF3] pt-5" ref="cards">
          <BusinessFundingCategories />
        </div>
      </div>
      <!-- Start Categories and Sub Categories -->
      <div
        class="w-full"
        v-if="categoriesDetailsPage"
        :style="`min-height: ${pageHeight}px`"
      >
        <div class="h-full pt-11 pr-12 pl-6 w-2/4 absolute" ref="cards">
          <BusinessFundingCategories class="gap-10" />
        </div>
        <div class="w-2/4 bg-white float-right h-full">
          <BusinessFundingSubCategory />
        </div>
      </div>
      <!-- Start Sub-Category and Sub-Category Tier Page -->
      <div class="min-h-full" ref="catTiers" v-if="subCategoryTiersPage">
        <BusinessSubCategoryTier />
      </div>
      <!-- Start Sub-Category and Sub-Category Details Page -->
      <div class="min-h-full" ref="catDetails" v-if="subCategoryDetailsPage">
        <BusinessSubCategoryDetails />
      </div>
      <!-- Start Sub-Category and Tier Details Page -->
      <div class="min-h-full" ref="tierDetails" v-if="tierDetailsPage">
        <BusinessTierDetails />
      </div>
      <!-- Start Vendor List -->
      <div
        v-if="vendorListPage"
        class="min-h-full vendor-w"
        ref="vendorList"
        :style="`min-height: ${pageHeight}px`"
      >
        <BusinessFundingVendorList />
      </div>
    </TransitionGroup>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import BusinessFundingSubCategory from "./BusinessFundingSubCategory.vue";
import BusinessSubCategoryDetails from "./BusinessSubCategoryDetails.vue";
import BusinessTierDetails from "./BusinessTierDetails.vue";
import BusinessFundingDescription from "./BusinessFundingDescription.vue";
import BusinessFundingVendorList from "./BusinessFundingVendorList.vue";
import BusinessFundingCategories from "./BusinessFundingCategories.vue";

const route = useRoute();

// Refs
const container = ref(null);

// Data
const mainFundingPage = ref(false);
const categoriesDetailsPage = ref(false);
const subCategoryDetailsPage = ref(false);
const tierDetailsPage = ref(false);
const subCategoryTiersPage = ref(false);
const vendorListPage = ref(false);
const pageHeight = ref("");
const subCatWidth = ref(0);

// Methods
const handleWindowResizing = () => (pageHeight.value = window.innerHeight);

// Hooks
onMounted(() => {
  // Determine Height and Width
  pageHeight.value = window.innerHeight;
  subCatWidth.value = container.value.clientWidth / 2;

  // Determine Page
  const categorySlug = route.params.category ? route.params.category : "";
  const subcategorySlug = route.params.subcategory
    ? route.params.subcategory
    : "";

  if (!categorySlug.length) {
    mainFundingPage.value = true;
  } else if (categorySlug.length && !subcategorySlug.length) {
    mainFundingPage.value = false;
    categoriesDetailsPage.value = true;
    subCategoryTiersPage.value = false
  } else if (
    subcategorySlug.length &&
    subcategorySlug != "vendor-list" &&
    subcategorySlug != "experimenter" &&
    route.params.list &&
    !route.params.list.length
  ) {
    mainFundingPage.value = false;
    categoriesDetailsPage.value = false;
    subCategoryDetailsPage.value = true;
    tierDetailsPage.value = false
  } else if (
    route.params.list.length ||
    subcategorySlug === "vendor-list" ||
    subcategorySlug === "experimenter"
  ) {
    mainFundingPage.value = false;
    categoriesDetailsPage.value = false;
    subCategoryDetailsPage.value = false;
    tierDetailsPage.value = false
    subCategoryTiersPage.value = false
    vendorListPage.value = true;
  }

  // Watch window height
  window.addEventListener("resize", handleWindowResizing);
});

onUnmounted(() => window.removeEventListener("resize", handleWindowResizing));

watch(route, (newRoute) => {
  // Update Height
  pageHeight.value = window.innerHeight;
  // Update Pages
  const categorySlug = newRoute.params.category ? newRoute.params.category : "";
  const subcategorySlug = newRoute.params.subcategory
    ? newRoute.params.subcategory
    : "";

  if (!categorySlug.length) {
    mainFundingPage.value = true;
    categoriesDetailsPage.value = false;
    subCategoryDetailsPage.value = false;
    tierDetailsPage.value = false
    subCategoryTiersPage.value = false
    return (vendorListPage.value = false);
  } else if (categorySlug.length && !subcategorySlug.length) {
    mainFundingPage.value = false;
    categoriesDetailsPage.value = true;
    subCategoryDetailsPage.value = false;
    tierDetailsPage.value = false
    subCategoryTiersPage.value = false
    return (vendorListPage.value = false);
  } else if (
    subcategorySlug.length &&
    subcategorySlug === "trade_vendor_credit" &&
    !route.params.list.length
  ) {
    mainFundingPage.value = false;
    categoriesDetailsPage.value = false;
    subCategoryDetailsPage.value = false;
    tierDetailsPage.value = false
    subCategoryTiersPage.value = true
    return (vendorListPage.value = false);
  } else if (
    subcategorySlug.length &&
    subcategorySlug === "trade-vendors-tier-1" &&
    !route.params.list.length
  ) {
    mainFundingPage.value = false;
    categoriesDetailsPage.value = false;
    subCategoryDetailsPage.value = false;
    tierDetailsPage.value = true
    subCategoryTiersPage.value = false
    return (vendorListPage.value = false);
  } else if (
    subcategorySlug.length &&
    subcategorySlug != "vendor-list" &&
    subcategorySlug != "experimenter" &&
    !route.params.list.length
  ) {
    mainFundingPage.value = false;
    categoriesDetailsPage.value = false;
    subCategoryDetailsPage.value = true;
    tierDetailsPage.value = false
    subCategoryTiersPage.value = false
    return (vendorListPage.value = false);
  } else if (
    route.params.list.length ||
    subcategorySlug === "vendor-list" ||
    subcategorySlug === "experimenter"
  ) {
    mainFundingPage.value = false;
    categoriesDetailsPage.value = false;
    subCategoryDetailsPage.value = false;
    tierDetailsPage.value = false
    subCategoryTiersPage.value = false
    return (vendorListPage.value = true);
  }
});
</script>

<style>
.vendor-w {
  width: calc(100vw - 45px);
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-100 ease-linear;
}

.fade-leave-active {
  @apply absolute;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
