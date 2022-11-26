<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="What year did you file your last Personal Tax Return?"
      desc="Enter the year of your last tax filing."
    />
    <div class="mt-4">
      <BaseInput
        @input="(e) => maskYear(e.target)"
        length="4"
        :value="year"
        placeholder="2021"
        label="Financial Year"
        :required="true"
        errorMessage="Financial Year is required."
      />
    </div>
    <BaseBackNextBtns :nextDisabled="nextDisable" @next="next" />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { onBeforeMount, onMounted, onUpdated } from "@vue/runtime-core";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseInput from "../BaseInput.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const store = useStore();
const router = useRouter();
const nextDisable = ref(true);
const year = ref("");

// Hooks
onBeforeMount(async () => {
  const fields =
    store.getters["personalTaxReturns/getPersonalTaxReturnsFields"];

  if (fields.length) {
    // Get year
    year.value = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(
        field,
        "personal_tax_return_year_last_filed_at"
      )
    );
    year.value && year.value.personal_tax_return_year_last_filed_at.data
      ? (year.value = year.value.personal_tax_return_year_last_filed_at.data)
      : (year.value = "");
  }
});

onMounted(() => {
  if (year.value.length === 4) {
    return (nextDisable.value = false);
  }
  nextDisable.value = true;
});

onUpdated(() => {
  if (year.value.length === 4) {
    return (nextDisable.value = false);
  }
  nextDisable.value = true;
});

// Methods
const maskYear = (input) => {
  if (/^-?\d*$/.test(input.value)) {
    input.oldValue = input.value;
    year.value = input.value;
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue")) {
    input.value = input.oldValue;
    year.value = input.oldValue;
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    year.value = "";
  }
};

const next = async () => {
  await store.dispatch("personalTaxReturns/sendPersonalTaxReturnsFields", [
    {
      type: "personal_tax_return_year_last_filed_at",
      value: year.value,
    },
  ]);
  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "personal_tax_returns",
  ]);
  return router.push("/fundability/financials/personal-tax/extension");
};
</script>
