<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="LLC"
      icon="CommercialAddress"
      iconColor="text-red-500"
      linkText="Great! An LLC creates a strong fundability foundation."
      desc="Tell us more about your LLC for your fastest path to business financing."
    />
    <BusinessEntityFields />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import BusinessEntityFields from "./BusinessEntityFields.vue";
</script>
