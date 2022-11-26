<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="Do you have any back taxes due?"
      desc="If you’re planning to file taxes after April 15th, an extension must be filed."
    />
    <BaseOptions
      :goBackBtn="false"
      name="personal-tax-back-taxes"
      :value="backTaxes"
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
const backTaxes = ref("");

// Hooks
onMounted(() => {
  const confirmations =
    store.getters["personalTaxReturns/getPersonalTaxReturnsConfirmations"];
  // Get Back Taxes Confirmation
  let backTaxesConfirmation = "";
  backTaxesConfirmation = confirmations.find((field) =>
    Object.prototype.hasOwnProperty.call(field, "has_no_personal_back_taxes")
  );

  backTaxesConfirmation &&
  backTaxesConfirmation.has_no_personal_back_taxes &&
  (backTaxesConfirmation.has_no_personal_back_taxes.value === false ||
    backTaxesConfirmation.has_no_personal_back_taxes.value === true)
    ? (backTaxes.value = backTaxesConfirmation.has_no_personal_back_taxes.value
        ? "Yes"
        : "No")
    : (backTaxes.value = "");
});

// Methods
const handleVal = (val) => (backTaxes.value = val);

const onSubmit = async () => {
  await store.dispatch("personalTaxReturns/sendPersonalConfirmations", {
    type: "has_no_personal_back_taxes",
    requiredData: { value: backTaxes.value === "Yes" },
  });
  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "personal_tax_returns",
  ]);
  if (backTaxes.value === "No") {
    return router.push("/fundability/financials/personal-tax/resources");
  }
  return router.push("/fundability/financials/personal-tax/complete");
};
</script>
