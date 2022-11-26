<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Warning"
      title="virtual address provider impacts Fundability"
      message="Your current virtual address provider is not known to be widely accepted by lenders. Use a different address ‘type’ or get a New Virtual Address."
    />
    <div class="flex flex-col mt-5 gap-5">
      <router-link to="/fundability/foundation/business-address/commercial">
        <LeadingOption
          label="Use A Commercial Address (If You Have One)"
          class="w-full"
        />
      </router-link>
      <router-link
        to="/fundability/foundation/business-address/virtual/resources"
      >
        <LeadingOption
          label="Get A New Virtual Address (Alternative Solution)"
          class="w-full"
        />
      </router-link>
      <router-link to="/fundability/foundation/business-address/home">
        <LeadingOption label="Use A Home Address" class="w-full" />
      </router-link>
    </div>
    <BaseBackNextBtns :nextBtnHidden="true" />
  </section>
</template>

<script setup>
import LeadingOption from "../LeadingOption.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
</script>
