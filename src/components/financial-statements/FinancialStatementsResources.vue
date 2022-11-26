<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Warning"
      title="Submit business Financials to qualify"
      message="Some lenders base loan and credit line decisions on financial statements. To qualify for certain types of funding programs and more business lending, upload your statements and keep them up to date in the Financials section."
    />
    <BaseResources
      text="Click below for more info on how to obtain business financial statements."
      :resources="resources"
    />
    <BaseBackNextBtns
      nextLabel="Upload My Financials"
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
const goNext = () =>
  router.push("/fundability/financials/financial-statements/statements-terms");
</script>
