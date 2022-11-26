<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="missing bank account"
      icon="Location"
      linkText="Add your business bank account information."
      desc="When applying for loans and lines of credit, some lenders want to see a consistent record of your business banking transactions, revenues and profits before making their lending decision. Click “Update Business Bank Account” to add your account."
    />
    <div class="flex justify-end items-center mt-10">
      <router-link
        to="/fundability/financials/business-account"
        class="btn-primary"
      >
        Update Business Bank Account
      </router-link>
    </div>
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
</script>
