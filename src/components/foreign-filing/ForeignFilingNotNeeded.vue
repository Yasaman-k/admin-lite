<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Foreign filing not needed"
      icon="CommercialAddress"
      linkText="If your business moves to a different state(s), you will need to Foreign File to qualify for funding."
      desc="Foreign Filing is registering your business in a state other than the one you originally filed your entity in (e.g. LLC, INC, Partnership). If your filing is up-to-date, click “Next: Ownership”."
    />
    <BaseUpdateNextBtns
      :updateBtnHidden="true"
      nextLabel="Ownership"
      nextLink="/fundability/foundation/ownership"
    />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";
</script>
