<template>
  <form @submit.prevent class="mt-5">
    <BaseInput
      @input="(e) => (businessName = e.target.value)"
      :value="businessName"
      placeholder="Business Name"
      label="Business Name"
      errorMessage="Business Name is required."
      :required="true"
    />
    <BaseInput
      @input="(e) => (addressLineOne = e.target.value)"
      :value="addressLineOne"
      placeholder="Address Line 1"
      label="Address Line 1"
      errorMessage="Address Line 1 is required."
      :required="true"
      class="mt-4"
    />
    <BaseInput
      @input="(e) => (addressLineTwo = e.target.value)"
      :value="addressLineTwo"
      placeholder="Address Line 2"
      label="Address Line 2"
      class="mt-4"
    />
    <div class="grid md:grid-cols-3 md:gap-10">
      <BaseInput
        @input="(e) => (city = e.target.value)"
        :value="city"
        placeholder="City"
        label="City"
        :required="true"
        errorMessage="City is required."
        class="mt-4"
      />
      <BaseAutoCompleteInput
        @input="(e) => (state = e.target.textContent)"
        @change="(e) => (state = e.target.textContent)"
        @clearPlaceholder="() => (statePlaceholder = '')"
        :value="state"
        :placeholder="statePlaceholder"
        name="State"
        errorMessage="State is required."
        :suggestionList="states"
        class="mt-4"
      />
      <BaseInput
        @input="
          (e) => {
            zipError = false;
            maskZip(e.target);
          }
        "
        @blur="(e) => zipValid(e.target)"
        length="5"
        :value="zipCode"
        placeholder="00000"
        label="Zip Code"
        :required="true"
        :error="zipError"
        :errorMessage="zipErrorMessage"
        class="mt-4"
      />
    </div>
    <BaseBackNextBtns
      nextLabel="Save"
      :nextDisabled="saveDisable"
      @next="save"
    />
  </form>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import { states } from "../../states";
import BaseInput from "../BaseInput.vue";
import BaseAutoCompleteInput from "../BaseAutoCompleteInput.vue";

const emit = defineEmits(["save"]);

//data
const businessName = ref("");
const addressLineOne = ref("");
const addressLineTwo = ref("");
const city = ref("");
const state = ref("");
const statePlaceholder = ref("");
const zipCode = ref("");
const zipError = ref(false);
const zipErrorMessage = ref("");
const saveDisable = ref(true);

//props
const props = defineProps({
  addressType: {
    type: String,
    default: "",
  },
  businessNameProp: {
    type: String,
    default: "",
  },
  addressLineOneProp: {
    type: String,
    default: "",
  },
  addressLineTwoProp: {
    type: String,
    default: "",
  },
  cityProp: {
    type: String,
    default: "",
  },
  stateProp: {
    type: String,
    default: "",
  },
  zipCodeProp: {
    type: String,
    default: "",
  },
  vendorName: {
    type: String,
    default: "",
  },
});

//methods
const save = () => {
  saveDisable.value = true;
  const data = [
    {
      type: "company",
      value: businessName.value,
    },
    {
      type: "business_address_type",
      value: props.addressType,
    },
    {
      type: "business_address_street",
      value: addressLineOne.value,
    },
    {
      type: "business_address_city",
      value: city.value,
    },
    {
      type: "business_address_state",
      value: state.value,
    },
    {
      type: "business_address_zip",
      value: zipCode.value,
    },
  ];
  addressLineTwo.value.length
    ? data.push({
        type: "business_address_line2",
        value: addressLineTwo.value,
      })
    : data.push({
        type: "business_address_line2",
        value: "",
      });
  props.vendorName.length
    ? data.push({
        type: "virtual_address_vendor",
        value: props.vendorName,
      })
    : null;
  emit("save", data);
  saveDisable.value = false;
};

const maskZip = (input) => {
  if (/^-?\d*$/.test(input.value)) {
    input.oldValue = input.value;
    zipCode.value = input.value;
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue")) {
    input.value = input.oldValue;
    zipCode.value = input.oldValue;
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    zipCode.value = "";
  }
};

const zipValid = () => {
  if (zipCode.value.length === 0) {
    zipError.value = true;
    return (zipErrorMessage.value = "Zip code is required.");
  } else if (zipCode.value.length < 5) {
    zipError.value = true;
    return (zipErrorMessage.value = "Zip code must be five digits.");
  } else {
    zipError.value = false;
  }
};

const capitalize = (str) => {
  return str.charAt().toUpperCase() + str.slice(1);
};

//hooks
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
  if (
    businessName.value.length &&
    addressLineOne.value.length &&
    city.value.length &&
    state.value.length &&
    !stateError &&
    zipCode.value.length === 5 &&
    !zipError.value
  ) {
    return (saveDisable.value = false);
  } else {
    return (saveDisable.value = true);
  }
});

onMounted(() => {
  businessName.value = props.businessNameProp || "";
  addressLineOne.value = props.addressLineOneProp || "";
  addressLineTwo.value = props.addressLineTwoProp || "";
  city.value = props.cityProp || "";
  state.value = (props.stateProp && capitalize(props.stateProp)) || "";
  zipCode.value = props.zipCodeProp || "";
});
</script>
