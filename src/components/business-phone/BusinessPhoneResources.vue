<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Negative"
      title="Business Phone needed"
      message="You’ll need a local business number if you do business locally. Lenders and creditors will likely deny you for business financing if you’re using a home phone or personal cell number."
    />
    <BaseResources
      text="Click a resource below to learn more and Get a Business Number."
      :resources="resources"
    />
    <BaseBackNextBtns
      nextLabel="I Have A Business #"
      :nextDisabled="false"
      @next="goNext"
    />
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
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
  {
    id: 2,
    title: "Davinci Virtual Offices",
    image: "/images/davinci.png",
    link: "/",
  },
]);

// Methods
const goNext = () =>
  router.push("/fundability/foundation/business-phone/business-phone-form");
</script>
