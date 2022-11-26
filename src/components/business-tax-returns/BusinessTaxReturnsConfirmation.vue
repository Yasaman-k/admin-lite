<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Tax filing confirmation"
      icon="CommercialAddress"
      linkText="Your last tax filing has been recorded as follows:"
      :desc="`${filedYear} business taxes were filed. Click “Update Tax Status” to make changes.`"
    />
    <form @submit.prevent class="mt-10">
      <BaseInput
        :value="filedYear || ''"
        label="Last Tax Year Filed"
        :disabled="true"
      />
      <BaseInput
        :value="industry.title || ''"
        label="Industry"
        :disabled="true"
        class="mt-4"
      />
      <BaseInput
        :value="filingStatus || ''"
        label="Adjusted Gross Income"
        :disabled="true"
        class="mt-4"
      />
      <BaseUpdateNextBtns
        updateLabel="Update Tax Status"
        updateLink="/fundability/financials/business-tax"
        nextLabel="Financial Statements"
        nextLink="/fundability/financials/financial-statement"
      />
    </form>
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";
import BaseInput from "../BaseInput.vue";

const store = useStore();
const filedYear = ref("");
const filingStatus = ref("");
const industry = ref({});

onBeforeMount(async () => {
  const fields =
    store.getters["businessTaxReturns/getBusinessTaxReturnsFields"];

  if (fields.length) {
    // Get Filed Year
    filedYear.value = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(
        field,
        "business_tax_return_year_last_filed_at"
      )
    );
    filedYear.value &&
    filedYear.value.business_tax_return_year_last_filed_at.data
      ? (filedYear.value =
          filedYear.value.business_tax_return_year_last_filed_at.data)
      : (filedYear.value = "");

    // Get Industry
    industry.value = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "business_industry")
    );
    industry.value && industry.value.business_industry.data
      ? (industry.value = industry.value.business_industry.data)
      : (industry.value = { title: "" });

    // Get Filing Status
    filingStatus.value = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(
        field,
        "business_tax_return_filing_status"
      )
    );
    filingStatus.value &&
    filingStatus.value.business_tax_return_filing_status.data
      ? (filingStatus.value =
          filingStatus.value.business_tax_return_filing_status.data.const)
      : (filingStatus.value = "");
  }
});
</script>
