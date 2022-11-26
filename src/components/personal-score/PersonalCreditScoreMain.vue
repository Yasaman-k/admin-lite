<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="What’s the highest Personal Credit Score available to secure business funding?"
      desc="If your business has multiple owners, enter the highest Personal Credit Score of any business owner willing to use his/her personal credit to increase Fundability and obtain business financing (ie. credit cards, lines, loans). Any owner supplying personal credit to secure business funding must own at least 20% of the business."
    />
    <PersonalScoreInput />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import PersonalScoreInput from "./PersonalScoreInput.vue";
</script>
