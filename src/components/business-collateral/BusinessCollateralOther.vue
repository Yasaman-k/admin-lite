<template>
  <section class="container my-16 px-20">
    <BaseRadioQuestion
      question="Do you have Any Other Forms of Collateral?"
      radioName="other"
      firstLabel="Yes"
      firstValue="Yes"
      secondLabel="No"
      secondValue="No"
      :answer="otherAnswer"
      @onChange="(val) => handleAnswer(val)"
    />
    <form @submit.prevent ref="formRef" class="mt-20 hidden">
      <p class="text-[#196499] text-xl font-medium">
        What is the total valuation?
      </p>
      <p class="text-[#061017] my-4">
        Estimate the current total value of any other collateral available.
      </p>
      <BaseInput
        @input="(e) => (typesOfCollateral = e.target.value)"
        :value="typesOfCollateral"
        placeholder="Enter each type of Collateral"
        label="Enter each type of Collateral"
        errorMessage="Each type of Collateral is required."
        :required="true"
        class="mt-4"
      />
      <BaseInput
        @input="(e) => maskCombinedValue(e.target)"
        :value="totalCombinedValue"
        placeholder="$ Total Combined Value"
        label="$ Total Combined Value"
        errorMessage="$ Total Combined Value is required."
        :required="true"
        class="mt-4"
      />
    </form>
    <BaseBackNextBtns :nextDisabled="nextDisabled" @next="next" />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount, onMounted, onUpdated, watch } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import BaseInput from "../BaseInput.vue";

const store = useStore();
const router = useRouter();
const formRef = ref(null);
const nextDisabled = ref(true);
const otherAnswer = ref("");
const typesOfCollateral = ref("");
const totalCombinedValue = ref("");

// Hooks
onBeforeMount(() => {
  const statements = store.getters["businessCollateral/getStatements"];
  let hasOtherCollateral;
  if (statements.length) {
    hasOtherCollateral = statements.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "has_other_collateral")
    );

    hasOtherCollateral && hasOtherCollateral.has_other_collateral
      ? (hasOtherCollateral = hasOtherCollateral.has_other_collateral.value)
      : (hasOtherCollateral = "");
    otherAnswer.value =
      hasOtherCollateral === true
        ? "Yes"
        : hasOtherCollateral === false
        ? "No"
        : "";
  }
});

onMounted(() => {
  const collateralFields =
    store.getters["businessCollateral/getCollateralFields"];
  let collateralTypes = "";
  let combinedValue = "";
  if (collateralFields.length) {
    // Get Collateral Types
    collateralTypes = collateralFields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "other_collateral_types")
    );

    collateralTypes &&
    collateralTypes.other_collateral_types &&
    collateralTypes.other_collateral_types.data
      ? (collateralTypes = collateralTypes.other_collateral_types.data)
      : (collateralTypes = "");
    typesOfCollateral.value = collateralTypes;

    // Get Combined Value
    combinedValue = collateralFields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "other_collateral_value")
    );

    combinedValue &&
    combinedValue.other_collateral_value &&
    combinedValue.other_collateral_value.data
      ? (combinedValue = combinedValue.other_collateral_value.data)
      : (combinedValue = "");
    totalCombinedValue.value = String(combinedValue);
  }
  if (
    otherAnswer.value === "Yes" &&
    typesOfCollateral.value.length &&
    totalCombinedValue.value.length
  ) {
    formRef.value.classList.remove("hidden");
    nextDisabled.value = false;
  } else if (otherAnswer.value === "Yes") {
    formRef.value.classList.remove("hidden");
    nextDisabled.value = true;
  } else if (otherAnswer.value === "No") {
    formRef.value.classList.add("hidden");
    nextDisabled.value = false;
  }
});

onUpdated(() => {
  if (
    otherAnswer.value === "Yes" &&
    typesOfCollateral.value.length &&
    totalCombinedValue.value.length
  ) {
    formRef.value.classList.remove("hidden");
    nextDisabled.value = false;
  } else if (otherAnswer.value === "Yes") {
    formRef.value.classList.remove("hidden");
    nextDisabled.value = true;
  } else if (otherAnswer.value === "No") {
    formRef.value.classList.add("hidden");
    nextDisabled.value = false;
  }
});

watch(totalCombinedValue, (newCombinedValue) => {
  if (newCombinedValue.length && otherAnswer.value === "Yes") {
    nextDisabled.value = false;
  } else {
    nextDisabled.value = true;
  }
});

watch(typesOfCollateral, (newValue) => {
  if (
    newValue.length &&
    totalCombinedValue.value.length &&
    otherAnswer.value === "Yes"
  ) {
    nextDisabled.value = false;
  } else {
    nextDisabled.value = true;
  }
});

// Methods
const maskCombinedValue = (input) => {
  if (/^-?\d*$/.test(input.value)) {
    input.oldValue = input.value;
    totalCombinedValue.value = input.value;
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue")) {
    input.value = input.oldValue;
    totalCombinedValue.value = input.oldValue;
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    totalCombinedValue.value = "";
  }
};

const handleAnswer = (val) => {
  if (val === "No") {
    nextDisabled.value = false;
    formRef.value.classList.add("hidden");
  } else {
    formRef.value.classList.remove("hidden");
    if (totalCombinedValue.value.length) {
      nextDisabled.value = false;
    } else {
      nextDisabled.value = true;
    }
  }
  return (otherAnswer.value = val);
};

const next = async () => {
  if (otherAnswer.value === "No") {
    await store.dispatch("businessCollateral/sendBusinessCollateralFields", [
      {
        type: "other_collateral_types",
        value: "",
      },
      {
        type: "other_collateral_value",
        value: parseInt(""),
      },
    ]);
    await store.dispatch("businessCollateral/sendStatement", {
      type: "has_other_collateral",
      requiredData: { value: false },
    });
    await store.dispatch("aspects/fetchFinancialsStatuses", [
      "business_collateral",
    ]);
    return router.push("/fundability/financials/business-collateral/complete");
  }
  await store.dispatch("businessCollateral/sendBusinessCollateralFields", [
    {
      type: "other_collateral_types",
      value: typesOfCollateral.value,
    },
    {
      type: "other_collateral_value",
      value: parseInt(totalCombinedValue.value),
    },
  ]);
  await store.dispatch("businessCollateral/sendStatement", {
    type: "has_other_collateral",
    requiredData: { value: true },
  });
  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "business_collateral",
  ]);
  return router.push("/fundability/financials/business-collateral/complete");
};
</script>
