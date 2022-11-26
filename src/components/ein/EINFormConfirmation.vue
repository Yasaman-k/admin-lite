<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Ein confirmation"
      icon="CommercialAddress"
      linkText="Great, your EIN is recorded as follows:"
      desc="To make changes, click “Update EIN”."
    />
    <form @submit.prevent class="mt-5">
      <BaseInput
        ref="input"
        :copy="true"
        :value="EIN"
        label="EIN"
        :disabled="true"
        class="mt-7"
        placeholder=""
      />
      <BaseUpdateNextBtns
        updateLabel="Update EIN"
        updateLink="/fundability/foundation/ein/ein-form"
        nextLabel="Business Phone"
        nextLink="/fundability/foundation/business-phone"
      />
    </form>
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";

const store = useStore();
const EIN = ref("");
const input = ref(null);

// Hooks
onBeforeMount(() => {
  const fields = store.getters["ein/getEINFields"];
  if (fields.length) {
    const EINNumber = fields.filter((field) => {
      return Object.keys(field)[0] === "business_ein";
    });
    if (EINNumber.length) {
      EINNumber[0].business_ein && EINNumber[0].business_ein.data
        ? (EIN.value = EINNumber[0].business_ein.data)
        : (EIN.value = "");
    }
  }
});

onMounted(() => maskFetchedEIN(input.value, EIN.value));

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
</script>
