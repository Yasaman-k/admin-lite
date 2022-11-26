<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Negative"
      title="Bad Virtual Address"
      message="Your current virtual address is not accepted by many underwriters."
    />
    <p class="font-semibold text-lg text-[#196499] mt-5">
      Use a different address type:
    </p>
    <div class="flex flex-col mt-2 gap-5">
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
        <LeadingOption label="Use Home Address " class="w-full" />
      </router-link>
    </div>
    <BaseBackNextBtns :nextBtnHidden="true" />
  </section>
</template>

<script setup>
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
</script>
