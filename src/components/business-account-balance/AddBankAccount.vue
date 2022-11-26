<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="missing bank account"
      icon="Location"
      linkText="Add your business bank account."
      desc="When applying for loans and lines of credit, some lenders require a consistent record of transactions, revenues and profits before making their lending decision. Click below to add your business bank account and get approved for funding. "
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
