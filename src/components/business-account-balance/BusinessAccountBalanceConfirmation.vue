<template>
  <section class="container my-16 px-20">
    <BaseWarning
      v-if="warning"
      icon="Warning"
      title="Some lenders require a higher bank balance"
      message="Some lenders will require a greater bank balance to prequalify for funding. As your monthly balance increases, update your average balance in Financials.   "
    />
    <FormHeader
      v-else
      formTitle="Business bank Balance saved"
      icon="CommercialAddress"
      linkText="Your average business bank balance is recorded as follows:"
      desc="Click “Update Average Balance” to make changes. "
    />
    <BaseInput
      label="Last Six Months Average"
      :value="bankBalance"
      :disabled="true"
      class="mt-7"
    />
    <BaseUpdateNextBtns
      updateLabel="Update Average Balance"
      updateLink="/fundability/financials/business-account-balance"
      nextLabel="Business Tax Returns"
      nextLink="/fundability/financials/business-tax"
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
const warning = ref(false);
const bankBalance = ref("");
const financialStatuses = ref(store.getters["aspects/getFinancialsStatuses"]);

// Hooks
onBeforeMount(async () => {
  const status = financialStatuses.value.find((item) =>
    Object.prototype.hasOwnProperty.call(item, "business_account_balance")
  );

  if (status["business_account_balance"].toLowerCase() == "caution") {
    warning.value = true;
  }

  const fields =
    store.getters["businessAccountBalance/getBusinessAccountBalance"];

  bankBalance.value = fields.find((field) =>
    Object.prototype.hasOwnProperty.call(field, "bank_balance")
  );

  bankBalance.value && bankBalance.value.bank_balance.data
    ? (bankBalance.value = "$ " + bankBalance.value.bank_balance.data)
    : (bankBalance.value = "$ 0.00");
});
</script>
