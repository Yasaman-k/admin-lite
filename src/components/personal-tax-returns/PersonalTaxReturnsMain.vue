<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="Are your Personal Tax Returns up-to-date?"
      desc="Your business will be matched with the best financing options fit for your business, but some lenders require Personal Tax Returns for approval."
    />
    <BaseOptions
      :goBackBtn="false"
      name="personal-tax-up-to-date"
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
    store.getters["personalTaxReturns/getPersonalTaxReturnsConfirmations"];
  // Get Up-to-date Confirmation
  let upToDateConfirmation = "";
  upToDateConfirmation = confirmations.find((field) =>
    Object.prototype.hasOwnProperty.call(
      field,
      "has_personal_tax_returns_updated"
    )
  );

  upToDateConfirmation &&
  upToDateConfirmation.has_personal_tax_returns_updated &&
  (upToDateConfirmation.has_personal_tax_returns_updated.value === false ||
    upToDateConfirmation.has_personal_tax_returns_updated.value === true)
    ? (upToDate.value = upToDateConfirmation.has_personal_tax_returns_updated
        .value
        ? "Yes"
        : "No")
    : (upToDate.value = "");
});

// Methods
const handleVal = (val) => (upToDate.value = val);

const onSubmit = async () => {
  await store.dispatch("personalTaxReturns/sendPersonalConfirmations", {
    type: "has_personal_tax_returns_updated",
    requiredData: { value: upToDate.value === "Yes" },
  });

  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "personal_tax_returns",
  ]);
  if (upToDate.value === "No") {
    return router.push("/fundability/financials/personal-tax/resources");
  }
  return router.push("/fundability/financials/personal-tax/form");
};
</script>
