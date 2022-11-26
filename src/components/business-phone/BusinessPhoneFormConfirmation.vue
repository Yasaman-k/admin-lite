<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business number confirmation"
      icon="CommercialAddress"
      linkText="Your Business Number is recorded as follows:"
      desc="To update your business numbers, click “Update Phone Number”."
    />
    <form @submit.prevent class="mt-10 confirm-form">
      <BaseInput
        :copy="true"
        :value="businessPhone || ''"
        label="Business Phone Number"
        :disabled="true"
      />
      <BaseInput
        :copy="true"
        :value="phoneProvider || ''"
        label="Service Provider"
        :disabled="true"
        class="mt-7 text-[#196499]"
        placeholder=""
      />
      <BaseUpdateNextBtns
        updateLabel="Update Phone Number"
        updateLink="/fundability/foundation/business-phone/business-phone-form"
        nextLabel="Website and Email"
        nextLink="/fundability/foundation/website-email"
      />
    </form>
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";
import BaseInput from "../BaseInput.vue";

const store = useStore();
const businessPhone = ref("");
const phoneProvider = ref("");

onBeforeMount(async () => {
  const fields = store.state.businessPhone.businessPhoneFields;
  if (!fields.length) {
    await store.dispatch("businessPhone/fetchBusinessPhoneFields");
  }

  if (fields.length) {
    businessPhone.value = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "business_phone")
    );
    businessPhone.value &&
      (businessPhone.value = businessPhone.value.business_phone.data);

    phoneProvider.value = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "business_phone_provider")
    );
    phoneProvider.value &&
      (phoneProvider.value = phoneProvider.value.business_phone_provider.data);
  }
});
</script>

<style>
.confirm-form input {
  @apply disabled:bg-[#FAFDFF] disabled:text-[#196499] disabled:drop-shadow-md disabled:rounded-md disabled:border-0;
}

.confirm-form input:disabled + label {
  @apply bg-white text-[#196499] rounded-md;
}
</style>
