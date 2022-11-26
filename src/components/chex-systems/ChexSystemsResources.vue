<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Warning"
      title="Get your chex systems report"
      message="For your best business credit match and lending recommendations, select a resource below to get your Chex Systems report."
    />
    <BaseResources
      text="Click below to learn more and get your Chex Systems report."
      :resources="resource"
    />
    <BaseBackNextBtns
      nextLabel="I Have My Chex Report"
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
const goNext = () => router.push("/fundability/personal/chex-systems");
</script>
