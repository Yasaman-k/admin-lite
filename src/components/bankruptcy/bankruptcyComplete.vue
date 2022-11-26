<template>
  <section class="container my-16 px-20">
    <BaseWarning
      v-if="warning"
      icon="Warning"
      title="Bankruptcies will prevent funding "
      message="If a lender does approve you for funding, the interest rates will be higher and the terms less desirable. If possible, choose an owner with no negative marks. "
    />
    <FormHeader
      v-else
      formTitle="No negative reporting"
      icon="CommercialAddress"
      iconColor="text-red-500"
      linkText="Keep up the good work! No derogatory marks are currently showing on your report. "
      desc="NOTE: Even if you are not giving a personal guarantee, funding providers will often review personal credit when making their decision."
    />
    <BaseUpdateNextBtns
      class="mt-10"
      updateLabel="Update Bankruptcies, Liens & Judgements"
      updateLink="/fundability/personal/bankruptcy"
      nextLabel=""
      nextLink="/fundability/application-process"
    />
  </section>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";
import BaseWarning from "../BaseWarning.vue";

const store = useStore();

// Data
const warning = ref(false);

// Hooks
onMounted(() => {
  let confirmation = store.getters["bankruptcy/getDerogatoryConfirmation"];

  try {
    if (
      confirmation &&
      confirmation.length &&
      confirmation[0].has_derogatory_remarks &&
      confirmation[0].has_derogatory_remarks.value === true
    ) {
      warning.value = true;
    } else if (
      confirmation &&
      confirmation.length &&
      confirmation[0].has_derogatory_remarks &&
      confirmation[0].has_derogatory_remarks.value === false
    ) {
      warning.value = false;
    } else if (confirmation.value) {
      warning.value = true;
    } else if (confirmation.value == false) {
      warning.value = false;
    } else {
      warning.value = true;
    }
  } catch (error) {
    if (confirmation.value) {
      warning.value = true;
    } else if (confirmation.value == false) {
      warning.value = false;
    } else {
      warning.value = true;
    }
  }
});
</script>
