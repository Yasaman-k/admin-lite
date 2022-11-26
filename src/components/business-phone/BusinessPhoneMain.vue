<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="Do you have a Business Phone Number?"
      desc="Home numbers and personal cell phone numbers decrease your Fundability because the business looks less credible. Your business landline, VOIP, and/or cell phone numbers must be in the business’s name."
    />
    <BaseOptions
      :goBackBtn="false"
      name="business-phone"
      :value="hasBusinessPhone"
      @handleValue="(val) => handleVal(val)"
      @submit="onSubmit"
    />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import BaseOptions from "../BaseOptions.vue";

const store = useStore();
const router = useRouter();
// Data
const hasBusinessPhone = ref("");

// Hooks
onMounted(() => {
  const confirmation =
    store.getters["businessPhone/getBusinessPhoneConfirmation"];

  let businessPhoneConfirmation =
    confirmation && confirmation.length && confirmation[0].has_business_phone;

  // Check if Business Phone Confirmation != undefined
  businessPhoneConfirmation &&
  (businessPhoneConfirmation.value === false ||
    businessPhoneConfirmation.value === true)
    ? (hasBusinessPhone.value = businessPhoneConfirmation.value ? "Yes" : "No")
    : (hasBusinessPhone.value = "");
});

// Methods
const handleVal = (val) => (hasBusinessPhone.value = val);

const onSubmit = async () => {
  if (hasBusinessPhone.value === "No") {
    await store.dispatch("businessPhone/sendBusinessPhoneConfirmation", {
      value: false,
    });
    await store.dispatch("businessPhone/sendBusinessPhoneFields", [
      {
        type: "business_phone",
        value: "",
      },
      {
        type: "business_phone_provider",
        value: "",
      },
    ]);
    await store.dispatch("aspects/fetchFoundationStatuses", ["business_phone"]);
    return router.push("/fundability/foundation/business-phone/resources");
  }
  return router.push(
    "/fundability/foundation/business-phone/business-phone-form"
  );
};
</script>
