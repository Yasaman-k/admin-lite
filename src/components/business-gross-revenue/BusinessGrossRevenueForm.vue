<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="What’s your Monthly Gross Revenue?"
      desc="If your business revenue fluctuates month to month, take your yearly gross revenue and divide by 12"
    />
    <div class="mt-4">
      <BaseInput
        @input="(e) => maskRevenue(e.target)"
        :value="monthlyRevenue"
        placeholder="$ 12,789"
        label="Monthly Gross Revenue"
        :required="true"
        errorMessage="Monthly Gross Revenue is required."
      />
    </div>
    <BaseBackNextBtns :nextDisabled="nextDisable" @next="next" />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { onBeforeMount, onMounted, onUpdated } from "@vue/runtime-core";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseInput from "../BaseInput.vue";

const store = useStore();
const router = useRouter();

// Data
const nextDisable = ref(true);
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

onMounted(() => {
  if (monthlyRevenue.value.length) {
    return (nextDisable.value = false);
  }
  nextDisable.value = true;
});

onUpdated(() => {
  if (monthlyRevenue.value.length) {
    return (nextDisable.value = false);
  }
  nextDisable.value = true;
});

// Methods
const maskRevenue = (input) => {
  if (/^-?\d*$/.test(input.value)) {
    input.oldValue = input.value;
    monthlyRevenue.value = input.value;
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue")) {
    input.value = input.oldValue;
    monthlyRevenue.value = input.oldValue;
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    monthlyRevenue.value = "";
  }
};

const next = async () => {
  await store.dispatch("businessGrossRevenue/sendBusinessGrossRevenueFields", [
    {
      type: "monthly_gross_revenue",
      value: monthlyRevenue.value,
    },
  ]);
  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "business_gross_revenue",
  ]);
  return router.push("/fundability/financials/business-revenue/complete");
};
</script>
