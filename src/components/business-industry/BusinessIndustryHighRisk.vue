<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Warning"
      title="Your Business is in a high-risk industry"
      message="If you’re in a high-risk industry, funding sources that look at your tax returns may look at your application with additional scrutiny and even decline credit and loans.  
      <br />
      <br />
      If your business provides multiple products and services, some in a high-risk category and others not, as long as they are similar we suggest selecting a non-high-risk category, and use that code on your next tax filing, as well as any new applications and documentation."
    />
    <h3 class="text-xl text-sunglow-blue font-semibold">
      Here’s what you can do:
    </h3>
    <div class="flex flex-col mt-5 gap-5">
      <router-link
        to="/fundability/foundation/business-industry/select-new-industry"
      >
        <LeadingOption label="Select New Industry" class="w-full" />
      </router-link>
      <router-link to="/fundability/foundation/business-industry/confirmation">
        <LeadingOption label="Use Existing Industry Type" class="w-full" />
      </router-link>
    </div>
    <BaseBackNextBtns :nextBtnHidden="true" />
  </section>
</template>

<script setup>
import BaseWarning from "../BaseWarning.vue";
import LeadingOption from "../LeadingOption.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
</script>
