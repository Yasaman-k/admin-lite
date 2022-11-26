<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="PO Box Address (not recommended)"
      icon="CommercialAddress"
      linkText="Enter Your PO Box Address"
      desc="Enter the PO Box Address that you have registered (or will register) with the Secretary of  State."
    />
    <p class="w-2/3 mt-10 text-base font-medium text-black">
      We recommend using a Virtual Business Address instead.
      <router-link
        to="/fundability/foundation/business-address/virtual/resources"
        class="block text-sunglow-blue"
      >
        Click here to learn about setting up a Virtual Address!
      </router-link>
    </p>
    <BusinessAddressFields />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import BusinessAddressFields from "./BusinessAddressFields.vue";
</script>
