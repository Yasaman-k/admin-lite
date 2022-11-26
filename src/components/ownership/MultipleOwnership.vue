<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Owner Name"
      icon="CommercialAddress"
      linkText="Who is the primary owner?"
      desc="Name of the person who owns the majority of the company."
    />
    <MultipleForm />
    <BaseBackNextBtns @next="goNext" :nextDisabled="saveDisable" />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import MultipleForm from "./MultipleForm.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const store = useStore();
const router = useRouter();
const saveDisable = ref(true);
const businessOwners = ref(store.getters["ownership/getOwnershipOwners"]);

// Hooks
onMounted(() => {
  if (!businessOwners.value.length || businessOwners.value.length === 1) {
    return (saveDisable.value = true);
  }
  return (saveDisable.value = false);
});

watch(store.state, (newState) => {
  businessOwners.value = newState.ownership.ownershipOwners;
  if (!businessOwners.value.length || businessOwners.value.length === 1) {
    return (saveDisable.value = true);
  }
  return (saveDisable.value = false);
});

// Methods
const goNext = () =>
  router.push("/fundability/foundation/ownership/verification");
</script>
