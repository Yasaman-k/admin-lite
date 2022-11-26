<template>
  <section
    class="container pt-16 px-20 h-screen relative w-[60%] overflow-hidden"
  >
    <FormHeader
      formTitle="Maximize your fundability"
      icon="CommercialAddress"
      linkText="Get custom recommendations to maximize your approval amounts, see lower rates and get better terms"
      desc="Each account you add will help us to make stronger recommendations for better loan matches, more credit accounts and increased funding approvals."
    />
    <div class="flex gap-4 justify-center items-center flex-wrap mt-10">
      <router-link to="#" class="btn-primary">
        Add Existing Accounts
      </router-link>
      <router-link to="/funding/funding-explorer" class="btn-primary">
        Apply For Accounts
      </router-link>
    </div>
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
</script>
