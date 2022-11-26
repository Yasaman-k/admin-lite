<template>
  <section class="container my-16 px-20">
    <BaseResources
      text="Click a resource below to learn more and set up your Professional Website."
      :resources="resources"
    />
    <BaseBackNextBtns
      nextLabel="I Have A Website &amp; Email"
      @next="goNext"
      :nextDisabled="false"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
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
  router.push("/fundability/foundation/website-email/website-form");
</script>
