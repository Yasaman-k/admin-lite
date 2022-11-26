<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Negative"
      title="Business information must match"
      message="Update your business name and address with merchant provider to ensure an exact match across all business documentation and applications."
    />
    <FormHeader
      class="mt-12"
      linkText="Update your business information on Merchant Account"
      desc="Click the copy/paste icons (below right) to paste your business name and address into merchant account forms."
    />
    <BaseBusinessConfirmationFields
      :businessName="merchantAccountFields.company.data || ''"
      :addressLineOne="merchantAccountFields.business_address_street.data || ''"
      :addressLineTwo="merchantAccountFields.business_address_line2.data || ''"
      :city="merchantAccountFields.business_address_city.data || ''"
      :state="merchantAccountFields.business_address_state.data || ''"
      :zipCode="merchantAccountFields.business_address_zip.data || ''"
    />
    <BaseBackNextBtns
      nextLabel="Business Info Updated"
      :nextDisabled="false"
      @next="onSubmit"
    />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import BaseWarning from "../BaseWarning.vue";
import FormHeader from "../FormHeader.vue";
import BaseBusinessConfirmationFields from "../BaseBusinessConfirmationFields.vue";

const router = useRouter();
const store = useStore();

// Data
const merchantAccountFields = ref({
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
  const fields = store.state.merchantAccount.merchantAccountFields;
  fields.length &&
    fields.map((field) => {
      return (merchantAccountFields.value[Object.keys(field)[0]] =
        Object.values(field)[0]);
    });
});

// Hooks
const onSubmit = async () => {
  const merchantAccount = store.state.merchantAccount.merchantAccount;
  await store.dispatch("merchantAccount/sendConfirmation", {
    type: "has_merchant_account",
    requiredData: { value: true },
  });
  await store.dispatch("merchantAccount/sendConfirmation", {
    type: "has_confirmed_address_matches_merchant_account",
    requiredData: { value: true },
  });
  await store.dispatch("merchantAccount/sendMerchantAccountFields", [
    {
      type: "merchant_account",
      value: merchantAccount,
    },
  ]);
  await store.dispatch("aspects/fetchFoundationStatuses", ["merchant_account"]);
  return router.push(
    "/fundability/foundation/merchant-account/merchant-account-form-confirm"
  );
};
</script>
