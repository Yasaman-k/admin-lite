<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="Did you file last year’s Business Tax Return?"
      desc="If your business tax filing is current, your financing options will likely increase and your business will be matched with certain types of lending."
    />
    <BaseOptions
      :goBackBtn="false"
      name="tax-filed-last-year"
      :value="filedLastYear"
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
const filedLastYear = ref("");

// Hooks
onMounted(() => {
  const confirmations =
    store.getters["businessTaxReturns/getBusinessTaxReturnsConfirmations"];

  // Get Filed Last Year Confirmation
  let filedLastYearConfirmation = "";
  filedLastYearConfirmation = confirmations.find((field) =>
    Object.prototype.hasOwnProperty.call(
      field,
      "has_filed_business_tax_returns_last_year"
    )
  );

  filedLastYearConfirmation &&
  filedLastYearConfirmation.has_filed_business_tax_returns_last_year &&
  (filedLastYearConfirmation.has_filed_business_tax_returns_last_year.value ===
    false ||
    filedLastYearConfirmation.has_filed_business_tax_returns_last_year.value ===
      true)
    ? (filedLastYear.value = filedLastYearConfirmation
        .has_filed_business_tax_returns_last_year.value
        ? "Yes"
        : "No")
    : (filedLastYear.value = "");
});

// Methods
const handleVal = (val) => (filedLastYear.value = val);

const onSubmit = async () => {
  await store.dispatch(
    "businessTaxReturns/sendBusinessTaxReturnsConfirmations",
    {
      type: "has_filed_business_tax_returns_last_year",
      requiredData: { value: filedLastYear.value === "Yes" },
    }
  );

  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "business_tax_returns",
  ]);
  if (filedLastYear.value === "No") {
    return router.push("/fundability/financials/business-tax/incomplete");
  }
  return router.push("/fundability/financials/business-tax/up-to-date");
};
</script>
