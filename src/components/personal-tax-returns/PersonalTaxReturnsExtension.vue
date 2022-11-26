<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="Did you file for an extension?"
      desc="If you’re planning to file taxes after April 15th, an extension must be filed. "
    />
    <BaseOptions
      :goBackBtn="false"
      name="personal-tax-extension"
      :value="extension"
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
const extension = ref("");

// Hooks
onMounted(() => {
  const confirmations =
    store.getters["personalTaxReturns/getPersonalTaxReturnsConfirmations"];

  // Get Back Taxes Confirmation
  let extensionConfirmation = "";
  extensionConfirmation = confirmations.find((field) =>
    Object.prototype.hasOwnProperty.call(
      field,
      "has_personal_tax_returns_filed_for_extension"
    )
  );

  extensionConfirmation &&
  extensionConfirmation.has_personal_tax_returns_filed_for_extension &&
  (extensionConfirmation.has_personal_tax_returns_filed_for_extension.value ===
    false ||
    extensionConfirmation.has_personal_tax_returns_filed_for_extension.value ===
      true)
    ? (extension.value = extensionConfirmation
        .has_personal_tax_returns_filed_for_extension.value
        ? "Yes"
        : "No")
    : (extension.value = "");
});

// Methods
const handleVal = (val) => (extension.value = val);

const onSubmit = async () => {
  await store.dispatch("personalTaxReturns/sendPersonalConfirmations", {
    type: "has_personal_tax_returns_filed_for_extension",
    requiredData: { value: extension.value === "Yes" },
  });

  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "personal_tax_returns",
  ]);

  if (extension.value === "No") {
    return router.push("/fundability/financials/personal-tax/resources");
  }
  return router.push("/fundability/financials/personal-tax/back-taxes");
};
</script>
