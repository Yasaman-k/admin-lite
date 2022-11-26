<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Merchant Account not needed"
      icon="CommercialAddress"
      linkText="Your business does not accept credit cards or other forms of electronic payment."
      desc="If you’d like to accept credit cards or forms of electronic payment, click “Get Merchant Account”."
    />
    <BaseUpdateNextBtns
      updateLabel="Get A Merchant Account"
      updateLink="/fundability/foundation/merchant-account/resources"
      nextLabel="Fundability"
      nextLink="/fundability/foundation"
    />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";
</script>
