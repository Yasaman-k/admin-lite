<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Warning"
      title="Improve your personal credit score"
      message="Select a resource below to help you improve your personal credit score, increase Fundability and gain access to more funding opportunities."
    />
    <BaseResources
      text="Click below to learn how you can improve your Personal Credit Score now."
      firstLink="/"
      secondLink="/"
    />
    <BaseBackNextBtns
      nextLabel="Next: Upload Credit Report <IconRightArrow />"
      nextDisabled="false"
      @next="goNext"
    />
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import BaseWarning from "../BaseWarning.vue";
import BaseResources from "../BaseResources.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const router = useRouter();
// Methods
const goNext = () => router.push("/fundability/personal/credit-report");
</script>
