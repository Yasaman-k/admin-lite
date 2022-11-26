<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business revenue"
      icon="CommercialAddress"
      linkText="Your Monthly Gross Revenue is recorded as follows:"
      desc="Click “Update Revenue” if your information has changed since your last update."
    />
    <div class="mt-4">
      <BaseInput
        :value="`$ ${monthlyRevenue}`"
        label="Monthly Gross Revenue"
        :disabled="true"
      />
    </div>
    <BaseUpdateNextBtns
      updateLabel="Update Revenue"
      updateLink="/fundability/financials/business-revenue/form"
      nextLabel="Employees"
      nextLink="/fundability/financials/employees"
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
const monthlyRevenue = ref("");

// Hooks
onBeforeMount(async () => {
  const fields =
    store.getters["businessGrossRevenue/getBusinessGrossRevenueFields"];

  if (fields.length) {
    // Get Monthly Revenue
    monthlyRevenue.value = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "monthly_gross_revenue")
    );
    monthlyRevenue.value && monthlyRevenue.value.monthly_gross_revenue.data
      ? (monthlyRevenue.value = monthlyRevenue.value.monthly_gross_revenue.data)
      : (monthlyRevenue.value = "");
  }
});
</script>
