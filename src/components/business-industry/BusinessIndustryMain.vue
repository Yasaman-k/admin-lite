<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business industry"
      icon="Location"
      linkText="Has your business filed last year’s taxes?"
      desc="Please consider this year if answering after March."
    />
    <BaseOptions
      :goBackBtn="false"
      name="business-industry"
      :value="hasFiledTaxes"
      @handleValue="(val) => handleVal(val)"
      @submit="onSubmit"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FormHeader from "../FormHeader.vue";
import BaseOptions from "../BaseOptions.vue";

const router = useRouter();
// Data
const hasFiledTaxes = ref("");

// Methods
const handleVal = (val) => (hasFiledTaxes.value = val);
const onSubmit = async () => {
  if (hasFiledTaxes.value === "Yes") {
    return router.push("/fundability/foundation/business-industry/naics-code");
  }
  return router.push(
    "/fundability/foundation/business-industry/find-naics-code"
  );
};
</script>
