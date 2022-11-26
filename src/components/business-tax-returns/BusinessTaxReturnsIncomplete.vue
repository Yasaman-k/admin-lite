<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Warning"
      title="Tax filing not up-to-date"
      message="Some lenders base loan and credit line decisions on business tax returns. If any returns requested have not been filed, it doesn’t prevent you from being matched with financing, but certain lenders are less likely to approve you."
    />
    <BaseResources
      text="Click below to learn more and File Your Taxes."
      :resources="resources"
    />
    <BaseUpdateNextBtns
      updateLabel="Update Tax Status"
      updateLink="/fundability/financials/business-tax"
      nextLabel="Financial Statements"
      nextLink="/fundability/financials/financial-statement"
    />
  </section>
</template>

<script setup>
import BaseWarning from "../BaseWarning.vue";
import BaseResources from "../BaseResources.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";
import { ref } from "vue";

// Data
const resources = ref([
  {
    id: 1,
    title: "Regus Virtual Offices",
    image: "/images/regus.png",
    link: "/",
  },
  {
    id: 2,
    title: "Davinci Virtual Offices",
    image: "/images/davinci.png",
    link: "/",
  },
]);
</script>
