<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business Entity"
      icon="Location"
      iconColor="text-red-500"
      linkText="Select the business entity you have filed with the Secretary of State."
      desc="Each structure has different ownership, tax, and income liabilities. When in doubt, speak with a tax accountant to form an entity that’s right for you. <br />
      <b>NOTE: A Sole Proprietorship is not a legal entity.</b>"
    />
    <BusinessEntityOptions />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import BusinessEntityOptions from "./BusinessEntityOptions.vue";
</script>
