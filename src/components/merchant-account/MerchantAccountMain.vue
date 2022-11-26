<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="Does your Business have a Merchant Account?"
      desc="A merchant account is comparable to a business bank account; it allows companies to accept credit cards and process electronic payments."
    />
    <BaseOptions
      name="merchant-account"
      :value="hasMerchantAccount"
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

// Data
const hasMerchantAccount = ref("");

// Hooks
onMounted(() => {
  const confirmations = store.getters["merchantAccount/getConfirmations"];
  let merchantAccountConfirmation =
    confirmations.length &&
    confirmations.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "has_merchant_account")
    );

  // Check if Merchant Account Confirmation != undefined
  merchantAccountConfirmation = merchantAccountConfirmation
    ? merchantAccountConfirmation.has_merchant_account
    : null;

  merchantAccountConfirmation != null &&
  (merchantAccountConfirmation.value === false ||
    merchantAccountConfirmation.value === true)
    ? (hasMerchantAccount.value = merchantAccountConfirmation.value
        ? "Yes"
        : "No")
    : (hasMerchantAccount.value = "");
});

// Methods
const handleVal = (val) => (hasMerchantAccount.value = val);

const onSubmit = async () => {
  if (hasMerchantAccount.value === "No") {
    await store.dispatch("merchantAccount/sendConfirmation", {
      type: "has_merchant_account",
      requiredData: { value: false },
    });
    await store.dispatch("aspects/fetchFoundationStatuses", "merchant_account");
    return router.push("/fundability/foundation/merchant-account/not-needed");
  }
  return router.push(
    "/fundability/foundation/merchant-account/merchant-account-form"
  );
};
</script>
