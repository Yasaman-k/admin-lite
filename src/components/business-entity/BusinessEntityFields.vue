<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<template>
  <form @submit.prevent="save" class="mt-10">
    <div class="flex flex-col gap-5">
      <BaseInput
        @input="
          (e) => {
            dateValid = true;
            maskDate(e.target);
          }
        "
        @blur="(e) => updateDate(e.target.value)"
        @focus="(e) => focus(e.target)"
        :value="date"
        label="When did you file? MM/YYYY"
        placeholder="MM/YYYY"
        length="10"
        :error="!dateValid"
        :errorMessage="validMessage"
      />

      <BaseAutoCompleteInput
        @input="(e) => (state = e.target.textContent)"
        @clearPlaceholder="() => (statePlaceholder = '')"
        label="What state did you file in?"
        :placeholder="statePlaceholder"
        :value="state"
        errorMessage="State is required"
        :suggestionList="states"
      />
    </div>
    <BaseBackNextBtns nextLabel="Save" :nextDisabled="saveDisable" />
  </form>
</template>

<script setup>
import moment from "moment";
import { states } from "../../states";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { onMounted, onUpdated } from "@vue/runtime-core";
import { useStore } from "vuex";
import BaseInput from "../BaseInput.vue";
import BaseAutoCompleteInput from "../BaseAutoCompleteInput.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const router = useRouter();
const store = useStore();

// Data
const saveDisable = ref(true);
const date = ref("");
const dateValid = ref(true);
const validMessage = ref("Date is required.");

const state = ref("");
const statePlaceholder = ref("What state did you file in?");

// Hooks

onMounted(() => {
  const entityFields = store.getters["entity/getEntityFields"];
  if (entityFields.length) {
    // Date
    const businessCreatedAt = entityFields.filter((field) => {
      return Object.keys(field)[0] === "business_created_at";
    });
    if (businessCreatedAt) {
      businessCreatedAt.length && businessCreatedAt[0].business_created_at.data
        ? (date.value = businessCreatedAt[0].business_created_at.data)
        : (date.value = "");
    }
    // Industry -- Removed

    // State
    const businessStateIncorporated = entityFields.filter((field) => {
      return Object.keys(field)[0] === "business_state_incorporated";
    });
    if (businessStateIncorporated) {
      businessStateIncorporated.length &&
      businessStateIncorporated[0].business_state_incorporated.data
        ? (state.value =
            businessStateIncorporated[0].business_state_incorporated.data)
        : (state.value = "");
    }
  }
  let nameExist = states.findIndex(
    (el) => el.name.toUpperCase() === state.value.toUpperCase()
  );
  let codeExist = states.findIndex(
    (el) => el.abbreviation.toUpperCase() === state.value.toUpperCase()
  );
  let stateError = false;
  codeExist === -1 && nameExist === -1
    ? (stateError = true)
    : (stateError = false);

  const dateArr = date.value.split(" ");
  if (
    moment(dateArr[0] + " 01, " + dateArr[1]).format("MMMM YYYY") !=
      "Invalid date" &&
    moment(date.value, "MMMM YYYY", true).isValid() &&
    !stateError
  ) {
    return (saveDisable.value = false);
  }
  return (saveDisable.value = true);
});

onUpdated(() => {
  let nameExist = states.findIndex(
    (el) => el.name.toUpperCase() === state.value.toUpperCase()
  );
  let codeExist = states.findIndex(
    (el) => el.abbreviation.toUpperCase() === state.value.toUpperCase()
  );
  let stateError = false;
  codeExist === -1 && nameExist === -1
    ? (stateError = true)
    : (stateError = false);
  const dateArr = date.value.split(" ");
  if (
    moment(dateArr[0] + " 01, " + dateArr[1]).format("MMMM YYYY") !=
      "Invalid date" &&
    moment(date.value, "MMMM YYYY", true).isValid() &&
    !stateError
  ) {
    return (saveDisable.value = false);
  }
  return (saveDisable.value = true);
});

// Methods
const save = async () => {
  const entityType = store.getters["entity/getEntityType"];
  await store.dispatch("entity/sendEntityFields", [
    {
      type: "entity_type",
      value: entityType,
    },
    {
      type: "business_created_at",
      value: date.value,
    },

    {
      type: "business_state_incorporated",
      value: state.value,
    },
  ]);
  await store.dispatch("aspects/fetchFoundationStatuses", ["business_entity"]);
  return router.push("/fundability/foundation/business-entity/match");
};

const focus = (input) => {
  const dateArr = date.value.split("/");
  let month = dateArr[0];
  let year = dateArr[1];
  if (moment(month + "/01/" + year, "MMMM YYYY", true).isValid()) {
    input.value = moment(month + "/01/" + year).format("MMMM YYYY");
    return (date.value = input.value);
  }
};

const maskDate = (input) => {
  if (/[0-9\\.\\/]\d*$/.test(input.value) && input.value.length <= 7) {
    const newVal = input.value.replace(/\D/g, "").match(/(\d{0,2})(\d{0,4})/);
    const newDate = !newVal[2] ? newVal[1] : newVal[1] + "/" + newVal[2];
    input.oldValue = newDate;
    date.value = newDate;
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue") && input.value.length > 1) {
    input.value = input.oldValue;
    date.value = input.oldValue;
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    date.value = "";
  }
};

const updateDate = (newDate) => {
  if (newDate.length === 0) {
    dateValid.value = false;
    return (validMessage.value = "Date is required.");
  } else if (newDate.length === 7) {
    const dateArr = newDate.split("/");
    let month = dateArr[0];
    let year = dateArr[1];
    let currentDate = new Date();
    let currentYear = moment(currentDate).format("YYYY");

    if (
      parseFloat(month) > 0 &&
      parseFloat(month) < 13 &&
      parseFloat(year) > 1900 &&
      parseFloat(year) <= parseFloat(currentYear)
    ) {
      dateValid.value = true;
      return (date.value = moment(month + "/01/" + year).format("MMMM YYYY"));
    }

    dateValid.value = false;
    return (validMessage.value = "Date is invalid.");
  }
  dateValid.value = true;
  return (date.value = moment("01/" + newDate).format("MMMM YYYY"));
};
</script>
