<template>
  <form @submit.prevent="onSubmit" class="mt-5">
    <div class="grid grid-cols-2 gap-5">
      <BaseRadioButton
        @select="(val) => handleVal(val)"
        radioName="merchant-account"
        text="Exact Match"
        icon="HandYes"
        value="Yes"
      />
      <BaseRadioButton
        @select="(val) => handleVal(val)"
        radioName="merchant-account"
        text="Does Not Match"
        icon="HandNo"
        value="No"
      />
    </div>
    <BaseBackNextBtns :nextDisabled="nextDisable" />
  </form>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { watch } from "@vue/runtime-core";
import BaseRadioButton from "../BaseRadioButton.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const store = useStore();
const router = useRouter();
const addressMatch = ref("");
const nextDisable = ref(true);

// Hooks
watch(addressMatch, (newVal) => {
  if (newVal.length > 1) {
    return (nextDisable.value = false);
  }
  nextDisable.value = true;
});

// Methods
const handleVal = (val) => (addressMatch.value = val);

const onSubmit = async () => {
  const confirmation =
    store.getters["merchantAccount/getMerchantAccountConfirmation"];
  const merchantAccount = store.getters["merchantAccount/getMerchantAccount"];

  await store.dispatch("merchantAccount/sendConfirmation", {
    type: "has_merchant_account",
    requiredData: { value: confirmation === "Yes" },
  });
  await store.dispatch("merchantAccount/sendConfirmation", {
    type: "has_confirmed_address_matches_merchant_account",
    requiredData: { value: addressMatch.value === "Yes" },
  });
  await store.dispatch("merchantAccount/sendMerchantAccountFields", [
    {
      type: "merchant_account",
      value: merchantAccount,
    },
  ]);
  await store.dispatch("aspects/fetchFoundationStatuses", "merchant_account");
  if (addressMatch.value === "Yes") {
    return router.push(
      "/fundability/foundation/merchant-account/merchant-account-form-confirm"
    );
  }
  return router.push(
    "/fundability/foundation/merchant-account/merchant-account-update"
  );
};
</script>
