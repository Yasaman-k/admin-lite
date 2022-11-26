<template>
  <section class="container my-16 px-20">
    <BaseRadioQuestion
      radioName="401k"
      question="Are there any 401ks to offer as collateral?"
      firstLabel="Yes"
      firstValue="Yes"
      secondLabel="No"
      secondValue="No"
      :answer="any401kAnswer"
      @onChange="(val) => handleAnswer(val)"
    />
    <form @submit.prevent ref="formRef" class="mt-20 hidden">
      <p class="text-[#196499] text-xl font-medium">
        What is the total valuation?
      </p>
      <p class="text-[#061017] my-4">
        Enter the estimated total value of all 401ks to be used as collateral
        (for all business owners who own 20% or more of the company).
      </p>
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
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const store = useStore();
const router = useRouter();
const formRef = ref(null);
const nextDisabled = ref(true);
const any401kAnswer = ref("");
const totalCombinedValue = ref("");

// Hooks
onBeforeMount(() => {
  const statements = store.getters["businessCollateral/getStatements"];
  let hasAny401;
  if (statements.length) {
    hasAny401 = statements.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "has_401ks_as_collateral")
    );

    hasAny401 && hasAny401.has_401ks_as_collateral
      ? (hasAny401 = hasAny401.has_401ks_as_collateral.value)
      : (hasAny401 = "");
    any401kAnswer.value =
      hasAny401 === true ? "Yes" : hasAny401 === false ? "No" : "";
  }
});

onMounted(() => {
  const collateralFields =
    store.getters["businessCollateral/getCollateralFields"];
  let totalCombined = "";
  if (collateralFields.length) {
    // Get 401ks
    totalCombined = collateralFields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "401ks_value")
    );

    totalCombined &&
    totalCombined["401ks_value"] &&
    totalCombined["401ks_value"].data
      ? (totalCombined = totalCombined["401ks_value"].data)
      : (totalCombined = "");
    totalCombinedValue.value = totalCombined;
  }
  if (any401kAnswer.value === "Yes" && totalCombinedValue.value.length) {
    formRef.value.classList.remove("hidden");
    return (nextDisabled.value = false);
  } else if (any401kAnswer.value === "Yes") {
    formRef.value.classList.remove("hidden");
    return (nextDisabled.value = true);
  } else if (any401kAnswer.value === "No") {
    formRef.value.classList.add("hidden");
    return (nextDisabled.value = false);
  }
});

onUpdated(() => {
  if (any401kAnswer.value === "Yes" && totalCombinedValue.value.length) {
    formRef.value.classList.remove("hidden");
    nextDisabled.value = false;
  } else if (any401kAnswer.value === "Yes") {
    formRef.value.classList.remove("hidden");
    nextDisabled.value = true;
  } else if (any401kAnswer.value === "No") {
    formRef.value.classList.add("hidden");
    nextDisabled.value = false;
  }
});

watch(totalCombinedValue, (newCombinedValue) => {
  if (newCombinedValue.length && any401kAnswer.value === "Yes") {
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
  return (any401kAnswer.value = val);
};

const next = async () => {
  if (any401kAnswer.value === "No") {
    await store.dispatch("businessCollateral/sendStatement", {
      type: "has_401ks_as_collateral",
      requiredData: { value: false },
    });
    await store.dispatch("businessCollateral/sendBusinessCollateralFields", [
      {
        type: "401ks_value",
        value: parseInt(""),
      },
    ]);
    await store.dispatch("aspects/fetchFinancialsStatuses", [
      "business_collateral",
    ]);
    return router.push(
      "/fundability/financials/business-collateral/securities-accounts"
    );
  }
  await store.dispatch("businessCollateral/sendBusinessCollateralFields", [
    {
      type: "401ks_value",
      value: parseInt(totalCombinedValue.value),
    },
  ]);
  await store.dispatch("businessCollateral/sendStatement", {
    type: "has_401ks_as_collateral",
    requiredData: { value: true },
  });
  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "business_collateral",
  ]);
  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "business_collateral",
  ]);
  return router.push(
    "/fundability/financials/business-collateral/securities-accounts"
  );
};
</script>
