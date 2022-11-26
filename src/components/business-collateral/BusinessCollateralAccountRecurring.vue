<template>
  <section class="container my-16 px-20">
    <BaseRadioQuestion
      question="Do you have any Accounts Receivable?"
      radioName="accounts-receivable"
      firstLabel="Yes"
      firstValue="Yes"
      secondLabel="No"
      secondValue="No"
      :answer="hasReceivable"
      @onChange="(val) => handleHasReceivable(val)"
    />
    <div class="mt-16 hidden" ref="receivableFromGovRef">
      <BaseRadioQuestion
        question="Are any Accounts Receivable from gov't or other business?"
        radioName="accounts-receivable-from-gov't"
        firstLabel="Yes"
        firstValue="Yes"
        secondLabel="No"
        secondValue="No"
        :answer="hasReceivableFromGov"
        @onChange="(val) => receivableFromGovValue(val)"
      />
    </div>
    <div class="mt-20 hidden" ref="accountFieldsRef">
      <p class="text-[#196499] text-xl font-medium">
        What is the total valuation?
      </p>
      <p class="text-[#061017] my-4">
        Enter the estimated value of the recurring Accounts Receivable.
      </p>
      <BaseInput
        @input="(e) => handleAccountValue(e.target.value)"
        :value="accountValue"
        placeholder="Account Value"
        label="Account Value"
        :required="true"
        errorMessage="Account Value is required."
      />
    </div>
    <BaseBackNextBtns :nextDisabled="nextDisable" @next="next" />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onBeforeMount, onMounted } from "@vue/runtime-core";
import BaseRadioQuestion from "../BaseRadioQuestion.vue";
import BaseInput from "../BaseInput.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const store = useStore();
const router = useRouter();
const nextDisable = ref(true);
const accountFieldsRef = ref(null);
const hasReceivable = ref("");
const receivableFromGovRef = ref(null);
const hasReceivableFromGov = ref("");
const accountValue = ref("");

// Hooks
onBeforeMount(() => {
  // Get The Answers Yes or No
  const statements = store.getters["businessCollateral/getStatements"];
  if (statements.length) {
    let hasAccountsReceivable = statements.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "has_accounts_receivable")
    );

    hasAccountsReceivable && hasAccountsReceivable.has_accounts_receivable
      ? (hasAccountsReceivable =
          hasAccountsReceivable.has_accounts_receivable.value)
      : "";
    hasReceivable.value =
      hasAccountsReceivable === true
        ? "Yes"
        : hasAccountsReceivable === false
        ? "No"
        : "";
    // Get Receivable from gov't hasReceivable
    let hasAccountsReceivableFromGov = statements.find((field) =>
      Object.prototype.hasOwnProperty.call(
        field,
        "has_accounts_receivable_from_gov"
      )
    );
    hasAccountsReceivableFromGov &&
    hasAccountsReceivableFromGov.has_accounts_receivable_from_gov
      ? (hasAccountsReceivableFromGov =
          hasAccountsReceivableFromGov.has_accounts_receivable_from_gov.value)
      : "";
    hasReceivableFromGov.value =
      hasAccountsReceivableFromGov === true
        ? "Yes"
        : hasAccountsReceivableFromGov === false
        ? "No"
        : "";
  }

  // Get Account Value
  const fields = store.getters["businessCollateral/getCollateralFields"];
  let accountValueField;
  if (fields.length) {
    accountValueField = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "accounts_receivable_value")
    );

    accountValueField &&
    accountValueField.accounts_receivable_value &&
    accountValueField.accounts_receivable_value.data
      ? (accountValueField = accountValueField.accounts_receivable_value.data)
      : (accountValueField = "");
    return (accountValue.value = accountValueField);
  }
});

onMounted(() => {
  if (hasReceivable.value === "Yes" && hasReceivableFromGov.value === "No") {
    receivableFromGovRef.value.classList.remove("hidden");
    return (nextDisable.value = false);
  } else if (
    hasReceivable.value === "Yes" &&
    hasReceivableFromGov.value === "Yes"
  ) {
    receivableFromGovRef.value.classList.remove("hidden");
    accountFieldsRef.value.classList.remove("hidden");
    accountValue.value.length
      ? (nextDisable.value = false)
      : (nextDisable.value = true);
    return;
  } else if (hasReceivable.value === "No") {
    receivableFromGovRef.value.classList.add("hidden");
    accountFieldsRef.value.classList.add("hidden");
    return (nextDisable.value = false);
  }
  accountFieldsRef.value.classList.add("hidden");
  receivableFromGovRef.value.classList.add("hidden");
  return (nextDisable.value = true);
});

// Methods
const handleHasReceivable = (val) => {
  if (val === "No") {
    receivableFromGovRef.value.classList.add("hidden");
    accountFieldsRef.value.classList.add("hidden");
    hasReceivable.value = val;
    return (nextDisable.value = false);
  } else if (val === "Yes" && hasReceivableFromGov.value === "No") {
    receivableFromGovRef.value.classList.remove("hidden");
    nextDisable.value = false;
    return (hasReceivable.value = val);
  } else if (val === "Yes" && hasReceivableFromGov.value === "Yes") {
    receivableFromGovRef.value.classList.remove("hidden");
    accountFieldsRef.value.classList.remove("hidden");
    accountValue.value.length
      ? (nextDisable.value = false)
      : (nextDisable.value = true);
    return (hasReceivable.value = val);
  } else if (val === "Yes" && !hasReceivableFromGov.value.length) {
    receivableFromGovRef.value.classList.remove("hidden");
    nextDisable.value = true;
    return (hasReceivable.value = val);
  }
};

const receivableFromGovValue = (val) => {
  if (val === "No") {
    accountFieldsRef.value.classList.add("hidden");
    hasReceivableFromGov.value = val;
    hasReceivable.value.length
      ? (nextDisable.value = false)
      : (nextDisable.value = true);
    return;
  }
  accountFieldsRef.value.classList.remove("hidden");
  accountValue.value.length
    ? (nextDisable.value = false)
    : (nextDisable.value = true);
  return (hasReceivableFromGov.value = val);
};

const handleAccountValue = (val) => {
  if (val.length) {
    nextDisable.value = false;
  } else {
    nextDisable.value = true;
  }
  return (accountValue.value = val);
};

const next = async () => {
  if (hasReceivable.value === "No") {
    await store.dispatch("businessCollateral/sendBusinessCollateralFields", [
      {
        type: "accounts_receivable_value",
        value: parseInt(""),
      },
    ]);
    await store.dispatch("businessCollateral/sendStatement", {
      type: "has_collateral",
      requiredData: { value: true },
    });
    await store.dispatch("businessCollateral/sendStatement", {
      type: "has_accounts_receivable",
      requiredData: { value: false },
    });
    await store.dispatch("aspects/fetchFinancialsStatuses", [
      "business_collateral",
    ]);
    return router.push(
      "/fundability/financials/business-collateral/titled-equipment"
    );
  }
  // If receivable === Yes
  await store.dispatch("businessCollateral/sendStatement", {
    type: "has_collateral",
    requiredData: { value: true },
  });
  await store.dispatch("businessCollateral/sendStatement", {
    type: "has_accounts_receivable",
    requiredData: { value: true },
  });
  await store.dispatch("businessCollateral/sendStatement", {
    type: "has_accounts_receivable_from_gov",
    requiredData: { value: hasReceivableFromGov.value === "Yes" },
  });
  await store.dispatch("businessCollateral/sendBusinessCollateralFields", [
    {
      type: "accounts_receivable_value",
      value: parseInt(accountValue.value),
    },
  ]);
  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "business_collateral",
  ]);
  return router.push(
    "/fundability/financials/business-collateral/titled-equipment"
  );
};
</script>
