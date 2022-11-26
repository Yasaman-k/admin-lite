<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business Merchant Account"
      icon="CommercialAddress"
      linkText="Who provides your Merchant services?"
    />
    <p class="mt-6 font-semibold">Type your merchant account below.</p>
    <MerchantAccountNode />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import MerchantAccountNode from "./MerchantAccountNode.vue";
</script>
