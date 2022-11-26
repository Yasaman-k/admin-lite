<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Warning"
      title="Set up your Business Bank Account"
      message="Some lenders base their approvals on how much revenue you have coming in each month, as well as your deposits, transactions and monthly bank balance."
    />
    <BaseResources
      text="Click a resource below to learn more and set up your Business Bank
      Account."
      :resources="resources"
    />
    <BaseBackNextBtns
      nextLabel="I Have A Bank Account"
      :nextDisabled="false"
      @next="goNext"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BaseWarning from "../BaseWarning.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
import BaseResources from "../BaseResources.vue";

const router = useRouter();

// Data
const resources = ref([
  {
    id: 1,
    title: "Regus Virtual Offices",
    image: "/images/regus.png",
    link: "/",
  },
  {
    id: 2,
    title: "Davinci Virtual Offices",
    image: "/images/davinci.png",
    link: "/",
  },
]);

// Methods
const goNext = () =>
  router.push("/fundability/financials/business-account/bank-account-form");
</script>
