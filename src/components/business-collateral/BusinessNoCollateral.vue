<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Warning"
      title="No business collateral"
      message="Not all lenders require business collateral, but some excellent sources of funding will. Businesses with at least some form of collateral typically see better terms and rates, too."
    />
    <BaseResources
      text="Click below to learn more about using a 401k to obtain Business Financing."
      firstLink="/"
      secondLink="/"
    />
    <BaseUpdateNextBtns
      updateLabel="Update Collateral"
      updateLink="/fundability/financials/business-collateral"
      nextLabel="Personal Tax Returns"
      nextLink="/fundability/financials/personal-tax"
    />
  </section>
</template>

<script setup>
import BaseWarning from "../BaseWarning.vue";
import BaseResources from "../BaseResources.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";
</script>
