<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="S corp or c corp"
      icon="CommercialAddress"
      iconColor="text-red-500"
      linkText="Great! An S or C Corp creates a strong fundability foundation."
      desc="Tell us more about your S or C Corp for your fastest path to business financing. "
    />
    <BusinessEntityFields />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import BusinessEntityFields from "./BusinessEntityFields.vue";
</script>
