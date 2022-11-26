<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="Do you have your LexisNexis report?"
      desc="Many underwriters look at your LexisNexis report to inform their decision. Before applying, know-how to pull your LexisNexis report and perform a thorough assessment to best increase your chances of funding."
    />
    <BaseOptions
      :goBackBtn="false"
      name="lexis-nexis"
      :value="hasLexisNexis"
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

const store = useStore();
const router = useRouter();
const hasLexisNexis = ref("");

// Hooks
onMounted(() => {
  let confirmation = store.getters["lexisNexis/getLexisNexisConfirmation"];
  confirmation.length &&
  confirmation[0].has_lexisnexis_report &&
  (confirmation[0].has_lexisnexis_report.value === false ||
    confirmation[0].has_lexisnexis_report.value === true)
    ? (hasLexisNexis.value = confirmation[0].has_lexisnexis_report.value
        ? "Yes"
        : "No")
    : (hasLexisNexis.value = "");
});

// Methods
const handleVal = (val) => (hasLexisNexis.value = val);

const onSubmit = async () => {
  if (hasLexisNexis.value === "No") {
    await store.dispatch("lexisNexis/sendLexisNexisConfirmation", {
      value: false,
    });
    await store.dispatch("aspects/fetchPersonalStatuses", [
      "lexisnexis_report",
    ]);
    return router.push("/fundability/personal/lexis-nexis/resources");
  }
  return router.push("/fundability/personal/lexis-nexis/upload-lexisnexis");
};
</script>
