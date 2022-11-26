<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business bank balance"
      icon="Location"
      linkText="What is your average business bank balance for the last 6 months?"
      desc="To calculate your average balance, add up your total monthly balance for the last six statements and divide by six. "
    />
    <div class="relative mt-7">
      <BaseInput
        :required="true"
        :value="accountBalance"
        label=""
        errorMessage="Business bank balance is required."
        placeholder="$0.00"
        @input="(e) => checkBalance(e.target)"
      />
      <BaseBackNextBtns
        :BackBtnHidden="true"
        nextLabel="Next"
        :nextDisabled="nextDisable"
        @next="onSubmit"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
import BaseInput from "../BaseInput.vue";
import FormHeader from "../FormHeader.vue";

const store = useStore();
const router = useRouter();

//data
const accountBalance = ref("");

const nextDisable = ref(true);

//methods
const checkBalance = (input) => {
  if (/^\d*\.?\d*$/.test(input.value)) {
    accountBalance.value = input.value;
    nextDisable.value = false;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.value.length > 1) {
    input.value = accountBalance.value;
    nextDisable.value = false;
  } else {
    input.value = "";
    nextDisable.value = true;
  }
};

const onSubmit = async () => {
  await store.dispatch("businessAccountBalance/sendBusinessAccountBalance", [
    {
      type: "bank_balance",
      value: accountBalance.value,
    },
  ]);
  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "business_account_balance",
  ]);
  return router.push(
    "/fundability/financials/business-account-balance/confirmation"
  );
};

//hooks
onMounted(() => {
  const fields =
    store.getters["businessAccountBalance/getBusinessAccountBalance"];

  accountBalance.value = fields.find((field) =>
    Object.prototype.hasOwnProperty.call(field, "bank_balance")
  );

  accountBalance.value && accountBalance.value.bank_balance.data
    ? (accountBalance.value = accountBalance.value.bank_balance.data)
    : (accountBalance.value = "");

  if (accountBalance.value != "") {
    nextDisable.value = false;
  } else {
    nextDisable.value = true;
  }
});
</script>

