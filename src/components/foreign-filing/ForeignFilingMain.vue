<template>
  <section class="container my-16 px-20">
    <FormHeader
      :linkText="`Have you Foreign Filed in ${businessAddressState}?`"
      :desc="`Your Business Address is located in a different state than your Business Entity.
            Underwriters will check to see if you have foreign filed in the state your business is physically located. Have you foreign filed in ${businessAddressState}?`"
    />
    <BaseOptions
      :goBackBtn="false"
      name="foreign-filing"
      :value="hasForeignFiling"
      @handleValue="(val) => handleVal(val)"
      @submit="onSubmit"
    />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseOptions from "../BaseOptions.vue";

const store = useStore();
const router = useRouter();

// Data
const foreignFilingFields = ref(
  store.getters["foreignFiling/getForeignFilingFields"]
);
const businessAddressState = ref("");
const hasForeignFiling = ref("");

// Hooks
onBeforeMount(() => {
  if (foreignFilingFields.value.length) {
    businessAddressState.value = foreignFilingFields.value.find((field) => {
      return Object.keys(field)[0] === "business_address_state";
    });
    businessAddressState.value &&
    businessAddressState.value.business_address_state.data
      ? (businessAddressState.value =
          businessAddressState.value.business_address_state.data)
      : (businessAddressState.value = "");

    // hasForeignFiling
    hasForeignFiling.value = foreignFilingFields.value.find((field) => {
      return Object.keys(field)[0] === "foreign_filing_confirmation";
    });
    hasForeignFiling.value &&
    hasForeignFiling.value.foreign_filing_confirmation.data
      ? (hasForeignFiling.value =
          hasForeignFiling.value.foreign_filing_confirmation.data.const)
      : (hasForeignFiling.value = "");
  }
});

// Methods
const handleVal = (val) => (hasForeignFiling.value = val);

const onSubmit = async () => {
  await store.dispatch("foreignFiling/sendConfirmation", {
    type: "has_foreign_filed",
    requiredData: { value: hasForeignFiling.value === "Yes" },
  });

  await store.dispatch("aspects/fetchFoundationStatuses", ["foreign_filing"]);
  if (hasForeignFiling.value === "No") {
    return router.push("/fundability/foundation/foreign-filing/resources");
  }
  return router.push("/fundability/foundation/foreign-filing/filing-done");
};
</script>
