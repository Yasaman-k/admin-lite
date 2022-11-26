<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="Is your Business Tax Filing up-to-date?"
      desc="Have you filed all tax returns for every year you’ve been in business?"
    />
    <BaseOptions
      name="tax-up-to-date"
      :value="upToDate"
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
const upToDate = ref("");

// Hooks
onMounted(() => {
  const confirmations =
    store.getters["businessTaxReturns/getBusinessTaxReturnsConfirmations"];
  let upToDateConfirmation = "";
  upToDateConfirmation = confirmations.find(
    (field) =>
      Object.keys(field)[0] ===
      "has_filed_business_tax_returns_for_each_year_in_business"
  );

  upToDateConfirmation &&
  upToDateConfirmation.has_filed_business_tax_returns_for_each_year_in_business &&
  (upToDateConfirmation.has_filed_business_tax_returns_for_each_year_in_business
    .value === false ||
    upToDateConfirmation
      .has_filed_business_tax_returns_for_each_year_in_business.value === true)
    ? (upToDate.value = upToDateConfirmation
        .has_filed_business_tax_returns_for_each_year_in_business.value
        ? "Yes"
        : "No")
    : (upToDate.value = "");
});

// Methods
const handleVal = (val) => (upToDate.value = val);

const onSubmit = async () => {
  await store.dispatch(
    "businessTaxReturns/sendBusinessTaxReturnsConfirmations",
    {
      type: "has_filed_business_tax_returns_for_each_year_in_business",
      requiredData: { value: upToDate.value === "Yes" },
    }
  );

  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "business_tax_returns",
  ]);
  if (upToDate.value === "No") {
    return router.push("/fundability/financials/business-tax/not-up-to-date");
  }
  return router.push("/fundability/financials/business-tax/form");
};
</script>
