<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business bank statements"
      icon="Location"
      linkText="How many years and/or months of business bank statements do you currently have?"
    />
    <BusinessAccountStatementsOptions />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import BusinessAccountStatementsOptions from "./BusinessAccountStatementsOptions.vue";
</script>
