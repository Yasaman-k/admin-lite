<template>
  <section class="container my-16 px-20">
    <BaseRadioQuestion
      question="Do you have any securities account?"
      radioName="securities-accounts"
      firstLabel="Yes"
      firstValue="Yes"
      secondLabel="No"
      secondValue="No"
      :answer="hasSecuritiesAccounts"
      @onChange="(val) => handleHasSecuritiesAccounts(val)"
    />
    <div class="mt-16 hidden" ref="stillContributingQuestionRef">
      <BaseRadioQuestion
        question="Are you still contributing to any securities accounts?"
        radioName="still-contributing"
        firstLabel="Yes"
        firstValue="Yes"
        secondLabel="No"
        secondValue="No"
        :answer="stillContributing"
        @onChange="(val) => handleStillContributingValue(val)"
      />
    </div>
    <div class="mt-20 hidden" ref="securitiesAccountsInputRef">
      <p class="text-[#196499] text-xl font-medium">
        What is the total valuation of contributing accounts?
      </p>
      <p class="text-[#061017] my-4">
        Please enter the total valuation of all your securities accounts.
      </p>
      <BaseInput
        @input="(e) => handleSecuritiesAccountsValue(e.target.value)"
        :value="securitiesAccountsValue"
        placeholder="Total estimated value for all"
        label="Total estimated value for all"
        :required="true"
        errorMessage="Total estimated value is required."
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
const securitiesAccountsInputRef = ref(null);
const hasSecuritiesAccounts = ref("");
const stillContributingQuestionRef = ref(null);
const stillContributing = ref("");
const securitiesAccountsValue = ref("");

// Hooks
onBeforeMount(() => {
  // Get The Answers Yes or No
  const statements = store.getters["businessCollateral/getStatements"];
  if (statements.length) {
    hasSecuritiesAccounts.value = statements.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "has_securities_accounts")
    );

    if (hasSecuritiesAccounts.value) {
      const securitiesAccounts =
        hasSecuritiesAccounts.value.has_securities_accounts;
      securitiesAccounts && securitiesAccounts.value
        ? (hasSecuritiesAccounts.value = "Yes")
        : securitiesAccounts && securitiesAccounts.value === false
        ? (hasSecuritiesAccounts.value = "No")
        : (hasSecuritiesAccounts.value = "");
    } else {
      hasSecuritiesAccounts.value = "";
    }

    // Get still contributing answer
    stillContributing.value = statements.find((field) =>
      Object.prototype.hasOwnProperty.call(
        field,
        "has_contributing_to_securities_accounts"
      )
    );

    if (stillContributing.value) {
      const contributingAccounts =
        stillContributing.value.has_contributing_to_securities_accounts;
      contributingAccounts && contributingAccounts.value
        ? (stillContributing.value = "Yes")
        : contributingAccounts && contributingAccounts.value === false
        ? (stillContributing.value = "No")
        : (stillContributing.value = "");
    } else {
      stillContributing.value = "";
    }
  }

  // Get Accounts Value
  const fields = store.getters["businessCollateral/getCollateralFields"];
  if (fields.length) {
    securitiesAccountsValue.value = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "securities_accounts_value")
    );

    if (securitiesAccountsValue.value) {
      const securitiesTotalValue =
        securitiesAccountsValue.value.securities_accounts_value;
      securitiesTotalValue && securitiesTotalValue.data
        ? (securitiesAccountsValue.value = securitiesTotalValue.data)
        : (securitiesAccountsValue.value = "");
      return;
    }
    return (securitiesAccountsValue.value = "");
  }
});

onMounted(() => {
  if (
    hasSecuritiesAccounts.value === "Yes" &&
    stillContributing.value === "No"
  ) {
    stillContributingQuestionRef.value.classList.remove("hidden");
    return (nextDisable.value = false);
  } else if (
    hasSecuritiesAccounts.value === "Yes" &&
    stillContributing.value === "Yes"
  ) {
    stillContributingQuestionRef.value.classList.remove("hidden");
    securitiesAccountsInputRef.value.classList.remove("hidden");
    securitiesAccountsValue.value.length
      ? (nextDisable.value = false)
      : (nextDisable.value = true);
    return;
  } else if (stillContributing.value === "No") {
    securitiesAccountsInputRef.value.classList.add("hidden");
    stillContributingQuestionRef.value.classList.add("hidden");
    return (nextDisable.value = false);
  }
  securitiesAccountsInputRef.value.classList.add("hidden");
  stillContributingQuestionRef.value.classList.add("hidden");
  return (nextDisable.value = true);
});

// Methods
const handleHasSecuritiesAccounts = (val) => {
  if (val === "No") {
    stillContributingQuestionRef.value.classList.add("hidden");
    securitiesAccountsInputRef.value.classList.add("hidden");
    hasSecuritiesAccounts.value = val;
    return (nextDisable.value = false);
  } else if (val === "Yes" && stillContributing.value === "No") {
    hasSecuritiesAccounts.value = val;
    stillContributingQuestionRef.value.classList.remove("hidden");
    return (nextDisable.value = false);
  } else if (val === "Yes" && stillContributing.value === "Yes") {
    stillContributingQuestionRef.value.classList.remove("hidden");
    securitiesAccountsInputRef.value.classList.remove("hidden");
    securitiesAccountsValue.value.length
      ? (nextDisable.value = false)
      : (nextDisable.value = true);
    return (hasSecuritiesAccounts.value = val);
  } else if (val === "Yes" && !stillContributing.value.length) {
    stillContributingQuestionRef.value.classList.remove("hidden");
    nextDisable.value = true;
    return (hasSecuritiesAccounts.value = val);
  }
};

const handleStillContributingValue = (val) => {
  if (val === "No") {
    securitiesAccountsInputRef.value.classList.add("hidden");
    stillContributing.value = val;
    hasSecuritiesAccounts.value.length
      ? (nextDisable.value = false)
      : (nextDisable.value = true);
    return;
  }
  stillContributing.value = val;
  securitiesAccountsInputRef.value.classList.remove("hidden");
  securitiesAccountsValue.value.length
    ? (nextDisable.value = false)
    : (nextDisable.value = true);
};

const handleSecuritiesAccountsValue = (val) => {
  val.length ? (nextDisable.value = false) : (nextDisable.value = true);
  return (securitiesAccountsValue.value = val);
};

const next = async () => {
  if (hasSecuritiesAccounts.value === "No") {
    await store.dispatch("businessCollateral/sendBusinessCollateralFields", [
      {
        type: "securities_accounts_value",
        value: parseInt(""),
      },
    ]);
    await store.dispatch("businessCollateral/sendStatement", {
      type: "has_securities_accounts",
      requiredData: { value: false },
    });
    await store.dispatch("aspects/fetchFinancialsStatuses", [
      "business_collateral",
    ]);
    return router.push("/fundability/financials/business-collateral/other");
  }

  // If has securities account === Yes
  await store.dispatch("businessCollateral/sendStatement", {
    type: "has_securities_accounts",
    requiredData: { value: true },
  });
  await store.dispatch("businessCollateral/sendStatement", {
    type: "has_contributing_to_securities_accounts",
    requiredData: { value: stillContributing.value === "Yes" },
  });
  if (stillContributing.value === "No") {
    await store.dispatch("businessCollateral/sendBusinessCollateralFields", [
      {
        type: "securities_accounts_value",
        value: parseInt(""),
      },
    ]);
  } else {
    await store.dispatch("businessCollateral/sendBusinessCollateralFields", [
      {
        type: "securities_accounts_value",
        value: parseInt(securitiesAccountsValue.value),
      },
    ]);
  }
  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "business_collateral",
  ]);
  return router.push("/fundability/financials/business-collateral/other");
};
</script>
