<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Warning"
      title="get your <a href='https://www.myscoreiq.com/' target='_blank' class='underline'> MyScoreiq.com </a> credit report"
      message="For your best business credit match and lending recommendations, select a resource below to get your <a href='https://www.myscoreiq.com/' target='_blank' class='underline'> MyScoreiq.com </a> Personal Credit report."
    />
    <BaseResources
      text="Click below to learn more about <a href='https://www.myscoreiq.com/' target='_blank' class='underline'> MyScoreiq.com </a> and get your Personal report."
      :resources="resource"
    />
    <BaseBackNextBtns
      nextLabel="I Have My Credit Report"
      :nextDisabled="false"
      @next="goNext"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BaseWarning from "../BaseWarning.vue";
import BaseResources from "../BaseResources.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const router = useRouter();

// Data
const resource = ref([
  {
    id: 1,
    title: "Regus Virtual Offices",
    image: "/images/regus.png",
    link: "/",
  },
]);

// Methods
const goNext = () =>
  router.back("/fundability/personal/credit-report/upload-my-score-iq");
</script>
