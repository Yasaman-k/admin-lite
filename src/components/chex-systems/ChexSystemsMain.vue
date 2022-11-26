<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="Do you have your Chex Systems report?"
      desc="Many underwriters look at your Chex Systems report to inform their decision. Before applying, know-how to pull your Chex Systems report and perform a thorough assessment to best increase your chances of funding."
    />
    <BaseOptions
      :goBackBtn="false"
      name="chex-systems"
      :value="hasChexReport"
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
const hasChexReport = ref("");

// Hooks
onMounted(() => {
  let confirmation = store.getters["chexSystems/getChexConfirmation"];
  confirmation.length &&
  confirmation[0].has_chex_report &&
  (confirmation[0].has_chex_report.value === false ||
    confirmation[0].has_chex_report.value === true)
    ? (hasChexReport.value = confirmation[0].has_chex_report.value
        ? "Yes"
        : "No")
    : (hasChexReport.value = "");
});

// Methods
const handleVal = (val) => (hasChexReport.value = val);

const onSubmit = async () => {
  if (hasChexReport.value === "No") {
    await store.dispatch("chexSystems/sendChexConfirmation", { value: false });
    await store.dispatch("aspects/fetchPersonalStatuses", ["chex_report"]);
    return router.push("/fundability/personal/chex-systems/resources");
  }
  return router.push("/fundability/personal/chex-systems/upload-chex-report");
};
</script>
