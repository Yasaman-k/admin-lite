<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business Address"
      icon="Location"
      linkText="What type of business address do you have?"
      desc="Many lenders and creditors prefer businesses to have a specific address ‘type’ to qualify for certain funding programs. This means your Fundability score can increase based on the kind of business address you have. Select which type of address you use <b>right now</b> for your business."
    />
    <BusinessAddressOptions />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import BusinessAddressOptions from "./BusinessAddressOptions.vue";
</script>
