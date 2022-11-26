<template>
  <section class="container pt-9 !pb-24 2xl:mb-5 relative">
    <FormHeader
      formTitle="Entity alternative"
      icon="Light"
      linkText="Partnership"
      desc="Sole Proprietors are less likely to be approved for financing. A Partnership is one alternative to a Sole Proprietor."
    />
    <p class="w-2/3 mt-10 text-base font-semibold text-black">
      Use the copy/paste icons (below right) to paste your business name and
      address into Entity forms.
    </p>
    <BaseBusinessConfirmationFields
      :businessName="entityFields.company.data || ''"
      :addressLineOne="entityFields.business_address_street.data || ''"
      :addressLineTwo="entityFields.business_address_line2.data || ''"
      :city="entityFields.business_address_city.data || ''"
      :state="entityFields.business_address_state.data || ''"
      :zipCode="entityFields.business_address_zip.data || ''"
    />
    <BaseResources
      text="Click a resource below to learn more and Form a Partnership."
      :resources="resources"
    />
    <BaseBackNextBtns
      nextLabel="I Filed a Partnership"
      :nextDisabled="false"
      @next="goNext"
    />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import FormHeader from "../FormHeader.vue";
import BaseBusinessConfirmationFields from "../BaseBusinessConfirmationFields.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
import BaseResources from "../BaseResources.vue";

const router = useRouter();
const store = useStore();

// Data
const entityFields = ref({
  company: {
    data: "",
  },
  business_address_street: {
    data: "",
  },
  business_address_line2: {
    data: "",
  },
  business_address_city: {
    data: "",
  },
  business_address_state: {
    data: "",
  },
  business_address_zip: {
    data: "",
  },
});

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
onBeforeMount(async () => {
  const matchFields = store.getters["entity/getMatchFields"];
  if (!matchFields.length) {
    await store.dispatch("entity/fetchEntityFields");
  }
  matchFields.length &&
    matchFields.map((field) => {
      return (entityFields.value[Object.keys(field)[0]] =
        Object.values(field)[0]);
    });
});

// Methods
const goNext = () =>
  router.push("/fundability/foundation/business-entity/partnership");
</script>
