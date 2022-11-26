<template>
  <section class="container pt-9 !pb-24 2xl:mb-5 relative">
    <FormHeader
      formTitle="Entity alternative"
      icon="Light"
      iconColor="text-red-500"
      linkText="LLC"
      desc="It is important for your Business Address to match the Primary Address at the Secretary of State. Even if you go through a Registered Agent, or register your business in a different state, your Primary Address must match the address below:"
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
      text="Click a resource below to learn more and Form an LLC."
      :resources="resources"
    />
    <BaseBackNextBtns
      nextLabel="I Filed an LLC"
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

const store = useStore();
const router = useRouter();

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
// Methods
const goNext = () => router.push("/fundability/foundation/business-entity/llc");

onBeforeMount(async () => {
  const fields = store.getters["entity/getMatchFields"];
  if (!fields.length) {
    await store.dispatch("entity/fetchEntityFields");
  }
  fields.length &&
    fields.map((field) => {
      return (entityFields.value[Object.keys(field)[0]] =
        Object.values(field)[0]);
    });
});
</script>
