<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Verify business address"
      icon="Light"
      linkText="Is your Business Address an exact match?"
      desc="Click a resource below to verify your primary business address is an exact match to the one you have listed with the IRS. Other ways to verify your address are:
      <br />
      - Looking at the last business address you listed on your latest business tax return
      <br />
      - Last letter you received from the IRS
      <br />
      - The address you submitted when you filed for your EIN#."
    />
    <BaseResources
      text="Click a resource to learn more and verify your Business Address with the
      IRS."
      :resources="resources"
    />
    <BaseBackNextBtns :nextBtnHidden="true" />
  </section>
</template>

<script setup>
import { ref } from "vue";
import FormHeader from "../FormHeader.vue";
import BaseResources from "../BaseResources.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

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
</script>
