<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="Is there a Joint Ownership of the business?"
      desc="Is there any one that owns more than more than 25% of the company?"
    />
    <BaseOptions
      :goBackBtn="false"
      name="ownership"
      :value="hasOwnership"
      @handleValue="(val) => handleVal(val)"
      @submit="onSubmit"
    />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import FormHeader from "../FormHeader.vue";
import BaseOptions from "../BaseOptions.vue";

const router = useRouter();
const hasOwnership = ref("");

// Methods
const handleVal = (val) => (hasOwnership.value = val);

const onSubmit = async () => {
  if (hasOwnership.value === "Yes") {
    return router.push("/fundability/foundation/ownership/multiple-ownership");
  }
  return router.push("/fundability/foundation/ownership/single-ownership");
};
</script>
