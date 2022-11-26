<template>
  <form @submit.prevent="onSubmit" class="mt-5">
    <div class="grid grid-cols-2 gap-5">
      <BaseRadioButton
        @select="(val) => handleVal(val)"
        radioName="ein"
        text="Exact Match"
        icon="HandYes"
        value="Yes"
      />
      <BaseRadioButton
        @select="(val) => handleVal(val)"
        radioName="ein"
        text="Does Not Match"
        icon="HandNo"
        value="No"
      />
    </div>
    <BaseBackNextBtns :nextDisabled="nextDisable" />
  </form>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseRadioButton from "../BaseRadioButton.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const store = useStore();
const router = useRouter();
const addressMatch = ref("");
const nextDisable = ref(true);

// Methods
const handleVal = (val) => {
  addressMatch.value = val;
  if (addressMatch.value.length > 1) {
    return (nextDisable.value = false);
  }
  return (nextDisable.value = true);
};

const onSubmit = async () => {
  const EIN = store.state.ein.EIN;
  await store.dispatch("ein/sendConfirmation", {
    type: "has_ein",
    requiredData: { value: true },
  });
  await store.dispatch("ein/sendConfirmation", {
    type: "has_confirmed_address_matches_irs",
    requiredData: { value: addressMatch.value === "Yes" },
  });
  await store.dispatch("ein/sendEINFields", [
    {
      type: "business_ein",
      value: EIN,
    },
  ]);
  await store.dispatch("aspects/fetchFoundationStatuses", ["ein"]);
  if (addressMatch.value === "Yes") {
    return router.push("/fundability/foundation/ein/ein-form-confirm");
  }
  return router.push("/fundability/foundation/ein/ein-discrepancy-solutions");
};
</script>
