<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="Do you have a Professional Website and Email?"
      desc="Lenders and creditors search online to confirm the credibility of your business. A professional looking website and email can increase your fundability but aren't required to get financing."
    />
    <BaseOptions
      :goBackBtn="false"
      name="website-email"
      :value="hasWebsiteOrEmail"
      @handleValue="(val) => handleVal(val)"
      @submit="onSubmit"
    />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import FormHeader from "../FormHeader.vue";
import BaseOptions from "../BaseOptions.vue";

const store = useStore();
const router = useRouter();

// Data
const hasWebsiteOrEmail = ref("");

// Hooks
onMounted(() => {
  const confirmation =
    store.getters["websiteEmail/getWebsiteEmailConfirmation"];

  let websiteEmailConfirmation =
    confirmation &&
    confirmation.length &&
    confirmation[0].has_website_and_email;

  websiteEmailConfirmation &&
  (websiteEmailConfirmation.value === false ||
    websiteEmailConfirmation.value === true)
    ? (hasWebsiteOrEmail.value = websiteEmailConfirmation.value ? "Yes" : "No")
    : (hasWebsiteOrEmail.value = "");
});

// Methods
const handleVal = (val) => (hasWebsiteOrEmail.value = val);

const onSubmit = async () => {
  if (hasWebsiteOrEmail.value === "No") {
    await store.dispatch("websiteEmail/sendWebsiteEmailConfirmation", {
      value: false,
    });
    await store.dispatch("websiteEmail/sendWebsiteEmailFields", [
      {
        type: "business_website",
        value: "",
      },
      {
        type: "business_email",
        value: "",
      },
    ]);
    await store.dispatch("aspects/fetchFoundationStatuses", [
      "website_and_email",
    ]);
    return router.push("/fundability/foundation/website-email/resources");
  }
  return router.push("/fundability/foundation/website-email/website-form");
};
</script>
