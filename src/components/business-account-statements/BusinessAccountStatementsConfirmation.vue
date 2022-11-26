<template>
  <section class="container my-16 px-20">
    <BaseWarning
      v-if="warning"
      icon="Warning"
      title="Minimum number of bank statements not met"
      message="Lenders require a minimum number of bank statements for approval. Submit more business bank statements to prequalify for funding."
    />
    <FormHeader
      v-if="!warning"
      formTitle="Business bank Statements saved"
      icon="CommercialAddress"
      linkText="Number of business bank statements is recorded as follows:"
      desc="Click “Update Bank Statements” to make changes."
    />
    <BaseInput
      label="Number of Bank Statements"
      :value="businessAccountStatements"
      :disabled="true"
      class="mt-7"
    />
    <BaseUpdateNextBtns
      updateLabel="Update Bank Statements"
      updateLink="/fundability/financials/business-account-statements"
      nextLabel="Business Account Balance"
      nextLink="/fundability/financials/business-account-balance"
    />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";
import BaseInput from "../BaseInput.vue";
import BaseWarning from "../BaseWarning.vue";

const store = useStore();

// Data
const businessAccountStatements = ref("");
const warning = ref(false);

// Hooks
onBeforeMount(async () => {
  const fields =
    store.getters["businessAccountStatements/getBusinessAccountStatements"];
  const statements = fields.find((field) =>
    Object.prototype.hasOwnProperty.call(
      field,
      "business_bank_account_statements"
    )
  );

  statements && statements.business_bank_account_statements.data
    ? (businessAccountStatements.value =
        statements.business_bank_account_statements.data.const)
    : (businessAccountStatements.value = "");
  if (businessAccountStatements.value === "No Statement") {
    warning.value = true;
  }
  if (businessAccountStatements.value === "More than a year") {
    businessAccountStatements.value = "More Than A Year";
  } else if (businessAccountStatements.value === "Three To Five Month") {
    businessAccountStatements.value = "Three To Five Months";
  }
});
</script>
