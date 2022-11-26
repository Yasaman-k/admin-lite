<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business Phone number"
      icon="CommercialAddress"
      linkText="What’s your Business Phone Number?"
    />
    <BusinessPhoneFields />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import BusinessPhoneFields from "./BusinessPhoneFields.vue";
</script>
