<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="Does your business generate revenue?"
      desc="Your business will be matched with the best financing options fit for your business, but some lenders require consistent revenue for approval."
    />
    <BaseOptions
      :goBackBtn="false"
      name="generate-revenue-confirmation"
      :value="generateRevenueConfirmation"
      @handleValue="(val) => handleVal(val)"
      @submit="onSubmit"
    />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import FormHeader from "../FormHeader.vue";
import BaseOptions from "../BaseOptions.vue";

const store = useStore();
const router = useRouter();
const generateRevenueConfirmation = ref("");

// Hooks
onMounted(() => {
  const confirmation =
    store.getters["businessGrossRevenue/getGrossRevenueConfirmations"];
  // Determine Checkpoint

  // Get Filed Last Year Confirmation
  confirmation.length &&
  confirmation[0].has_business_revenue &&
  (confirmation[0].has_business_revenue.value === false ||
    confirmation[0].has_business_revenue.value === true)
    ? (generateRevenueConfirmation.value = confirmation[0].has_business_revenue
        .value
        ? "Yes"
        : "No")
    : (generateRevenueConfirmation.value = "");
});

// Methods
const handleVal = (val) => (generateRevenueConfirmation.value = val);

const onSubmit = async () => {
  await store.dispatch("businessGrossRevenue/sendConfirmation", {
    value: generateRevenueConfirmation.value === "Yes",
  });

  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "business_gross_revenue",
  ]);
  if (generateRevenueConfirmation.value === "No") {
    return router.push("/fundability/financials/business-revenue/resources");
  }
  return router.push("/fundability/financials/business-revenue/form");
};
</script>
