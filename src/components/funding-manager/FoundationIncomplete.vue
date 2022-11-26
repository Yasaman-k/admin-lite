<template>
  <section
    class="container pt-16 px-20 h-screen relative w-[60%] overflow-hidden"
  >
    <FormHeader
      formTitle="Complete your foundation first"
      icon="CommercialAddress"
      linkText="The access to Funding Manager is purposefully locked till Foundation pillar is complete."
      desc="Please complete your Foundation first to get the access to Funding Manager."
    />
    <div class="flex justify-end mt-10">
      <router-link to="/fundability/foundation" class="btn-primary">
        Go Back To Foundation
      </router-link>
    </div>
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
</script>
