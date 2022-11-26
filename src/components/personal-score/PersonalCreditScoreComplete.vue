<template>
  <section class="container my-16 px-20">
    <BaseWarning
      v-if="showAlert"
      icon="Warning"
      title="Improve your personal credit score"
      message="Select a resource below to help you improve your personal credit score, increase Fundability and gain access to more funding opportunities."
    />
    <FormHeader
      formTitle="Personal Credit score"
      icon="CommercialAddress"
      linkText="The highest Personal Credit Score is recorded as follows:"
      desc="Click “Update Personal Credit Score” to make changes."
      class="pb-2 mt-5"
    />
    <BaseInput
      :value="creditScore"
      label="Credit Score"
      :disabled="true"
      class="mt-7 text-[#196499]"
      placeholder=""
    />
    <BaseUpdateNextBtns
      updateLabel="Update Personal Credit Score"
      updateLink="/fundability/personal/personal-credit-score"
      nextLabel="Upload Credit Report"
      nextLink="/fundability/personal/credit-report"
    />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { onBeforeMount } from "@vue/runtime-core";
import BaseWarning from "../BaseWarning.vue";
import FormHeader from "../FormHeader.vue";
import BaseInput from "../BaseInput.vue";

const store = useStore();
const creditScore = ref("");
const showAlert = ref(false);

// Hooks
onBeforeMount(() => {
  const score = store.getters["creditScore/getCreditScore"];
  if (score.length) {
    score[0].personal_credit_score.data &&
      (creditScore.value = score[0].personal_credit_score.data);
    if (parseInt(creditScore.value) >= 680) {
      return (showAlert.value = false);
    }
    return (showAlert.value = true);
  }
  return (showAlert.value = false);
});
</script>
