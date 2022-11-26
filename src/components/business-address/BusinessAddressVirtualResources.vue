<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business address alternative"
      icon="Light"
      linkText="Virtual Business Address"
      desc="A PO. Box will lower your Fundability and cause declines. A virtual address is one alternative to a P.O. Box."
    />
    <BaseResources
      text="Click on a resource below to set up your new Virtual Address!"
      :resources="resources"
    />
    <BaseBackNextBtns
      nextLabel="I Have A Virtual Address"
      :nextDisabled="false"
      @next="goNext"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FormHeader from "../FormHeader.vue";
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
  router.push("/fundability/foundation/business-address/virtual/vendor");
</script>
