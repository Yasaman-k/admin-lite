<template>
  <section
    class="container bg-[#E4EEF3] !pr-0 min-w-full flex justify-between overflow-hidden"
  >
    <div class="relative pt-11 pr-10 w-2/4">
      <BusinessFundingCategories class="gap-10" :creditChecked="true" />
    </div>
    <BusinessFundingSubCategory class="w-2/4" />
  </section>
</template>

<script setup>
import BusinessFundingSubCategory from "./BusinessFundingSubCategory.vue";
import BusinessFundingCategories from "./BusinessFundingCategories.vue";
</script>
