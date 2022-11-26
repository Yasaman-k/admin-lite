<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Warning"
      title="get your Personal credit report"
      message="Select a resource below to obtain a report. Use reports to track your payment experiences, increase Fundability and improve credit to secure funding."
    />
    <BaseResources
      text="Click below to learn more and get your Personal Credit Report and Score."
      :resources="resources"
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
const resources = ref([
  {
    id: 1,
    title: "Regus Virtual Offices",
    image: "/images/regus.png",
    link: "/",
  },
]);
// Methods
const goNext = () => router.push("/fundability/personal/personal-credit-score");
</script>
