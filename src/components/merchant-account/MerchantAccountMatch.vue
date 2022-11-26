<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="verify business information"
      icon="CommercialAddress"
      linkText="Is your business information and exact match?"
      desc="Verify the business information displayed is an exact match to the business name and address listed on your Merchant Account."
    />
    <div
      class="w-9/12 3xl:w-6/12 mx-auto border-[1px] border-[#DDDDDD] flex justify-between py-2 px-4 mt-12 mb-7"
    >
      <div class="flex flex-col align-middle gap-2">
        <span class="text-[#196499] text-xs font-semibold">Business Name</span>
        <p
          class="text-[#495A67] font-semibold h-full flex items-center"
          v-text="merchantAccountFields.company.data"
        ></p>
      </div>
      <div class="flex flex-col align-middle gap-2">
        <span class="text-[#196499] text-xs font-semibold"
          >Business Address</span
        >
        <p
          class="text-[#495A67] font-semibold"
          v-text="merchantAccountFields.business_address_street.data + ','"
        ></p>
        <p
          class="text-[#495A67] font-semibold"
          v-if="merchantAccountFields.business_address_line2.data"
          v-text="merchantAccountFields.business_address_line2.data + ','"
        ></p>
        <p class="text-[#495A67] font-semibold">
          {{ merchantAccountFields.business_address_city.data }}, &nbsp; &nbsp;
          {{ merchantAccountFields.business_address_state.data }}, &nbsp; &nbsp;
          {{ merchantAccountFields.business_address_zip.data }}
        </p>
      </div>
    </div>
    <MerchantAccountMatchForm />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import MerchantAccountMatchForm from "./MerchantAccountMatchForm.vue";

const store = useStore();

// Data
const merchantAccountFields = ref({
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

// Hooks
onBeforeMount(async () => {
  const fields = store.getters["merchantAccount/getMerchantAccountFields"];
  if (!fields.length) {
    await store.dispatch("merchantAccount/fetchMerchantAccountFields");
  }
  fields.length &&
    fields.map((field) => {
      return (merchantAccountFields.value[Object.keys(field)[0]] =
        Object.values(field)[0]);
    });
});
</script>
