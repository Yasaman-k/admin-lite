<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Negative"
      :title="`foreign filing needed in ${businessAddressState}`"
      message="You may be denied funding if your business is located in a state (or states) other than the one your entity was originally filed."
    />
    <p class="mt-10 text-base font-medium text-black">
      {First, Submit the name reservation request form. If your business name is
      not available, you are SOL partner. <br />
      Next, obtain a certificate of authority in the AL state, a copy of the
      name reservation certificate received from the Office of the Alabama
      Secretary of State must be attached.”}
    </p>
    <p class="mt-10 text-base font-bold text-black flex flex-col gap-1">
      <span class="flex gap-2 items-center">
        <IconDownloadFile /> {ForeignCorporationRegistration.pdf
      </span>
      <span class="flex gap-2 items-center">
        <IconDownloadFile /> DomesticLLCFormation.pdf}
      </span>
    </p>
    <BaseResources
      text="Click a resource below to learn more and Get a Business Number."
      :resources="resources"
    />
    <BaseBackNextBtns
      :nextLabel="`I Foreign Filed at ${businessAddressState}`"
      :nextDisabled="false"
      @next="onSubmit"
    />
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { useStore } from "vuex";
import BaseWarning from "../BaseWarning.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
import BaseResources from "../BaseResources.vue";

const store = useStore();
const router = useRouter();

// Data
const foreignFilingFields = ref(store.state.foreignFiling.foreignFilingFields);
const businessAddressState = ref("");
const resources = ref([
  {
    id: 1,
    title: "Regus Virtual Offices",
    image: "/images/regus.png",
    link: "/",
  },
  {
    id: 2,
    title: "Davinci Virtual Offices",
    image: "/images/davinci.png",
    link: "/",
  },
]);

// Hooks
onBeforeMount(() => {
  if (foreignFilingFields.value.length) {
    businessAddressState.value = foreignFilingFields.value.find((field) => {
      return Object.keys(field)[0] === "business_address_state";
    });
    businessAddressState.value &&
    businessAddressState.value.business_address_state.data
      ? (businessAddressState.value =
          businessAddressState.value.business_address_state.data)
      : (businessAddressState.value = "");
  }
});

// Methods
const onSubmit = async () => {
  await store.dispatch("foreignFiling/sendConfirmation", {
    type: "has_foreign_filed",
    requiredData: { value: true },
  });
  await store.dispatch("aspects/fetchFoundationStatuses", ["foreign_filing"]);
  return router.push("/fundability/foundation/foreign-filing/filing-done");
};
</script>
