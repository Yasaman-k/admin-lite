<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business Website and email"
      icon="CommercialAddress"
      linkText="What’s your Website and Email Address?"
      desc="Having a professional website and email are KEY to establishing your credibility and making you more fundable in the eyes of lenders. Enter your website and email address below."
    />
    <WebsiteEmailFormFields />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import WebsiteEmailFormFields from "./WebsiteEmailFormFields.vue";
</script>
