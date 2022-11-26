<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Negative"
      title="Update Business Ownership Information"
      message="Click a resource below to learn more about updating or changing your business ownership information successfully."
    />
    <BaseResources text="Click a resource below" :resources="resources" />
    <BaseBackNextBtns
      nextLabel="My Info Is Up To Date"
      :nextDisabled="false"
      @next="save"
    />
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import BaseWarning from "../BaseWarning.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
import BaseResources from "../BaseResources.vue";
import { ref } from "vue";

const store = useStore();
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
const save = async () => {
  await store.dispatch("ownership/sendOwnershipSosConfirmation", {
    value: true,
  });
  await store.dispatch("aspects/fetchFoundationStatuses", ["ownership"]);
  return router.push("/fundability/foundation/ownership/complete");
};
</script>
