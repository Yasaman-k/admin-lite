<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business Financials"
      linkText="Can your business supply financial statements?"
      desc="Some underwriters base their lending decision on a business’s financial statements. Before applying, review your P&L statement and balance sheet to understand your numbers and best increase your chances of funding."
    />
    <BaseOptions
      :goBackBtn="false"
      name="financial-statement"
      :value="supplyFinancialStatement"
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

// Data
const supplyFinancialStatement = ref("");

// Hooks
onMounted(() => {
  let confirmation =
    store.getters["financialStatement/getFinancialStatementConfirmation"];

  confirmation.length &&
  confirmation[0].has_financial_statements &&
  (confirmation[0].has_financial_statements.value === false ||
    confirmation[0].has_financial_statements.value === true)
    ? (supplyFinancialStatement.value = confirmation[0].has_financial_statements
        .value
        ? "Yes"
        : "No")
    : (supplyFinancialStatement.value = "");
});

// Methods
const handleVal = (val) => (supplyFinancialStatement.value = val);

const onSubmit = async () => {
  if (supplyFinancialStatement.value === "No") {
    await store.dispatch(
      "financialStatement/sendFinancialStatementConfirmation",
      { value: false }
    );
    return router.push(
      "/fundability/financials/financial-statements/resources"
    );
  }
  await store.dispatch(
    "financialStatement/sendFinancialStatementConfirmation",
    { value: true }
  );
  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "financial_statement",
  ]);
  return router.push(
    "/fundability/financials/financial-statements/statements-terms"
  );
};
</script>
