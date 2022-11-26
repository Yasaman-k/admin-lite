<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Partnership"
      icon="CommercialAddress"
      iconColor="text-red-500"
      linkText="Great! A Partnership creates a strong fundability foundation."
      desc="Tell us more about your Partnership for your fastest path to business financing.
            If you haven't filed, type “Will File”."
    />
    <BusinessEntityFields />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import BusinessEntityFields from "./BusinessEntityFields.vue";
</script>
