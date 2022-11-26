<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="What year did you file your last Personal Tax Return?"
      desc="Enter the year of your last tax filing."
    />
    <div class="mt-4">
      <BaseInput :value="year" label="Last Tax Filed" :disabled="true" />
    </div>
    <BaseUpdateNextBtns
      updateLabel="Update Return Status"
      updateLink="/fundability/financials/personal-tax"
      nextLabel="Business Revenue"
      nextLink="/fundability/financials/business-revenue"
    />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";

const store = useStore();
const year = ref("");

// Hooks
onBeforeMount(async () => {
  const fields =
    store.getters["personalTaxReturns/getPersonalTaxReturnsFields"];
  if (fields.length) {
    // Get year
    year.value = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(
        field,
        "personal_tax_return_year_last_filed_at"
      )
    );

    year.value && year.value.personal_tax_return_year_last_filed_at.data
      ? (year.value = year.value.personal_tax_return_year_last_filed_at.data)
      : (year.value = "");
  }
});
</script>
