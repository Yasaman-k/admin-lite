<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Update business Address"
      icon="Light"
      linkText="Update Primary Business Address with Secretary of State"
      desc="If the business address you use is not an exact match to the S.O.S., it can result in multiple profiles being opened with the business credit bureaus; negatively impacting your ability to get funded and causing declined applications."
    />
    <BaseResources
      text="Click a resource below to update address with the SOS"
      :resources="resources"
    />
    <BaseBackNextBtns
      nextLabel="I Filed a Partnership"
      :nextDisabled="false"
      @next="onSubmit"
    />
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
import FormHeader from "../FormHeader.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
import BaseResources from "../BaseResources.vue";

const store = useStore();
const router = useRouter();

// Data
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

// Methods
const onSubmit = async () => {
  await store.dispatch("entity/sendEntityFields", [
    {
      type: "business_entity_confirmation",
      value: "Yes",
    },
  ]);
  await store.dispatch("aspects/fetchFoundationStatuses", ["business_entity"]);
  return router.push(
    "/fundability/foundation/business-entity/entity-form-confirm"
  );
};
</script>
