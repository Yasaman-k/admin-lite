<template>
  <form @submit.prevent="onSubmit" class="mt-5">
    <BaseInput
      @input="(e) => (fastFunds = e.target.value)"
      :required="true"
      :value="fastFunds"
      label="Fast Funds Payment Processing"
      errorMessage="Fast Funds Payment Processing is required."
      placeholder="Fast Funds Payment Processing"
    />
    <BaseBackNextBtns :nextDisabled="saveDisable" />
  </form>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { onMounted, onUpdated } from "@vue/runtime-core";
import { useStore } from "vuex";
import BaseInput from "../BaseInput.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const store = useStore();
const router = useRouter();
const fastFunds = ref("");
const saveDisable = ref(true);

onMounted(async () => {
  const fields = store.getters["merchantAccount/getMerchantAccountFields"];
  if (!fields.length) {
    await store.dispatch("merchantAccount/fetchMerchantAccountFields");
  }
  fastFunds.value = fields.find((field) =>
    Object.prototype.hasOwnProperty.call(field, "merchant_account")
  );

  fastFunds.value &&
  fastFunds.value.merchant_account &&
  (fastFunds.value.merchant_account.data != null ||
    fastFunds.value.merchant_account.data != undefined)
    ? (fastFunds.value = fastFunds.value.merchant_account.data)
    : (fastFunds.value = "");

  if (fastFunds.value.length) {
    return (saveDisable.value = false);
  }
  return (saveDisable.value = true);
});

onUpdated(() => {
  if (fastFunds.value.length) {
    return (saveDisable.value = false);
  }
  return (saveDisable.value = true);
});

// Methods
const onSubmit = async () => {
  await store.dispatch("merchantAccount/setMerchantAccountConfirmation", "Yes");
  await store.dispatch("merchantAccount/setMerchantAccount", fastFunds.value);
  return router.push(
    "/fundability/foundation/merchant-account/merchant-account-match"
  );
};
</script>
