<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Bankruptcies, Liens, and Judgements"
      icon="Location"
      iconColor="text-red-500"
      linkText="Does any business owner with more than 50% ownership have bankruptcies, liens, or judgements on their personal credit report?"
      desc="NOTE: Even if you are not giving a personal guarantee, funding providers will often review personal credit when making their decision."
    />
    <BaseOptions
      :goBackBtn="false"
      name="bankruptcy"
      :value="hasDerogatoryConfirmation"
      @handleValue="(val) => handleVal(val)"
      @submit="onSubmit"
    />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import FormHeader from "../FormHeader.vue";
import BaseOptions from "../BaseOptions.vue";

const store = useStore();
const router = useRouter();
const hasDerogatoryConfirmation = ref("");

// Hooks
onMounted(() => {
  let confirmation = store.getters["bankruptcy/getDerogatoryConfirmation"];
  
  confirmation &&
  confirmation.length &&
  confirmation[0].has_derogatory_remarks &&
  (confirmation[0].has_derogatory_remarks.value === false ||
    confirmation[0].has_derogatory_remarks.value === true)
    ? (hasDerogatoryConfirmation.value = confirmation[0].has_derogatory_remarks
        .value
        ? "Yes"
        : "No")
    : (hasDerogatoryConfirmation.value = "");

  try {
    if (
      confirmation.type === "has_derogatory_remarks" &&
      hasDerogatoryConfirmation.value === ""
    ) {
      if (confirmation.value) {
        hasDerogatoryConfirmation.value = "Yes";
      } else {
        hasDerogatoryConfirmation.value = "No";
      }
    }
    // eslint-disable-next-line no-empty
  } catch (error) {}
});

// Methods
const handleVal = (val) => (hasDerogatoryConfirmation.value = val);

const onSubmit = async () => {
  if (hasDerogatoryConfirmation.value === "No") {
    await store.dispatch("bankruptcy/sendDerogatoryConfirmation", {
      value: false,
    });

    await store.dispatch("aspects/fetchPersonalStatuses", [
      "derogatory_remarks",
    ]);

    return router.push("/fundability/personal/bankruptcy/complete");
  } else {
    await store.dispatch("bankruptcy/sendDerogatoryConfirmation", {
      value: true,
    });
    await store.dispatch("aspects/fetchPersonalStatuses", [
      "derogatory_remarks",
    ]);
    return router.push("/fundability/personal/bankruptcy/owners-credit-report");
  }
};
</script>
