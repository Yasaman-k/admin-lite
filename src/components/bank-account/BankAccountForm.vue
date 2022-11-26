<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business Bank account"
      icon="CommercialAddress"
      linkText="Great! Where do you do your business banking?"
      desc="Lenders look at business bank statements, if the business name and address doesn’t match what you submit on your application, it triggers a fraud warning, or requirement to supply additional information. "
    />
    <p class="mt-6 font-semibold">
      Enter the bank you use for your business bank account.
    </p>
    <BankAccountNode />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import BankAccountNode from "./BankAccountNode.vue";
</script>
