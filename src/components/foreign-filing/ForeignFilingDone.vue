<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business Address confirmation"
      icon="CommercialAddress"
      :linkText="`Great! Your Foreign Filing has been recorded in the state of ${businessAddressState}.`"
      :desc="`Your business is located in ${businessAddressState} and your Entity is registered with the Secretary of State in ${foreignState}. Your foreign filing was created on ${businessDate} In the state of ${foreignState}. < This must match ${businessAddressState}`"
    />
    <BaseUpdateNextBtns
      updateLabel="Update Foreign Filing"
      updateLink="/fundability/foundation/foreign-filing"
      nextLabel="Ownership"
      nextLink="/fundability/foundation/ownership"
    />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import moment from "moment";
import FormHeader from "../FormHeader.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";

const store = useStore();

// Data
const foreignFilingFields =
  store.getters["foreignFiling/getForeignFilingFields"];
const businessAddressState = ref("");
const foreignState = ref("");
const businessDate = ref("");

// Hooks
onMounted(() => {
  if (foreignFilingFields.length) {
    // Business Address State
    businessAddressState.value = foreignFilingFields.filter((field) => {
      return Object.keys(field)[0] === "business_address_state";
    })[0];
    businessAddressState.value &&
    businessAddressState.value.business_address_state.data
      ? (businessAddressState.value =
          businessAddressState.value.business_address_state.data)
      : (businessAddressState.value = "");
    // Get Fireign Filing State
    foreignState.value = foreignFilingFields.filter((field) => {
      return Object.keys(field)[0] === "business_state_incorporated";
    })[0];

    foreignState.value && foreignState.value.business_state_incorporated.data
      ? (foreignState.value =
          foreignState.value.business_state_incorporated.data)
      : (foreignState.value = "");
    // Get Business Date
    businessDate.value = foreignFilingFields.filter((field) => {
      return Object.keys(field)[0] === "foreign_filing_confirmation";
    })[0];
    businessDate.value &&
    businessDate.value.foreign_filing_confirmation.updated_at
      ? (businessDate.value = moment(
          businessDate.value.foreign_filing_confirmation.updated_at
        ).format("MMMM DD, YYYY"))
      : (businessDate.value = "");
  }
});
</script>
