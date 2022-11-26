<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="Do you have a Business Bank Account?"
      desc="When applying for loans and lines of credit, some lenders want to see your banking history - a consistent record of transactions, revenues and profits before making their lending decision. "
    />
    <BaseOptions
      :goBackBtn="false"
      name="bank-account"
      :value="hasBankAccount"
      @handleValue="(val) => handleVal(val)"
      @submit="onSubmit"
    />
  </section>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import FormHeader from "../FormHeader.vue";
import BaseOptions from "../BaseOptions.vue";

const store = useStore();
const router = useRouter();

// Data
const hasBankAccount = ref("");

// Hooks
onMounted(() => {
  const fields = store.getters["bankAccount/getBankAccountFields"];
  if (fields.length) {
    hasBankAccount.value = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "bank_account_confirmation")
    );
    if (hasBankAccount.value) {
      hasBankAccount.value.bank_account_confirmation.data
        ? (hasBankAccount.value =
            hasBankAccount.value.bank_account_confirmation.data.const)
        : (hasBankAccount.value = "");
    } else {
      hasBankAccount.value = "";
    }
  }
});

// Methods
const handleVal = (val) => (hasBankAccount.value = val);

const onSubmit = async () => {
  if (hasBankAccount.value === "No") {
    await store.dispatch("bankAccount/sendConfirmation", {
      type: "has_bank_account",
      requiredData: { value: false },
    });
    await store.dispatch("aspects/getFinancialsStatuses", ["bank_account"]);
    return router.push("/fundability/financials/business-account/resources");
  }
  return router.push(
    "/fundability/financials/business-account/bank-account-form"
  );
};
</script>
