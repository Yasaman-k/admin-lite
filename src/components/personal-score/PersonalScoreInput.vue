<template>
  <div class="mt-10">
    <BaseInput
      label="Personal Credit Score"
      placeholder="Personal Credit Score"
      :value="personalScore"
      errorMessage="Personal Credit Score is required"
      :required="true"
      @input="(e) => handlePersonalScore(e.target)"
    />
  </div>
  <div class="flex items-center justify-end mt-5">
    <button class="btn-primary" :disabled="nextDisable" @click="goNext">
      Next
    </button>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseInput from "../BaseInput.vue";

const store = useStore();
const router = useRouter();

// Data
const personalScore = ref("");
const nextDisable = ref(true);

// Hooks
onMounted(() => {
  const score = store.getters["creditScore/getCreditScore"];

  if (score.length) {
    score[0].personal_credit_score.data &&
      (personalScore.value = score[0].personal_credit_score.data);
  }
  if (personalScore.value.length) {
    return (nextDisable.value = false);
  }
  return (nextDisable.value = true);
});

onUpdated(() => {
  if (personalScore.value.length) {
    return (nextDisable.value = false);
  }
  return (nextDisable.value = true);
});

// Methods
const handlePersonalScore = (input) => {
  const val = input.value;
  if (/[0-9]\d*$/.test(val)) {
    input.oldValue = val;
    personalScore.value = val;
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue") && val.length > 1) {
    input.value = input.oldValue;
    personalScore.value = input.oldValue;
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    personalScore.value = "";
  }
};

const goNext = async () => {
  await store.dispatch("creditScore/sendCreditScore", [
    {
      type: "personal_credit_score",
      value: parseInt(personalScore.value),
    },
  ]);
  await store.dispatch("aspects/fetchPersonalStatuses", ["credit_score"]);
  return router.push("/fundability/personal/personal-credit-score/complete");
};
</script>
