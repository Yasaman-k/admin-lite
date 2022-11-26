<template>
  <form>
    <div v-if="titledEquipmentFields.length">
      <TitledEquipmentMultipleInput
        v-for="titledEquipmentField in titledEquipmentFields"
        :key="String(titledEquipmentField.id)"
        :id="String(titledEquipmentField.id)"
        :titledEquipmentYear="
          titledEquipmentField.year ? String(titledEquipmentField.year) : ''
        "
        :makeValue="titledEquipmentField.make ? titledEquipmentField.make : ''"
        :modelValue="
          titledEquipmentField.model ? titledEquipmentField.model : ''
        "
        :estimatedValue="
          titledEquipmentField.value ? String(titledEquipmentField.value) : ''
        "
        :completePage="false"
        @yearInput="(e) => updateYear(e.target)"
        @makeInput="(e) => updateMake(e.target)"
        @modelInput="(e) => updateModel(e.target)"
        @estimatedInput="(e) => updateEstimatedValue(e.target)"
        label="Titled Equipment"
        errorMessage="All Fields are required."
        :required="true"
        :disabled="true"
        placeholder="YYYY"
        class="mt-7"
      />
    </div>
    <button
      type="button"
      :class="`btn-primary flex gap-6 items-center mt-5 ${
        !titledEquipmentFields.length ? 'hidden' : ''
      }`"
      ref="addAnotherBtn"
      @click="addAnother"
    >
      Add Another
    </button>
    <div
      ref="addNewForm"
      :class="`mt-3 ${titledEquipmentFields.length ? 'hidden' : ''}`"
    >
      <TitledEquipmentMultipleInput
        :id="null"
        :titledEquipmentYear="newTitledEquipmentFields.year"
        :makeValue="newTitledEquipmentFields.make"
        :modelValue="newTitledEquipmentFields.model"
        :estimatedValue="newTitledEquipmentFields.value"
        @yearInput="(e) => maskYear(e.target)"
        @makeInput="(e) => handleMake(e.target)"
        @modelInput="(e) => handleModel(e.target)"
        @estimatedInput="(e) => handleEstimatedValue(e.target)"
        @submit="addNewTitledEquipment"
        label="Titled Equipment"
        errorMessage="All Fields are required."
        :required="true"
        placeholder="YYYY"
      />
    </div>
  </form>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import TitledEquipmentMultipleInput from "./TitledEquipmentMultipleInput.vue";

const store = useStore();
const addNewForm = ref(null);
const addAnotherBtn = ref(null);
const titledEquipmentFields = ref([]);
const newTitledEquipmentFields = ref({
  year: "",
  make: "",
  model: "",
  value: "",
});

// Hooks
onMounted(() => {
  titledEquipmentFields.value =
    store.getters["businessCollateral/getEquipment"];
});

watch(store.state, (newState) => {
  titledEquipmentFields.value = newState.businessCollateral.equipment;
});

// Methods
const maskYear = (input) => {
  if (/^-?\d*$/.test(input.value)) {
    input.oldValue = input.value;
    newTitledEquipmentFields.value.year = input.value;
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue")) {
    input.value = input.oldValue;
    newTitledEquipmentFields.value.year = input.oldValue;
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    newTitledEquipmentFields.value.year = "";
  }
};

const handleMake = (input) =>
  (newTitledEquipmentFields.value.make = input.value);

const handleModel = (input) =>
  (newTitledEquipmentFields.value.model = input.value);

const handleEstimatedValue = (input) => {
  const val = input.value;
  if (/[0-9]\d*$/.test(val)) {
    input.oldValue = val;
    newTitledEquipmentFields.value.value = val;
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue") && val >= 1) {
    input.value = input.oldValue;
    newTitledEquipmentFields.value.value = input.oldValue;
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    newTitledEquipmentFields.value.value = "";
  }
};

const updateYear = (input) => {
  if (/^-?\d*$/.test(input.value)) {
    input.oldValue = input.value;
    titledEquipmentFields.value = titledEquipmentFields.value.map(
      (titledEquipmentField) => {
        if (input.id === String(titledEquipmentField.id)) {
          return {
            id: titledEquipmentField.id,
            year: input.value,
            make: titledEquipmentField.make,
            model: titledEquipmentField.model,
            value: titledEquipmentField.value,
          };
        }
        return titledEquipmentField;
      }
    );
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue")) {
    input.value = parseInt(input.oldValue);
    titledEquipmentFields.value = titledEquipmentFields.value.map(
      (titledEquipmentField) => {
        if (input.id === String(titledEquipmentField.id)) {
          return {
            id: titledEquipmentField.id,
            year: parseInt(input.oldValue),
            make: titledEquipmentField.make,
            model: titledEquipmentField.model,
            value: titledEquipmentField.value,
          };
        }
        return titledEquipmentField;
      }
    );
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    titledEquipmentFields.value = titledEquipmentFields.value.map(
      (titledEquipmentField) => {
        if (input.id === String(titledEquipmentField.id)) {
          return {
            id: titledEquipmentField.id,
            year: parseInt(""),
            make: titledEquipmentField.make,
            model: titledEquipmentField.model,
            value: titledEquipmentField.value,
          };
        }
        return titledEquipmentField;
      }
    );
  }
};

const updateMake = (input) => {
  titledEquipmentFields.value = titledEquipmentFields.value.map(
    (titledEquipmentField) => {
      if (input.id === String(titledEquipmentField.id)) {
        return {
          id: titledEquipmentField.id,
          year: titledEquipmentField.year,
          make: input.value,
          model: titledEquipmentField.model,
          value: titledEquipmentField.value,
        };
      }
      return titledEquipmentField;
    }
  );
};

const updateModel = (input) => {
  titledEquipmentFields.value = titledEquipmentFields.value.map(
    (titledEquipmentField) => {
      if (input.id === String(titledEquipmentField.id)) {
        return {
          id: titledEquipmentField.id,
          year: titledEquipmentField.year,
          make: titledEquipmentField.make,
          model: input.value,
          value: titledEquipmentField.value,
        };
      }
      return titledEquipmentField;
    }
  );
};

const updateEstimatedValue = (input) => {
  const val = input.value;

  if (/[0-9]\d*$/.test(val)) {
    input.oldValue = val;
    titledEquipmentFields.value = titledEquipmentFields.value.map(
      (titledEquipmentField) => {
        if (input.id === String(titledEquipmentField.id)) {
          return {
            id: titledEquipmentField.id,
            year: titledEquipmentField.year,
            make: titledEquipmentField.make,
            model: titledEquipmentField.model,
            value: val,
          };
        }
        return titledEquipmentField;
      }
    );
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue") && val.length) {
    input.value = parseInt(input.oldValue);
    titledEquipmentFields.value = titledEquipmentFields.value.map(
      (titledEquipmentField) => {
        if (input.id === String(titledEquipmentField.id)) {
          return {
            id: titledEquipmentField.id,
            year: titledEquipmentField.year,
            make: titledEquipmentField.make,
            model: titledEquipmentField.model,
            value: parseInt(input.oldValue),
          };
        }
        return titledEquipmentField;
      }
    );
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    titledEquipmentFields.value = titledEquipmentFields.value.map(
      (titledEquipmentField) => {
        if (input.id === String(titledEquipmentField.id)) {
          return {
            id: titledEquipmentField.id,
            year: titledEquipmentField.year,
            make: titledEquipmentField.make,
            model: titledEquipmentField.model,
            value: "",
          };
        }
        return titledEquipmentField;
      }
    );
  }
};

const addAnother = (e) => {
  e.target.classList.add("hidden");
  addNewForm.value.classList.remove("hidden");
};

const addNewTitledEquipment = async () => {
  await store.dispatch(
    "businessCollateral/addEquipment",
    newTitledEquipmentFields.value
  );
  addAnotherBtn.value.classList.remove("hidden");
  addNewForm.value.classList.add("hidden");
  newTitledEquipmentFields.value = {
    year: "",
    make: "",
    model: "",
    value: "",
  };
};
</script>
