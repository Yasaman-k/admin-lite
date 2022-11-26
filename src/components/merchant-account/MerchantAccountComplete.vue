<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Merchant Account confirmation"
      icon="CommercialAddress"
      linkText="Your Merchant Account and Business Info is recorded as follows:"
      desc="Click “Update Merchant Account” to make changes."
    />
    <BaseBusinessConfirmationFields
      :merchantAccount="merchantAccountFields.merchantAccount.data || ''"
      :businessName="merchantAccountFields.company.data || ''"
      :addressLineOne="merchantAccountFields.business_address_street.data || ''"
      :addressLineTwo="merchantAccountFields.business_address_line2.data || ''"
      :city="merchantAccountFields.business_address_city.data || ''"
      :state="merchantAccountFields.business_address_state.data || ''"
      :zipCode="merchantAccountFields.business_address_zip.data || ''"
    />
    <BaseUpdateNextBtns
      updateLabel="Update Merchant Account"
      updateLink="/fundability/foundation/merchant-account/merchant-account-form"
      nextLabel="Fundability"
      nextLink="/fundability/foundation"
    />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseBusinessConfirmationFields from "../BaseBusinessConfirmationFields.vue";

const store = useStore();

// Data
const merchantAccountFields = ref({
  merchantAccount: {
    data: "",
  },
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
  const fields = store.getters["merchantAccount/getMerchantAccountFields"];
  if (!fields.length) {
    await store.dispatch("merchantAccount/fetchMerchantAccountFields");
  }
  fields.length &&
    fields.map((field) => {
      return (merchantAccountFields.value[Object.keys(field)[0]] =
        Object.values(field)[0]);
    });

  merchantAccountFields.value.merchantAccount = fields.find((field) =>
    Object.prototype.hasOwnProperty.call(field, "merchant_account")
  );

  merchantAccountFields.value.merchantAccount &&
  merchantAccountFields.value.merchantAccount.merchant_account
    ? (merchantAccountFields.value.merchantAccount =
        merchantAccountFields.value.merchantAccount.merchant_account)
    : (merchantAccountFields.value.merchantAccount = { data: "" });
});
</script>
