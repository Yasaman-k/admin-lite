<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business Bank account confirmation "
      icon="CommercialAddress"
      linkText="Your Business Bank Account is recorded as follows:"
      desc="Click “Update Bank Account” to make changes."
    />
    <BaseBusinessConfirmationFields
      :businessName="bankAccountFields.company.data || ''"
      :addressLineOne="bankAccountFields.business_address_street.data || ''"
      :addressLineTwo="bankAccountFields.business_address_line2.data || ''"
      :city="bankAccountFields.business_address_city.data || ''"
      :state="bankAccountFields.business_address_state.data || ''"
      :zipCode="bankAccountFields.business_address_zip.data || ''"
    />
    <BaseUpdateNextBtns
      updateLabel="Update Bank Account"
      updateLink="/fundability/financials/business-account/bank-account-form"
      nextLabel="Business Account Statements"
      nextLink="/fundability/financials/business-account-statements"
    />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseBusinessConfirmationFields from "../BaseBusinessConfirmationFields.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";

const store = useStore();

// Data
const bankAccountFields = ref({
  company: {
    data: "",
  },
  business_address_street: {
    data: "",
  },
  business_address_line2: {
    data: "",
  },
  business_address_city: {
    data: "",
  },
  business_address_state: {
    data: "",
  },
  business_address_zip: {
    data: "",
  },
});

// Hooks
onBeforeMount(async () => {
  const fields = store.getters["bankAccount/getBankAccountFields"];
  if (!fields.length) {
    await store.dispatch("bankAccount/fetchBankAccountFields");
  }
  fields.length &&
    fields.map((field) => {
      return (bankAccountFields.value[Object.keys(field)[0]] =
        Object.values(field)[0]);
    });
});
</script>
