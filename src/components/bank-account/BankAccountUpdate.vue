<template>
  <section class="container !pb-20 my-5">
    <BaseWarning
      icon="Warning"
      title="name and address on account must match"
      message="Lenders check bank statements to verify your business name and address matches what’s on your application. No match triggers a fraud warning."
    />
    <FormHeader
      class="mt-12"
      linkText="Update your Business Bank Account Name and Address"
      desc="Click the copy/paste icons (below right) to paste your business name and address into business bank forms."
    />
    <BaseBusinessConfirmationFields
      :businessName="bankAccountFields.company.data || ''"
      :addressLineOne="bankAccountFields.business_address_street.data || ''"
      :addressLineTwo="bankAccountFields.business_address_line2.data || ''"
      :city="bankAccountFields.business_address_city.data || ''"
      :state="bankAccountFields.business_address_state.data || ''"
      :zipCode="bankAccountFields.business_address_zip.data || ''"
    />
    <BaseBackNextBtns
      nextLabel="Account Info Updated"
      :nextDisabled="false"
      @next="onSubmit"
    />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseWarning from "../BaseWarning.vue";
import FormHeader from "../FormHeader.vue";
import BaseBusinessConfirmationFields from "../BaseBusinessConfirmationFields.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const router = useRouter();
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
onBeforeMount(() => {
  const fields = store.getters["bankAccount/getBankAccountFields"];
  fields.length &&
    fields.map((field) => {
      return (bankAccountFields.value[Object.keys(field)[0]] =
        Object.values(field)[0]);
    });
});

// Methods
const onSubmit = async () => {
  const confirmation = store.getters["bankAccount/getConfirmations"];
  const businessBankAccount =
    store.getters["bankAccount/getBusinessBankAccount"];

  await store.dispatch("bankAccount/sendConfirmation", {
    type: "has_bank_account",
    requiredData: { value: confirmation === "Yes" },
  });
  await store.dispatch("bankAccount/sendConfirmation", {
    type: "has_confirmed_address_matches_bank_account",
    requiredData: { value: true },
  });
  await store.dispatch("bankAccount/sendBankAccountFields", [
    {
      type: "business_bank_account",
      value: businessBankAccount,
    },
  ]);
  await store.dispatch("aspects/fetchFinancialsStatuses", ["bank_account"]);
  return router.push(
    "/fundability/financials/business-account/bank-account-form-confirm"
  );
};
</script>
