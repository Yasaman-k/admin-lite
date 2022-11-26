<template>
  <section class="container my-16 px-20">
    <BaseRadioQuestion
      radioName="titled-equipment"
      question="Do you have any Titled Equipment?"
      firstLabel="Yes"
      firstValue="Yes"
      secondLabel="No"
      secondValue="No"
      :answer="titledEquipmentAnswer"
      @onChange="(val) => handleAnswer(val)"
    />
    <div class="mt-20 hidden" ref="titledEquipmentForm">
      <p class="text-[#196499] text-xl font-medium">
        Add your Titled Equipment Below:
      </p>
      <p class="text-[#061017] my-4">
        This will help us determine its valuation.
      </p>

      <BusinessCollateralTitledEquipmentForm />
    </div>
    <BaseBackNextBtns :nextDisabled="nextDisabled" @next="next" />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount, onMounted, onUpdated, watch } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import BaseRadioQuestion from "../BaseRadioQuestion.vue";
import BusinessCollateralTitledEquipmentForm from "./BusinessCollateralTitledEquipmentForm.vue";

const store = useStore();
const router = useRouter();
const nextDisabled = ref(true);
const titledEquipmentAnswer = ref("");
const titledEquipmentForm = ref(null);

// Hooks
onBeforeMount(() => {
  // Get The Answer Yes or No
  const statements = store.getters["businessCollateral/getStatements"];
  let hasTitledEquipment = "";
  if (statements.length) {
    hasTitledEquipment = statements.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "has_titled_equipment")
    );

    hasTitledEquipment && hasTitledEquipment.has_titled_equipment
      ? (hasTitledEquipment = hasTitledEquipment.has_titled_equipment.value)
      : (hasTitledEquipment = "");
    titledEquipmentAnswer.value =
      hasTitledEquipment === true
        ? "Yes"
        : hasTitledEquipment === false
        ? "No"
        : "";
  }
});

onMounted(() => {
  const equipments = store.getters["businessCollateral/getEquipment"];
  if (titledEquipmentAnswer.value === "Yes" && equipments.length) {
    titledEquipmentForm.value.classList.remove("hidden");
    nextDisabled.value = false;
  } else if (titledEquipmentAnswer.value === "Yes") {
    titledEquipmentForm.value.classList.remove("hidden");
    nextDisabled.value = true;
  } else {
    titledEquipmentForm.value.classList.add("hidden");
    nextDisabled.value = false;
  }
});

onUpdated(() => {
  const equipments = store.getters["businessCollateral/getEquipment"];
  if (titledEquipmentAnswer.value === "Yes" && equipments.length) {
    titledEquipmentForm.value.classList.remove("hidden");
    nextDisabled.value = false;
  } else if (titledEquipmentAnswer.value === "Yes") {
    titledEquipmentForm.value.classList.remove("hidden");
    nextDisabled.value = true;
  } else if (titledEquipmentAnswer.value === "No") {
    titledEquipmentForm.value.classList.add("hidden");
    nextDisabled.value = false;
  }
});

watch(store.state, (newState) => {
  const titledEquipmentFields = newState.businessCollateral.equipment;
  if (titledEquipmentAnswer.value === "Yes" && titledEquipmentFields.length) {
    titledEquipmentForm.value.classList.remove("hidden");
    nextDisabled.value = false;
  } else if (titledEquipmentAnswer.value === "Yes") {
    titledEquipmentForm.value.classList.remove("hidden");
    nextDisabled.value = true;
  } else if (titledEquipmentAnswer.value === "No") {
    titledEquipmentForm.value.classList.add("hidden");
    nextDisabled.value = false;
  }
});

// Methods
const handleAnswer = (val) => {
  if (val === "No") {
    titledEquipmentForm.value.classList.add("hidden");
    nextDisabled.value = false;
  } else {
    titledEquipmentForm.value.classList.remove("hidden");
    nextDisabled.value = true;
  }
  return (titledEquipmentAnswer.value = val);
};

const next = async () => {
  if (titledEquipmentAnswer.value === "No") {
    await store.dispatch("businessCollateral/sendStatement", {
      type: "has_titled_equipment",
      requiredData: { value: false },
    });
    await store.dispatch("aspects/fetchFinancialsStatuses", [
      "business_collateral",
    ]);
    return router.push(
      "/fundability/financials/business-collateral/real-estate"
    );
  }
  await store.dispatch("businessCollateral/sendStatement", {
    type: "has_titled_equipment",
    requiredData: { value: true },
  });
  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "business_collateral",
  ]);
  return router.push("/fundability/financials/business-collateral/real-estate");
};
</script>
