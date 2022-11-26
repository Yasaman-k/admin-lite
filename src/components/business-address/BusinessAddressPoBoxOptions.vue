<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Negative"
      title="A PO Box negatively impacts fundability"
      message="Business’s with a PO Box address cannot be correctly identified by lenders, resulting in declined applications."
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
          label="Get A Virtual Address (Recommended)"
          class="w-full"
        />
      </router-link>
      <router-link to="/fundability/foundation/business-address/home">
        <LeadingOption label="Use Home Address " class="w-full" />
      </router-link>
    </div>
  </section>
</template>

<script setup>
import LeadingOption from "../LeadingOption.vue";
</script>
