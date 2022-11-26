<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Warning"
      title="No revenue means your less likely to be funded"
      message="Some lenders require the business to show consistent revenue on a month to month basis., or proof of annual revenue at minimum."
    />
    <BaseResources
      text="Click below to learn more about Revenue Based Financing."
      :resources="resources"
    />
    <BaseBackNextBtns
      nextLabel="My Business Generates Revenue"
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
const goNext = () => router.push("/fundability/financials/business-revenue");
</script>
