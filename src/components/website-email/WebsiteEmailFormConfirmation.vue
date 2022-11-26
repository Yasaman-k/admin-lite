<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="website and email confirmation"
      icon="CommercialAddress"
      linkText="Great, your Website and Email are recorded."
      desc="To make changes, click “Update Website or Email” below."
    />
    <form @submit.prevent class="mt-10 confirm-form">
      <BaseInput
        :copy="true"
        :value="businessWebsite || ''"
        label="Business Website"
        :disabled="true"
      />
      <BaseInput
        :copy="true"
        :value="businessEmail || ''"
        label="Business Email"
        :disabled="true"
        class="mt-7 text-[#196499]"
        placeholder=""
      />
      <BaseUpdateNextBtns
        updateLabel="Update Website Or Email"
        updateLink="/fundability/foundation/website-email"
        nextLabel="Bank Account"
        nextLink="/fundability/financials/business-account"
      />
    </form>
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseInput from "../BaseInput.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";

const store = useStore();
const businessWebsite = ref("");
const businessEmail = ref("");

onBeforeMount(async () => {
  const fields = store.getters["websiteEmail/getWebsiteEmailFields"];
  if (!fields.length) {
    await store.dispatch("websiteEmail/fetchWebsiteEmailFields");
  }

  if (fields.length) {
    businessWebsite.value = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "business_website")
    );
    businessWebsite.value &&
      (businessWebsite.value = businessWebsite.value.business_website.data);

    businessEmail.value = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "business_email")
    );
    businessEmail.value &&
      (businessEmail.value = businessEmail.value.business_email.data);
  }
});
</script>

<style>
.confirm-form input:disabled {
  @apply bg-[#FAFDFF] text-[#196499] drop-shadow-md rounded-md border-0;
}

.confirm-form input:disabled + label {
  @apply bg-white text-[#196499] rounded-md;
}
</style>
