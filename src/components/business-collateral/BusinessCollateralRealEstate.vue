<template>
  <section class="container my-16 px-20">
    <BaseRadioQuestion
      radioName="real-estate"
      question="Do you own any Commercial Real Estate?"
      firstLabel="Yes"
      firstValue="Yes"
      secondLabel="No"
      secondValue="No"
      :answer="realEstateAnswer"
      @onChange="(val) => handleAnswer(val)"
    />
    <form @submit.prevent ref="formRef" class="mt-20 hidden">
      <p class="text-[#196499] text-xl font-medium">
        What is the total valuation?
      </p>
      <p class="text-[#061017] my-4">
        Enter Commercial Real Estate info to help determine the total valuation.
      </p>
      <BaseInput
        @input="(e) => maskCommercialProperties(e.target)"
        :value="commercialPropertiesNum"
        placeholder="Number of Commercial Properties"
        label="Number of Commercial Properties"
        errorMessage="Number of Commercial Properties is required."
        :required="true"
        class="mt-4"
      />
      <BaseInput
        @input="(e) => maskTotalEstimated(e.target)"
        :value="totalEstimated"
        placeholder="Total estimated value for all"
        label="Total estimated value for all"
        errorMessage="Total estimated value for all is required."
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
const realEstateAnswer = ref("");
const commercialPropertiesNum = ref("");
const totalEstimated = ref("");

// Hooks
onBeforeMount(() => {
  const statements = store.getters["businessCollateral/getStatements"];
  let hasRealEstate;
  if (statements.length) {
    hasRealEstate = statements.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "has_commercial_real_estate")
    );

    hasRealEstate && hasRealEstate.has_commercial_real_estate
      ? (hasRealEstate = hasRealEstate.has_commercial_real_estate.value)
      : (hasRealEstate = "");
    realEstateAnswer.value =
      hasRealEstate === true ? "Yes" : hasRealEstate === false ? "No" : "";
  }
});

onMounted(() => {
  const collateralFields =
    store.getters["businessCollateral/getCollateralFields"];
  let realStateCount = "";
  let realStateValue = "";
  if (collateralFields.length) {
    // Get real estate count
    realStateCount = collateralFields.find((field) =>
      Object.prototype.hasOwnProperty.call(
        field,
        "commercial_real_estate_count"
      )
    );

    realStateCount &&
    realStateCount.commercial_real_estate_count &&
    realStateCount.commercial_real_estate_count.data
      ? (realStateCount = realStateCount.commercial_real_estate_count.data)
      : (realStateCount = "");
    commercialPropertiesNum.value = realStateCount;

    // Get real estate value
    realStateValue = collateralFields.find((field) =>
      Object.prototype.hasOwnProperty.call(
        field,
        "commercial_real_estate_value"
      )
    );

    realStateValue &&
    realStateValue.commercial_real_estate_value &&
    realStateValue.commercial_real_estate_value.data
      ? (realStateValue = realStateValue.commercial_real_estate_value.data)
      : (realStateValue = "");
    totalEstimated.value = realStateValue;
  }

  if (
    realEstateAnswer.value === "Yes" &&
    commercialPropertiesNum.value.length &&
    totalEstimated.value.length
  ) {
    formRef.value.classList.remove("hidden");
    nextDisabled.value = false;
  } else if (realEstateAnswer.value === "Yes") {
    formRef.value.classList.remove("hidden");
    nextDisabled.value = true;
  } else if (realEstateAnswer.value === "No") {
    formRef.value.classList.add("hidden");
    return (nextDisabled.value = false);
  }
});

onUpdated(() => {
  if (
    realEstateAnswer.value === "Yes" &&
    commercialPropertiesNum.value.length &&
    totalEstimated.value.length
  ) {
    formRef.value.classList.remove("hidden");
    nextDisabled.value = false;
  } else if (realEstateAnswer.value === "Yes") {
    formRef.value.classList.remove("hidden");
    nextDisabled.value = true;
  } else if (realEstateAnswer.value === "No") {
    formRef.value.classList.add("hidden");
    nextDisabled.value = false;
  }
});

watch(commercialPropertiesNum.value, (newNum) => {
  if (
    newNum.length &&
    totalEstimated.value.length &&
    realEstateAnswer.value === "Yes"
  ) {
    nextDisabled.value = false;
  } else {
    nextDisabled.value = true;
  }
});

watch(totalEstimated.value, (newTotal) => {
  if (
    newTotal.length &&
    commercialPropertiesNum.value.length &&
    realEstateAnswer.value === "Yes"
  ) {
    nextDisabled.value = false;
  } else {
    nextDisabled.value = true;
  }
});

// Methods
const maskCommercialProperties = (input) => {
  if (/^-?\d*$/.test(input.value)) {
    input.oldValue = input.value;
    commercialPropertiesNum.value = input.value;
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue")) {
    input.value = input.oldValue;
    commercialPropertiesNum.value = input.oldValue;
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    commercialPropertiesNum.value = "";
  }
};

const maskTotalEstimated = (input) => {
  if (/^-?\d*$/.test(input.value)) {
    input.oldValue = input.value;
    totalEstimated.value = input.value;
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue")) {
    input.value = input.oldValue;
    totalEstimated.value = input.oldValue;
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    totalEstimated.value = "";
  }
};

const handleAnswer = (val) => {
  if (val === "No") {
    nextDisabled.value = false;
    formRef.value.classList.add("hidden");
  } else {
    formRef.value.classList.remove("hidden");
    if (commercialPropertiesNum.value.length && totalEstimated.value.length) {
      nextDisabled.value = false;
    } else {
      nextDisabled.value = true;
    }
  }
  return (realEstateAnswer.value = val);
};

const next = async () => {
  if (realEstateAnswer.value === "No") {
    await store.dispatch("businessCollateral/sendStatement", {
      type: "has_commercial_real_estate",
      requiredData: { value: false },
    });
    await store.dispatch("businessCollateral/sendBusinessCollateralFields", [
      {
        type: "commercial_real_estate_count",
        value: parseInt(""),
      },
      {
        type: "commercial_real_estate_value",
        value: parseInt(""),
      },
    ]);
    await store.dispatch("aspects/fetchFinancialsStatuses", [
      "business_collateral",
    ]);
    return router.push("/fundability/financials/business-collateral/401k");
  }
  await store.dispatch("businessCollateral/sendBusinessCollateralFields", [
    {
      type: "commercial_real_estate_count",
      value: parseInt(commercialPropertiesNum.value),
    },
    {
      type: "commercial_real_estate_value",
      value: parseInt(totalEstimated.value),
    },
  ]);
  await store.dispatch("businessCollateral/sendStatement", {
    type: "has_commercial_real_estate",
    requiredData: { value: true },
  });
  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "business_collateral",
  ]);
  router.push("/fundability/financials/business-collateral/401k");
};
</script>
