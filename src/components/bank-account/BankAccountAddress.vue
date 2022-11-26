<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="verify business information"
      icon="VirtualAddress"
      linkText="Is your Business Name and Address an exact match?"
      desc="Verify the business name and address displayed below is an exact match to what’s listed on your Business Bank Account."
    />
    <BankAccountNode />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import BankAccountNode from "./BankAccountNode.vue";
</script>
