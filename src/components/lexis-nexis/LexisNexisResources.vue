<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Warning"
      title="get your Lexisnexis report"
      message="For your best business credit match and lending recommendations, select a resource below to get your LexisNexis report."
    />
    <BaseResources
      text="Click below to learn more and get your LexisNexis report."
      :resources="resource"
    />
    <BaseBackNextBtns
      nextLabel="I Have My LexisNexis Report"
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
  router.push("/fundability/personal/lexis-nexis/upload-lexisnexis");
</script>
