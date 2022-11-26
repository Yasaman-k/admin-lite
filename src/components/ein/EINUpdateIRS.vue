<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Negative"
      title="Update your Business address with the IRS"
      message="Your primary business address must be an exact match to the one you have listed with the IRS. Click a resource to Update Your Address with the IRS."
    />
    <BaseResources
      text="Click a resource to learn more and Update Your Address directly with the
      IRS."
      :resources="resources"
    />
    <BaseBackNextBtns
      nextLabel="I Have A EIN"
      :nextDisabled="false"
      @next="goNext"
    />
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import BaseWarning from "../BaseWarning.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
import BaseResources from "../BaseResources.vue";
import { ref } from "vue";

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
  router.push("/fundability/foundation/ein/ein-form-confirm");
</script>
