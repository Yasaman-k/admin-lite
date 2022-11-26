<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="Is your Personal Credit report from <a href='https://www.myscoreiq.com/' target='_blank' class='underline'> MyScoreIQ.com </a> ? "
      desc="For some business loans and lines, many underwriters look at your full Personal Credit report. Before applying, know-how to pull your full credit report from <a href='https://www.myscoreiq.com/' target='_blank' class='underline'> MyScoreIQ.com </a> and perform a thorough assessment to best increase your chances of funding."
    />
    <BaseOptions
      :goBackBtn="false"
      name="credit-report"
      :value="fromMyScoreIQ"
      @handleValue="(val) => handleVal(val)"
      @submit="onSubmit"
    />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";

const store = useStore();
const router = useRouter();
const fromMyScoreIQ = ref("");

// Hooks
onMounted(() => {
  let confirmation = store.getters["creditReport/getCreditReportConfirmation"];

  confirmation.length &&
  confirmation[0].has_personal_credit_report &&
  (confirmation[0].has_personal_credit_report.value === false ||
    confirmation[0].has_personal_credit_report.value === true)
    ? (fromMyScoreIQ.value = confirmation[0].has_personal_credit_report.value
        ? "Yes"
        : "No")
    : (fromMyScoreIQ.value = "");
});

// Methods
const handleVal = (val) => (fromMyScoreIQ.value = val);

const onSubmit = async () => {
  if (fromMyScoreIQ.value === "No") {
    await store.dispatch("creditReport/sendCreditReportConfirmation", {
      value: false,
    });
    await store.dispatch("aspects/fetchPersonalStatuses", ["credit_report"]);
    return router.push("/fundability/personal/credit-report/resources");
  }
  return router.push("/fundability/personal/credit-report/upload-my-score-iq");
};
</script>
