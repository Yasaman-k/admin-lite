<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="merchant account options"
      icon="Light"
      linkText="Get a Merchant Account"
      desc="To begin accepting credit cards or other forms of electronic payment, check out some of our Merchant Providers below. These providers currently report to the business credit bureaus and help to increase your Fundability."
    />
    <BaseResources
      text="Click a resource below to learn more and set up a Merchant Account."
      :resources="resources"
    />
    <BaseBackNextBtns
      nextLabel="I Have A Merchant Account"
      :nextDisabled="false"
      @next="goNext"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
import BaseResources from "../BaseResources.vue";
import FormHeader from "../FormHeader.vue";

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
  router.push("/fundability/foundation/merchant-account/merchant-account-form");
</script>
