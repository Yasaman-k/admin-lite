<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Ein"
      icon="CommercialAddress"
      linkText="Great, what’s your EIN?"
      desc="Enter your business’s EIN to quickly apply for Business credit and lending."
    />
    <form @submit.prevent="save" class="mt-5">
      <BaseInput
        ref="input"
        @input="
          (e) => {
            EINValid = true;
            maskEIN(e.target);
            return formValid(e.target.value);
          }
        "
        @blur="(e) => EINNumberValid(e.target.value)"
        :required="true"
        :value="EIN"
        length="11"
        :error="!EINValid"
        label="EIN"
        placeholder="132-99-5555"
        :errorMessage="EINErrorMessage"
      />
      <BaseBackNextBtns nextLabel="Save" :nextDisabled="saveDisable" />
    </form>
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, onUpdated } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const store = useStore();
const router = useRouter();
const EIN = ref("");
const input = ref(null);
const formIsValid = ref(false);
const EINValid = ref(true);
const EINErrorMessage = ref("");
const saveDisable = ref(true);

onMounted(() => {
  const fields = store.state.ein.EINFields;
  if (fields.length) {
    const EINNumber = fields.filter((field) => {
      return Object.keys(field)[0] === "business_ein";
    })[0];
    if (EINNumber) {
      EINNumber.business_ein.data
        ? (EIN.value = EINNumber.business_ein.data)
        : (EIN.value = "");
    }
  }
  maskFetchedEIN(input.value, EIN.value);
  return formValid();
});

onUpdated(() => {
  if (EINValid.value && formIsValid.value) {
    return (saveDisable.value = false);
  }
  return (saveDisable.value = true);
});

// Methods
const maskFetchedEIN = (input, val) => {
  const newVal = val.replace(/\D/g, "").match(/(\d{0,3})(\d{0,2})(\d{0,4})/);
  input.oldValue = !newVal[2]
    ? newVal[1]
    : newVal[1] + "-" + newVal[2] + (newVal[3] ? "-" + newVal[3] : "");
  EIN.value = !newVal[2]
    ? newVal[1]
    : newVal[1] + "-" + newVal[2] + (newVal[3] ? "-" + newVal[3] : "");
  input.oldSelectionStart = input.selectionStart;
  input.oldSelectionEnd = input.selectionEnd;
};

const maskEIN = (input) => {
  if (/[0-9\\.\-\\/]\d*$/.test(input.value)) {
    const newVal = input.value
      .replace(/\D/g, "")
      .match(/(\d{0,3})(\d{0,2})(\d{0,4})/);
    input.oldValue = !newVal[2]
      ? newVal[1]
      : newVal[1] + "-" + newVal[2] + (newVal[3] ? "-" + newVal[3] : "");
    EIN.value = !newVal[2]
      ? newVal[1]
      : newVal[1] + "-" + newVal[2] + (newVal[3] ? "-" + newVal[3] : "");
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue") && input.value.length > 1) {
    input.value = input.oldValue;
    EIN.value = input.oldValue;
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    EIN.value = "";
  }
};

const EINNumberValid = (val) => {
  if (!/^[0-9]{3}[-][0-9]{2}[-][0-9]{4}$/im.test(val) && val.length != 0) {
    EINErrorMessage.value = "EIN Number is invalid.";
    return (EINValid.value = false);
  }
  EINErrorMessage.value = "EIN Number is required.";
  return (EINValid.value = true);
};

const formValid = () => {
  const EINIsValid = /^[0-9]{3}[-][0-9]{2}[-][0-9]{4}$/im.test(EIN.value);
  if (EINIsValid) {
    return (formIsValid.value = true);
  }
  return (formIsValid.value = false);
};

const save = async () => {
  await store.dispatch("ein/setEIN", EIN.value);
  await store.dispatch("aspects/fetchFoundationStatuses", ["ein"]);
  router.push("/fundability/foundation/ein/ein-match");
};
</script>
